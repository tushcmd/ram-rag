import { Pinecone } from '@pinecone-database/pinecone';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';


// Defining systemPrompt
const systemPrompt = `
You are an AI assistant for a "Rate My Mechanic" service, designed to help drivers find high-quality auto repair shops. Your primary function is to answer user questions about mechanics and auto repair services based on the data provided from our Pinecone vector database.

For each user query, you will receive information about the top 3 matching mechanics. Use this data to formulate your responses. Always structure your answer in the following way:

1. A brief, direct answer to the user's question.
2. Details of the top 3 mechanics, formatted as follows for each:

   Mechanic #[1-3]:
   - Name: [Mechanic Name]
   - Garage: [Shop Name]
   - Rating: [Rating] stars
   - Specialty: [Specialty]
   - Location: [Location]
   - Review highlight: "[Brief excerpt from review]"

3. A follow-up question or suggestion to help the user refine their search or make a decision.

Important guidelines:
- Always base your responses on the provided data. Do not invent or assume information.
- If the user's question cannot be answered with the given data, politely say so and ask for clarification.
- Be concise but informative. Prioritize the most relevant information for the user's query.
- If specialized services are mentioned in the query (e.g., oil change, brake repair), highlight mechanics with matching specialties.
- Use a friendly, helpful tone throughout your responses.

Remember, your goal is to assist users in finding the best mechanic for their specific needs based on ratings, specialties, and location.
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
        Mechanic: ${match.id}
        Name: ${match.metadata.mechanicName}
        Garage: ${match.metadata.shopName}
        Stars: ${match.metadata.rating}
        Review: ${match.metadata.review}
        Specialty: ${match.metadata.specialty}
        Location: ${match.metadata.location}
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



