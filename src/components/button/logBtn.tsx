import {Button} from '../shadcn/button';
import Link from 'next/link';
import axios from 'axios';
export default function LoginBtn() {
  return (
    <Button
      variant='default'
      size='lg'
      onClick={() => {
        axios
          .get('https://api.intra.42.fr/oauth/authorize')
          .then(() => {
            console.log('성공');
          })
          .catch(() => {
            console.log('실패');
          });
      }}
    >
      LOGIN
    </Button>
  );
}
