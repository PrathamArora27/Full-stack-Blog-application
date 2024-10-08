import React from 'react';
import { IoMdDownload } from "react-icons/io";

const Blog = ({ blog }) => {
  const downloadHander = async(_id)=>{
    try{
      const req = await fetch(`http://localhost:3000/download/${_id}`);
      const response = await req.json();
      console.log(response);
      
    }catch(err){
      console.error("error in sending request: ",err);
      
    }
  }

  return (
    <div className="max-w-xl mx-auto my-4 p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
      <p className="text-gray-700 text-base mb-4">{blog.Content}</p>
      <h6 className="text-gray-500 text-sm">- {blog.Author}</h6>
      
      <div className="flex justify-center">
      <button onClick={()=>{downloadHander(blog._id)}} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      <IoMdDownload />
      </button>
      </div>
      
    </div>
  );
};

export default Blog;
