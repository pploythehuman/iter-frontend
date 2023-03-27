import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout'
import Home from './pages/Home';
import SignInPage from './pages/Login';
import SignupPage from './pages/Register';
import Itinerary from './pages/Itinerary';

function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route
          path="/itinerary/:itineraryId"
          element={<Itinerary />}
        />

        {/* <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route> */}
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
