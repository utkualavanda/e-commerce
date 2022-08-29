import { Header } from './Header';
import { Footer } from './Footer';
import { useEffect } from 'react';

interface IProps {
  title?: string;
  children?: any;
}

export const Layout = (props: IProps) => {
  const { title } = props;

  useEffect(() => {
    document.title = title || 'Getir Assignment';
  }, [title]);

  return (
    <div className="layout-container">
      <Header />
      <div className="content-container">{props.children}</div>
      <Footer />
    </div>
  );
};
