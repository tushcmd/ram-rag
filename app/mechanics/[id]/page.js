'use client';

import { useParams } from 'next/navigation';
import data from '@/data.json';
import { Avatar } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { CopyLinkButton } from '@/components/core/copy-link-btn';
import GoBackBtn from '@/components/core/go-back-btn';

export default function MechanicPage() {
  const params = useParams();

  // Find the mechanic using the ID from the route parameters
  const mechanic = data.find((m) => m.id === params.id);

  // Handle case where mechanic is not found
  if (!mechanic) {
    return (
      <div className="flex flex-col items-center justify-center p-4 page-container">
        <h1 className="text-2xl font-bold">Mechanic Not Found</h1>
        <GoBackBtn />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 text-center page-container">
      <div className="mt-16 space-y-4 lg:col-span-2">
        <div className="flex items-center space-x-4">
          <Avatar className="justify-center w-12 h-12 border rounded-full">
            <User />
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{mechanic.mechanicName}</h1>
            <p className="text-muted-foreground">{mechanic.specialty}</p>
          </div>
        </div>
        <p className="text-muted-foreground">{mechanic.description}</p>
      </div>
      <div className="mt-8 space-y-2">
        <div className="flex items-center space-x-2">
          <p className="font-bold">Shop Name:</p>
          <p>{mechanic.shopName}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-bold">Rating:</p>
          <p>{mechanic.rating} stars</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-bold">Review:</p>
          <p>{mechanic.review}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-bold">Specialty:</p>
          <p>{mechanic.specialty}</p>
        </div>
        <div className="flex items-center space-x-2 ">
          <p className="font-bold">Location:</p>
          <p>{mechanic.location}</p>
        </div>
      </div>
      <div className="flex flex-row mt-8 space-x-4">
        <GoBackBtn />
        <CopyLinkButton />
      </div>
    </div>
  );
}

// 'use client';

// import { useRouter, useParams } from 'next/navigation';
// import data from '@/data.json';
// import { Avatar } from '@/components/ui/avatar'
// import { User } from 'lucide-react'
// import { Button } from '@/components/ui/button';

// export default function MechanicPage() {
//   const params = useParams();
//   const router = useRouter();

//   // Find the mechanic using the ID from the route parameters
//   const mechanic = data.find(m => m.id === params.id);

//   // Handle case where mechanic is not found
//   if (!mechanic) {
//     return (
//       <div className='items-center justify-center p-4 page-layout'>
//         <h1>Mechanic Not Found</h1>
//         <button onClick={() => router.back()}>Go Back</button>
//       </div>
//     );
//   }

//   return (
//     <div className='flex flex-col items-center p-4 text-center page-layout'>
       
//        <div className="mt-16 space-y-4 lg:col-span-2">
//          <div className="flex items-center space-x-4">
//            <Avatar className="justify-center w-12 h-12 border rounded-full">
//              <User />
//            </Avatar>
//            <div className="space-y-1">
//              <h1 className="text-2xl font-bold">{mechanic.mechanicName}</h1>
//              <p>{mechanic.specialty}</p>
//            </div>
//          </div>
//          <p>
//            Lorem ipsum dolor sit amet consectetur adipisicing elit.
//          </p>
//        </div>
//        <p>{mechanic.shopName}</p>
//       <p>{mechanic.rating} stars</p>
//       <p>{mechanic.review}</p>
//       <p>Specialty: {mechanic.specialty}</p>
//       <p>Location: {mechanic.location}</p>
//       <Button onClick={() => router.back()}>Go Back</Button>
//      </div>
//   );
// }




