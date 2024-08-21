import { Pinecone } from '@pinecone-database/pinecone';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';


const systemPrompt = `You are a movie database assistant, helping users find information about movies stored in a Pinecone index.
For every user question, retrieve the top 3 movies that best match the user's query. 
Use these movies' details, such as titles, genres, actors, directors, and plot summaries, to answer the question.
 When a user asks a question, search the Pinecone movie index to retrieve the most relevant data. 
 Ensure that your responses are 
concise, accurate, and directly related to the query. If additional context or clarification is needed, 
ask follow-up questions to ensure you understand the user's intent before proceeding. Avoid speculation 
and base your answers strictly on the data available in the index`

export async function POST(req) {
    const data = await req.json();
    // return new Response(JSON.stringify(data))
}

const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  })
  const index = pc.index('ram-index').namespace('ns1')
  const openai = new OpenAI()

  