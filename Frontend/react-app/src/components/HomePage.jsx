import React from 'react'
import { useEffect, useState } from 'react';
import BlogPage from './BlogPage';
import Header from './Header';

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loader, setLoader] = useState(true);
    const [loadingText, setLoadingText] = useState('loading');
  
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const request = await fetch('http://localhost:3000/blogposts');
        const data = await request.json();
        console.log("data fetched", data);
        setBlogs(data);
        setLoader(false); 
      } catch (err) {
        console.error("error is ", err);
      }
    };
  
    useEffect(()=>{
      const interval = setInterval(()=>{
        setLoadingText((prevText)=>(
          prevText==='loading.....'
          ?'loading'
          :prevText+'.'
        ))
  
      },500);
      return () => clearInterval(interval);
    },[])
  
    // useEffect to fetch data when component mounts
    useEffect(() => {
      fetchData();
    }, []);

  return (
    <div>
      
      {loader ? <p>{loadingText}</p> : <BlogPage data={blogs} />}
    </div>
  )
}

export default HomePage
