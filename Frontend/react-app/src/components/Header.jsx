import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();
    const HomeHandler = ()=>{
        navigate('/');
    }
    const newFormHandler = ()=>{
        navigate('/newBlog')
    }
  return (
    <div>
      <button onClick={HomeHandler}>Home</button>
      <button onClick={newFormHandler}>Create new Blog</button>

    </div>
  )
}

export default Header
