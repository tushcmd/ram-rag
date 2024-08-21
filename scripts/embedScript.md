# embed script

Here’s a summary of what the script does

- Load Environment Variables: Loads API keys from environment variables using dotenv.

- Initialize Pinecone: Creates a Pinecone client with the provided API key.

- Index Creation: The index creation code is commented out but ready to use if needed. It defines an index with cosine similarity and specific dimensions.

- Load Data: Reads the review data from a JSON file. It handles errors if the file cannot be read or parsed.

- Create Embeddings: For each review in the data, it generates embeddings using OpenAI’s API and appends them to a list, including metadata for each vector.

- Upsert Embeddings: Inserts the vectors into the Pinecone index and prints the count of upserted vectors.

- Index Statistics: Prints the index statistics to confirm the operation.
