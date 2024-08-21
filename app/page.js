
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    // text-center
    <main className="justify-center min-h-screen page-container">
      <h1 className='text-2xl '>Welcome to Rate a Mechanic App</h1>
      <div className='flex flex-col gap-2 md:flex-row md:space-x-2'>
        <Button size="lg">
          <Link href="/mechanics">List of Mechanics</Link>
        </Button>
        <Button size="lg">
          <Link href="/chat">Go to Chat</Link>
        </Button>
        <Button size="lg">
          <Link href="/submit-link">Submit Mechanic Profile Link</Link>
        </Button>
      </div>
    </main>
  );
}
