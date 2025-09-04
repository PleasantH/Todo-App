const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://pleasanthamilton1:Qjj8ncSpui5WnzLA@project1.n9fcteo.mongodb.net/?retryWrites=true&w=majority&appName=Project1')
    .then(() => console.log('MongoDB connected'));


app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err));
});


app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate(id, [
        { $set: { done: { $not: "$done" } } }
    ], { new: true })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({ 
        task: task 
    }) .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});