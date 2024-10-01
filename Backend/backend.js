const http = require('http');
const mongoose = require('mongoose');
const BlogPost = require('./models/postModel')
const url = require('url');


const PORT = 3000;
const mongo_URI = 'mongodb://localhost:27017/blogs';

mongoose.connect(mongo_URI)
    .then(() => console.log('Connected to MongoDB database'))
    .catch(err => console.error('Failed to connect', err));

const server = http.createServer(async(req,res)=>{
    const parsedUrl = url.parse(req.url,true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT,DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        // Handle preflight requests
        res.writeHead(204); // No Content
        res.end();
        return;
    } 

    if (req.method === 'GET' && parsedUrl.pathname === '/blogposts') {
        try {
            const posts = await BlogPost.find({});
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(posts)); // Sending response
    
        } catch (err) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(posts));  // Ensure posts is a valid JSON object
            
        }
    }
    else if(req.method=== 'POST' && parsedUrl.pathname === '/blogposts'){
        let body = '';
        req.on('data',chunk=>{
            body+=chunk.toString(); // to deal with the buffer data
        })
        
        req.on('end',async()=>{
            try{
                const data = JSON.parse(body);
                const newPost = new BlogPost(data);
                console.log(newPost);
                const savedPost = await newPost.save();
                res.writeHead(201,{ 'Content-Type': 'application/json' });
                res.end(JSON.stringify(savedPost));
            }catch(err){
                console.error("error is : ",err);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid request');
            }
        })
    }
    

})

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})