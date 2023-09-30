// import Link from 'next/link';

import {Button} from '@/components/components/shadcn/button';
import Link from 'next/link';

// import {useRouter} from 'next/router';

export default function Home() {
  return (
    <>
      <h1 className='text-center'>Main Page</h1>
      <div className='bg-red-500 h-2'></div>
      <Button variant='ghost' className='bg-red-400'>
        Destructive
      </Button>
      <Link href='/welcome'>
        <Button>웰컴으로 가실?</Button>
      </Link>
    </>
  );
}
