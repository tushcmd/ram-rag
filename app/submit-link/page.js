'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const handleSubmit = async (event) => {
  event.preventDefault()
  alert("hello")
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
    <div className='page-container'>
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex items-center justify-center gap-4"
          onSubmit={handleSubmit}
        >       
        <Input
            type="url"
            placeholder="Paste the website link"
            required
            className="text-muted-foreground"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button
            type="submit"
            className=""
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "↵"}
          </Button>
        </form>
      </div>
    </div>

  )
}

