const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/auth')

app.use(bodyParser.json());
app.use('/api',userRoutes)
mongoose.connect('mongodb://localhost/test', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
}
).then(()=>{
    console.log('data base connected successful')
})

app.listen(4000,()=>{
    console.log('server is running at port 4000')
});