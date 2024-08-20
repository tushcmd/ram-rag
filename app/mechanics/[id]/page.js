import React from 'react'
import { Avatar } from '@/components/ui/avatar'
import { User } from 'lucide-react'

export default function MechanicProfiulePage() {
  return (
    <div className='flex flex-col items-center p-4 text-center page-layout'>
      {/* <h5>MechanicProfilePage</h5> */}
      <div className="mt-16 space-y-4 lg:col-span-2">
        <div className="flex items-center space-x-4">
          <Avatar className="justify-center w-12 h-12 border rounded-full">
            <User />
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Alice Johnson</h1>
            <p>Mechanic and Painter</p>
          </div>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  )
}
