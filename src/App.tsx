import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Button, Result } from 'antd';
import './App.css';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignInPage from './pages/Login';
import SignupPage from './pages/Register';
import Itinerary from './pages/Itinerary';
import Explore from './pages/Explore';
import MyTrips from './pages/MyTrips';
import About from './pages/About';
import Contact from './pages/Contact';

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
        <Route path="/explore" element={<Explore />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route> */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

const NotFound = () => {
  return (
    <div style={{ height: '100vh' }}>
    <Navbar />
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary" href="/">Back Home</Button>}
    />
    </div>
  );
};
