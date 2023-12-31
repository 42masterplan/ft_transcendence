import Link from 'next/link';
import {Button} from '@/components/shadcn/ui/button';

export default function LoginBtn() {
  const client_id = process.env.NEXT_PUBLIC_FORTY_TWO_CLIENT_ID;
  const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;

  return (
    <Link
      href={{
        pathname: 'https://api.intra.42.fr/oauth/authorize',
        query: {
          client_id: client_id,
          redirect_uri: redirect_uri,
          response_type: 'code'
        }
      }}
    >
      <Button
        size='lg'
        className=' font-semibold h-20 w-40 text-2xl text-custom4 bg-custom2/50'
      >
        login
      </Button>
    </Link>
  );
}
