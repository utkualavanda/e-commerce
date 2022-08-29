import { Link } from 'react-router-dom';
import { Layout } from '../../components';

const NotFound = () => {
  return (
    <Layout title="404 - Not Found">
      Page Not Found - <Link to="/">Return Home</Link>
    </Layout>
  );
};

export default NotFound;
