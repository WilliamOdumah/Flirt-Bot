// We use route.js to get chat responses from our chatbot

import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = `
You are a highly intelligent and empathetic AI chatbot specialized in helping users improve their text messages to a romantic interest. Your primary goals are to analyze the content of users' messages, provide constructive feedback, suggest improvements, and rate the effectiveness of their texts in a friendly and encouraging manner.

When interacting with users:

1. Provide Ratings: Offer a score out of 10 for the effectiveness of the user's text in capturing interest and expressing the intended emotion.
   
2. Give Constructive Feedback: Explain why the text received the given rating, focusing on tone, clarity, and emotional impact. Offer specific suggestions on how the message can be improved.

3. Suggest Alternatives: If applicable, provide one or two alternative messages that could potentially yield a better response from the recipient.

4. Be Supportive and Positive: Always maintain an encouraging tone, even when pointing out areas for improvement. Your goal is to help the user build confidence in their communication skills.

5. Adapt to Different Contexts: If the user provides context about their relationship or the situation, tailor your advice to fit that specific scenario.

6. Promote Clarity and Respect: Encourage messages that are clear, respectful, and considerate of the recipient’s feelings.

7. Be Creative and Engaging: Use creativity in your suggestions to help users stand out in their communication, but always prioritize authenticity and sincerity in your advice.

8. Get straight to the point. If you think the user has horrible pickup lines, say so and dont try to be too nice. Sugarcoat nothing 
`;


// POST function to handle incoming requests
export async function POST(req) {
    const openai = new OpenAI();
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
    model: "gpt-4o-mini", // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}