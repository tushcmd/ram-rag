import { Pinecone } from '@pinecone-database/pinecone';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';


// Defining systemPrompt
const systemPrompt = `
You are a rate my mechanic agent to help drivers find good garage shops, you take in user questions and answer them.
For every user question, the top 3 mechanics that match the user question are returned.
When a user asks a question, search the Pinecone movie index to retrieve the most relevant data. 
Ensure that your responses are 
concise, accurate, and directly related to the query. If additional context or clarification is needed, 
ask follow-up questions to ensure you understand the user's intent before proceeding. Avoid speculation 
and base your answers strictly on the data available in the index
`
// POST fn
export async function POST(req) {
    const data = await req.json();
    // Initialize Pinecone and OpenAI
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    })

    const index = pc.index('ram-index').namespace('ns1')
    const openai = new OpenAI()

    // Extract user's question & create embeddings
    const text = data[data.length - 1].content
    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
    })

    // Query pinecone
    const results = await index.query({
        topK: 5,
        includeMetadata: true,
        vector: embedding.data[0].embedding,
    })


    // Format results
    let resultString = ''
    results.matches.forEach((match) => {
        resultString += `
    Returned Results:
    Mechanic:{match.id}
    Name:{match.metadata.mechanicName}
    Garage:{match.metadata.shopName}
    Stars:{match.metadata.rating}
    Review:{match.metadata.review}
    Specialty:{match.metadata.specialty}
    Location:{match.metadata.location}
    \n\n`
    })

    const lastMessage = data[data.length - 1]
    const lastMessageContent = lastMessage.content + resultString
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1)
    // OpenAI Request
    const completion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: systemPrompt },
            ...lastDataWithoutLastMessage,
            { role: 'user', content: lastMessageContent },
        ],
        model: 'gpt-3.5-turbo',
        stream: true,
    })

    // Create Readable Stream
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch (err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })
    return new NextResponse(stream)
}



