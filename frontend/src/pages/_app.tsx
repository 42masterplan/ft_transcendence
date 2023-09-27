import Layout from '../../components/Layout';
import type {AppProps} from 'next/app';
import '../../app/globals.css';
export default function App({Component}: AppProps) {
  return (
    <Layout>
      <Component />
    </Layout>
  );
}
