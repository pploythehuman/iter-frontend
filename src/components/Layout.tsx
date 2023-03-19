import React from 'react';
import Footer from './Footer';

interface Props {
  children: any;
}
export default function Layout({ children }: Props){
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
