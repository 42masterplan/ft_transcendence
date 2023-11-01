import {useEffect} from 'react';
import {useRouter} from 'next/router';
export default function Redirect() {
  const router = useRouter();
  console.log(router);
  const auth_code = router.query.code || [];
  console.log(auth_code);
  return <div></div>;
}
