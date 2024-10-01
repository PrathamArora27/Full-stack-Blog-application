import React from 'react'
import Blog from './Blog'

const BlogPage = ({ data }) => {
  return (
    <div>

      {
        data.length > 0
          ? (data.map((blog) => {
            return (<Blog key={blog._id} blog={blog} />)
          }))
          : (<p>nothing to show</p>)


      }
    </div>
  )
}

export default BlogPage
