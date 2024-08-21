from dotenv import load_dotenv
import os
import json
import pinecone
import openai

# Load environment variables from .env.local file]
load_dotenv('.env.local')

# Initialize Pinecone client
pinecone.init(api_key=os.getenv("PINECONE_API_KEY"))

index_name = "ram-index"
dimension = 1536

# Create the Pinecone index
if index_name not in pinecone.list_indexes():
    pinecone.create_index(
        name=index_name,
        dimension=dimension,
        metric="cosine",
        metadata_config={"serverless": {"cloud": "aws", "region": "us-east-1"}}
    )
    print(f"Index '{index_name}' created successfully.")


# Load the review data
data_path = '../data.json'
try:
    with open(data_path, 'r') as file:
        data = json.load(file)
except Exception as e:
    print(f"Error reading or parsing data.json: {e}")
    exit(1)

# Initialize OpenAI client
openai.api_key = os.getenv("OPENROUTER_API_KEY")

# Process and embed the review data
processed_data = []

for review in data:
    try:
        response = openai.Embedding.create(
            input=review['review'],
            model="text-embedding-ada-002"
        )
        embedding = response['data'][0]['embedding']
        processed_data.append({
            "values": embedding,
            "id": review["id"],
            "metadata": {
                "mechanicName": review["mechanicName"],
                "shopName": review["shopName"],
                "rating": review["rating"],
                "review": review["review"],
                "specialty": review["specialty"],
                "location": review["location"]
            }
        })
    except Exception as e:
        print(f"Error creating embedding for review {review['id']}: {e}")

# Insert the embeddings into Pinecone
index = pinecone.Index(index_name)
upsert_response = index.upsert(
    vectors=processed_data,
    namespace="ns1"
)

print(f"Upserted count: {upsert_response['upserted_count']}")

# Print index statistics
print(index.describe_index_stats())
