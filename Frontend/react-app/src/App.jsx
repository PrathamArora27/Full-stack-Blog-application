import { useEffect, useState } from 'react';
import './App.css';
import BlogPage from './components/BlogPage';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import NewForm from './components/NewForm';

function App() {

  function Layout({ children }) {
    return (
      <div>
        <Header />  {/* This will show on every route */}
        <main>{children}</main>
      </div>
    );
  }

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout><HomePage/></Layout>}/>
      <Route path='/newBlog' element={<Layout><NewForm/></Layout>}/>
    </Routes>
    </>
  );
}

export default App;
