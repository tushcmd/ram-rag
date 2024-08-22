import data from '@/data.json';
import GoBackBtn from '@/components/core/go-back-btn';
import Link from 'next/link';


export default function MechanicsListPage() {

  return (
    <div className='items-center h-screen page-container'>
      <div className='flex flex-row justify-between space-x-8'>
        <GoBackBtn />
        <h1 className='text-2xl'>Mechanic List</h1>
      </div>
      <ul>
        {data.map((mechanic) => (
          <li key={mechanic.id} className='mb-4 border-b-2'>
            <Link href={`/mechanics/${mechanic.id}`} className='flex flex-row items-center justify-between w-full'>
              <p>{mechanic.mechanicName} </p> - <p>{mechanic.rating} stars</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
// 'use client';

// import { useRouter } from 'next/navigation';
// import data from '@/data.json';
// import { Button } from '@/components/ui/button';
// import GoBackBtn from '@/components/core/go-back-btn';


// export default function MechanicsListPage() {
//   const router = useRouter();

//   const handleMechanicClick = (id) => {
//     // Navigate to the mechanic's detailed page using their ID
//     router.push(`/mechanics/${id}`);
//   };

//   return (
//     <div className='items-center h-screen page-container'>
//       <div className='flex flex-row justify-between space-x-8'>
//         <GoBackBtn />
//         <h1 className='text-2xl'>Mechanic List</h1>
//       </div>
//       <ul>
//         {data.map((mechanic) => (
//           <li key={mechanic.id} className='mb-4 w-3xl'>
//             <Button onClick={() => handleMechanicClick(mechanic.id)} variant='outline' className='items-center justify-between w-full'>
//               <p>{mechanic.mechanicName} </p> - <p>{mechanic.rating} stars</p>
//             </Button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
