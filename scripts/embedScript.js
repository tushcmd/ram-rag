import dotenv from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';
// import 'fs';
// import OpenAI from "openai";

dotenv.config({ path: '.env.local' });

// Initialize Pinecone
const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

// Create index
const indexName = "ram-index"

try {
  await pc.createIndex({
    name: indexName,
    dimension: 1536,
    metric: 'cosine',
    spec: { 
      serverless: { 
        cloud: 'aws', 
        region: 'us-east-1' 
      }
    } 
  });
  console.log('Index created successfully');
} catch (error) {
  console.error('Error creating index:', error);
}

// const fs = fs();
// const openai = new OpenAI();