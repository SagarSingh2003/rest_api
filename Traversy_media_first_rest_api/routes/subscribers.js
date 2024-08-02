const express = require('express')
const router = express.Router()


//Getting all
router.get('/' , (req, res) => {
    res.send('Hello World');
})
//Getting one
router.get('/:id' , (req, res)=> {

})
//Creating one
router.post('/' , (req, res) => {

})
//Updating one
router.patch('/:id' , (req , res) => {//patch beacuse put updates all the info  of the user rather than just the info that the user passes to update

})
//Deleting One
router.delete('/:id' , (req, res) => {

})


module.exports = router