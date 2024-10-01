import React from 'react';

const Blog = ({ blog }) => {
  return (
    <div className="max-w-xl mx-auto my-4 p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
      <p className="text-gray-700 text-base mb-4">{blog.Content}</p>
      <h6 className="text-gray-500 text-sm">- {blog.Author}</h6>
    </div>
  );
};

export default Blog;
