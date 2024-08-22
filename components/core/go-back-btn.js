'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function GoBackBtn() {

    const router = useRouter();

    return (
        <Button variant="secondary" onClick={() => router.back()}>
            <ChevronLeftIcon className="w-4 h-4 mr-2" />
            Go Back
        </Button>
    )
}
