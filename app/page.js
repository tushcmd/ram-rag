
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    // text-center
    <main className="justify-center min-h-screen page-container">
      <h1 className='text-2xl '>Welcome to Rate a Mechanic App</h1>
      <div>
        <Button size="lg">
          <Link href="/mechanics">List of Mechanics</Link>
        </Button>
      </div>
    </main>
  );
}
