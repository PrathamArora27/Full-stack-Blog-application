import React, { useEffect, useState } from 'react'

const NewForm = () => {
    const [formData,setFormData] = useState({
        title: '',
        Content: '',
        Author: '',
        date: new Date().toISOString().split('T')[0] 
    });

    const handleChange= (e)=>{
        const {name, value} = e.target;
        setFormData((prevData)=>(
            {
                ...prevData,
                [name]:value
            }
        ))
    }

    const SubmitHandler = async(e)=>{
        e.preventDefault();
        console.log(formData);
        
        try{
            const response = await fetch('http://localhost:3000/blogposts',{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if(response.ok){
                
            }
        }catch(err){
            console.error("error in posting: ",err);
        }


        setFormData({
            title:'',
            Content:'',
            Author:'',
            date:new Date().toISOString().split('T')[0]
        })
        
        
    }

    
   

  return (
    <div>
        <h2>Enter data for new new blog</h2>
      <form onSubmit={SubmitHandler}>
        <div>
            <p>Title</p>
            <input type="text"
            name='title'
            value={formData.title}
            onChange={handleChange}
             />
        </div>
        <div>
            <p>Content</p>
            <input type="text" 
            name='Content'
            value={formData.Content}
            onChange={handleChange}/>
        </div>
        <div>
            <p>Author</p>
            <input type="text" />
        </div>
        <div>
            <p>Date</p>
            <input type="Date" 
             name='date'
             value={formData.date}
             onChange={handleChange}/>
        </div>

        <div>
            <button type='submit'>Submit</button>
        </div>

      </form>
    </div>
  )
}

export default NewForm