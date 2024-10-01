import React from 'react'

const Blog = ({blog}) => {
  return (
    <div>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <h6>- {blog.author}</h6>

    </div>
  )
}

export default Blog
