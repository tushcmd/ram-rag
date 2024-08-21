
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    // text-center
    <main className="justify-center min-h-screen page-container">
      <h1 className='text-2xl '>Welcome to Rate a Mechanic App</h1>
      <div className='flex flex-col gap-2 md:flex-row md:space-x-2'>
        <Link href="/mechanics">
          <Button size="lg">
            List of Mechanics
          </Button>
        </Link>

        <Link href="/chat">
          <Button size="lg">
            Go to Chat
          </Button>
        </Link>
        <Link href="/submit-link">
          <Button size="lg">
            Submit Mechanic Profile Link
          </Button>
        </Link>
      </div>
    </main>
  );
}
