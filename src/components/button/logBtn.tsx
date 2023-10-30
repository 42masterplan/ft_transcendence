import {useSession, signIn, signOut} from 'next-auth/react';
import {Button} from '../shadcn/button';
import Auth from '@auth/core';
import FortyTwo from '@auth/core/providers/42-school';
// async function SignIn() {
//   const request = new Request(origin);
//   const response = await Auth(request, {
//     providers: [
//       FortyTwo({
//         clientId: process.env.FortyTwo_CLIENT_ID,
//         clientSecret: process.env.FortyTwo_SECRET
//       })
//     ]
//   });
//   return response;
// }

export default function LoginBtn() {
  return (
    <Button variant='default' size='lg' onClick={() => signIn('42-school')}>
      LOGIN
    </Button>
  );
}
