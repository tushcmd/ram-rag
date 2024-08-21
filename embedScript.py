from dotenv import load_dotenv
import os
from pinecone import Pinecone, ServerlessSpec
from openai import OpenAI
import json

# Load environment variables
load_dotenv(dotenv_path='.env.local')

# Debugging: Print environment variables to confirm they are loaded
print(f"PINECONE_API_KEY: {os.getenv('PINECONE_API_KEY')}")
print(f"OPENROUTER_API_KEY: {os.getenv('OPENROUTER_API_KEY')}")

# Initialize Pinecone
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))

index_name = "ram-index"
dimension = 1536

# Create the Pinecone index if it doesn't exist
if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=dimension,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )
    print(f"Index '{index_name}' created successfully.")

# Load the review data
data_path = './data.json'
try:
    with open(data_path, 'r') as file:
        data = json.load(file)
except Exception as e:
    print(f"Error reading or parsing data.json: {e}")
    exit(1)

processed_data = []
client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key=os.getenv("OPENROUTER_API_KEY"),
)

# Create embeddings for each review
for review in data:
    try:
        response = client.embeddings.create(
            input=review['review'],
            # model="meta-llama/llama-3.1-8b-instruct:free"
            model="text-embedding-3-small"
        )
        embedding = response.data[0].embedding
        processed_data.append(
            {
                "values": embedding,
                "id": review["id"],
                "metadata": {
                    "review": review["review"],
                    "mechanicName": review["mechanicName"],
                    "shopName": review["shopName"],
                    "rating": review["rating"],
                    "specialty": review["specialty"],
                    "location": review["location"]
                }
            }
        )
    except Exception as e:
        print(f"Error creating embedding for review {review['id']}: {e}")

# Insert the embeddings into the Pinecone index
index = pc.Index(index_name)
upsert_response = index.upsert(
    vectors=processed_data,
    namespace="ns1",
)
print(f"Upserted count: {upsert_response['upserted_count']}")

# Print index statistics
print(index.describe_index_stats())
