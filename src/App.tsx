import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import SignInPage from './pages/Login';
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <SignInPage />
      {/* <Home /> */}
    </Layout>
    
  );
}

export default App;
