import dotenv from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

dotenv.config({ path: '.env.local' });

// Initialize Pinecone
const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const indexName = 'ram-index';
const dimension = 1536;

async function createIndex() {
  try {
    // Check if the index already exists
    const existingIndexes = await pc.listIndexes();
    if (!existingIndexes.includes(indexName)) {
      // Create the index
      await pc.createIndex({
        name: indexName,
        dimension: dimension,
        metric: 'cosine',
        spec: {
          serverless: {
            cloud: 'aws',
            region: 'us-east-1',
          },
        },
      });
      console.log('Index created successfully');
    } else {
      console.log('Index already exists');
    }
  } catch (error) {
    console.error('Error creating index:', error);
  }
}

// Initialize OpenAI Client
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Load the review data
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, './data.json');
let data;

try {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (error) {
  console.error('Error reading or parsing data.json:', error);
  process.exit(1);
}

// Ensure data is an array
if (!Array.isArray(data)) {
  throw new Error('Data should be an array of review objects');
}

const processedData = [];

// Create embeddings for each review
async function createEmbeddings() {
  for (const review of data) {
    try {
      const response = await openai.embeddings.create({
        input: review.review,
        model: 'text-embedding-ada-002', // Use the appropriate model name here
      });
      const embedding = response.data[0].embedding;
      processedData.push({
        values: embedding,
        id: review.id,
        metadata: {
          mechanicName: review.mechanicName,
          shopName: review.shopName,
          rating: review.rating,
          review: review.review,
          specialty: review.specialty,
          location: review.location,
        },
      });
    } catch (error) {
      console.error('Error creating embedding for review:', review.id, error);
    }
  }
}

// Insert the embeddings into Pinecone
async function upsertEmbeddings() {
  try {
    const index = pc.Index(indexName);
    await index.upsert({
      vectors: processedData,
      namespace: 'ns1',
    });
    console.log('Embeddings inserted successfully');
  } catch (error) {
    console.error('Error inserting embeddings:', error);
  }
}

// Run the functions
(async () => {
  await createIndex();
  await createEmbeddings();
  await upsertEmbeddings();
})();
