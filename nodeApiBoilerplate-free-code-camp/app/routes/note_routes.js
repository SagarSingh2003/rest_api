//in express routes are wrapped in a function 
//which takes the express instance and database as arguments

const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Post = require('../../models/Post');

    router.get('/get-note/:id' , async (req, res) => {

      // res.send('Hello its working');
      // res.send(req.params.id)
       const id = req.params.id
       const details = {'_id': new ObjectId(id)};

       console.log(id)
       const arr = await Post.findById(id ) 
        console.log(arr.body);
        res.send(arr);
       });
      
       
    router.delete('/delete-note/:id' , async (req, res) => {
      const id = req.params.id
      console.log(id);
      await Post.findByIdAndDelete(id);
      res.send('Post deleted')
    })  


    router.post('/add-note' ,async (req, res) => {
      const body = req.body.body
      const title = req.body.title

      console.log(body);

      await Post.insertMany({title : title , body : body})
      console.log('Post uploaded successfully')
      res.end('note uploaded !');


     })

     router.put('/update-note/:id' , async (req , res) => {
      const id = req.params.id;

      console.log(req.body.title);
      
      if (req.body.body !== undefined && req.body.title !== undefined ) {
        
        const notes = {title : req.body.title , body : req.body.body}
         await Post.findByIdAndUpdate(id , notes);
         console.log('Post updated successfully')
         res.end('Post updated successfully')
      }else if (req.body.body ===undefined && req.body.title !== undefined ) {
        
        const notes = {title : req.body.title}
        await Post.findByIdAndUpdate(id , notes);
        console.log('title updated successfully')
        res.end('title updated successfully')
      
      }else if (req.body.body !== undefined && req.body.title === undefined ) {
        const notes = {body : req.body.body}
        await Post.findByIdAndUpdate(id , notes);
        console.log('body updated successfully')
        res.end('body updated successfully')
      
      }else {
        console.log('yeah i made a mistake ,and i know where i was wrong')
      }
      console.log(req.body.title);
     })
     

module.exports = router;