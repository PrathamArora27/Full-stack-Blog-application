const http = require('http');
const mongoose = require('mongoose');
const BlogPost = require('./models/postModel')
const url = require('url');
const fs = require('fs'); 
const path = require('path'); 


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
    else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/download/')) {
        const blogID = parsedUrl.pathname.split('/')[2];
    
        try {
            const blogpost = await BlogPost.findById(blogID);
    
            if (!blogpost) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Blog post not found' })); // Send JSON response
                return;
            }
    
            const content = `Title: ${blogpost.title}\nContent: ${blogpost.Content}\nAuthor: ${blogpost.Author}`;
            const dirPath = path.join(__dirname, 'downloads'); // Path to the downloads directory
            const filePath = path.join(dirPath, `${blogpost.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`); // File path
    
            // Check and create the downloads directory if it doesn't exist
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }
    
            // Write the file and respond with a JSON object
            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' })); // Send JSON response
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'File created successfully' })); // Send JSON response
            });
    
        } catch (err) {
            console.error(err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' })); // Send JSON response
        }
    }
    
    

})

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})