const express = require('express');
const app = express();
const Joi = require('joi');

//creating a schema for joi
const schema = Joi.object({
    name : Joi.string().min(3).required()
})

PORT = process.env.PORT || 3000 ;  


app.use(express.json()); //express.json is the middleware and by doing app.use we using the middleware in our routing pipeline

const courses = [
    {id: 1 , name : 'course1'},
    {id: 2 , name : 'course2'},
    {id: 3 , name : 'course3'},
];


app.get('/', (req, res) => {
    res.send('Hello World!!');
});

app.get('/api/courses' , (req, res) => {
    res.send(courses);
})

//learning how to use parameters
app.get('/api/courses/:id' , (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The Course with given id was not found');
    res.send(course);
}) 

//learning how to use multiple paramaeters
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
})

app.post('/api/courses', (req, res) => {
    // if (!req.body.name || req.body.name.length < 3) {
    //     //400 Bad request
    //     res.status(400).send('Name is required and should be minimum ')
    //     return;
    // }

    // validating using schema
    const result = schema.validate({name: req.body.name});
    console.log(result.value);

    if (result.error){
        res.status(400 , "Bad request");
        res.send(result.error.details[0].message);
        return;
    };  
    
    const course = {
        id: courses.length + 1 ,
        name: req.body.name //for this to work we need to enable the parsing of json object into request body  , by default this feature is not enabled
    };
    courses.push(course);
    //by convention when the server creates an object we should return that object to the body of the response
    res.send(course);
    console.log(courses);
});

app.put('/api/courses/:id', (req, res) => {
    const result = schema.validate({name: req.body.name});
    console.log(result.value);
    
    //if error then return 
    if (result.error) {
        res.status(404 , "Bad Request");
        res.send(result.error.details[0].message);
        console.log('could not update courses');
        return;
    }

    //if no error
    courses[parseInt(req.params.id) - 1].name = req.body.name;
    console.log(courses[parseInt(req.params.id)]);
});

app.delete('/api/courses/:id', (req,res) => {
    //check if it exists
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The Course with given id was not found');

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})

console.log(courses);

app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}....`);
})

