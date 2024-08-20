'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Send } from 'lucide-react'

export default function Chat() {

    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hi! I'm the rate a mechanic assistant. What would you like to know?" },
    ])

    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState();


    const sendMessage = async () => {
        if (!message) return
        setIsLoading(true)
        setMessages([...messages, { role: 'user', content: message }])
        setMessage('')
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages }),
        })
        const data = await response.json()
        setMessages([...messages, { role: 'assistant', content: data.message }])
        setIsLoading(false)
    }


    const handleKeyPress = () => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            sendMessage()
        }
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
                <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1"
                        value={message}
                        onChange={() => setMessage(e.target.value)}
                        disabled={isLoading}
                        onKeyPress={handleKeyPress}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Send className='w-4 h-4' />}
                    </Button>
                </form>
            </div>
        </div>
    )
}
