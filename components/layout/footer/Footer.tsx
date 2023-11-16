import FooterButton from './FooterButton';
import {useRouter} from 'next/router';

interface FooterProps {
  className?: string;
}

export default function Footer({className = ''}: FooterProps) {
  // get current page url
  const router = useRouter();
  const currentUrl = router.pathname;

  return (
    <footer className={className}>
      <FooterButton type='myPage' currentUrl={currentUrl} />
      <FooterButton type='game' currentUrl={currentUrl} />
      <FooterButton type='channel' currentUrl={currentUrl} />
      <FooterButton type='social' currentUrl={currentUrl} />
      {/* <FooterButton type="rank" iconSize={iconSize} /> */}
    </footer>
  );
}
