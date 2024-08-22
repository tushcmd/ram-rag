'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 , Send} from 'lucide-react'


const handleSubmit = async (event) => {
  event.preventDefault()
  alert("Tush says hello")
  // const url = event.target.url.value
  // const response = await fetch('/api/submit-link', {
  //     method: 'POST',
  //     headers: {
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ url }),
  // })
}

export default function SubmitLink() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  
  return (
    <div className='mt-4 page-container'>
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex items-center justify-center gap-2"
          onSubmit={handleSubmit}
        >       
        <Input
            type="url"
            placeholder="Paste the link"
            required
            className="text-muted-foreground"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader2 className='w-4 h-4 animate-spin' /> : <Send className='w-4 h-4' />}
          </Button>
        </form>
      </div>
    </div>

  )
}

