'use client'

import React, { useState } from 'react'
// import { Card, CardContent } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Send } from 'lucide-react'

export default function Chat() {

    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hi! I'm the rate a mechanic assistant. What would you like to know?" },
    ])
    const [message, setMessage] = useState('')
    // const [isLoading, setIsLoading] = useState();



    // const handleKeyPress = () => {
    //     if (event.key === 'Enter' && !event.shiftKey) {
    //         event.preventDefault()
    //         // sendMessage()
    //     }
    // }

    const sendMessage = async () => {
        setMessage('')
        setMessages((messages) => [
            ...messages,
            { role: 'user', content: message, },
            { role: 'assistant', content: '' }
        ])

        const response = fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify([...messages, { role: 'user', content: message, }]),
        }).then(async (res) => {
            const reader = res.body.getReader()
            const decorder = new TextDecoder()
            let result = ''

            return reader.read().then(function processText({ done, value }) {
                if (done) {
                    return result
                }
                const text = decorder.decode(value || new Uint8Array(), { stream: true })
                setMessages((messages) => {
                    let lastMessage = messages[messages.length - 1]
                    let otherMessages = messages.slice(0, messages.length - 1)
                    return [
                        ...otherMessages,
                        { ...lastMessage, content: lastMessage.content + text },
                    ]
                })
                return reader.read().then(processText)
            })
        })
    }



    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto custom-scrollbar">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        <div className={`rounded-lg p-3 max-w-[75%] break-words ${msg.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            }`}>
                            <p>{msg.content}</p>
                        </div>
                    </div>
                ))}
                <div
                // ref={messagesEndRef} 
                />
            </div>
            <div className="p-4 border-t bg-background">
                <form
                    onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                    className="flex items-center gap-2"
                >
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    // disabled={isLoading}
                    // onKeyPress={handleKeyPress}
                    />
                    <Button
                        type="submit"
                    //disabled={isLoading}
                    >
                        {/* {isLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Send className='w-4 h-4' />} */}
                        <Send className='w-4 h-4' />
                    </Button>
                </form>
            </div>
        </div>
    )
}
