export {}
const mongoose = require('mongoose')
require('dotenv').config()

const URI: any = process.env.MONGO_URI

mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true  
  } 
)
.then(() => console.log('Connected to MongoDB'))
.catch((err: any) => console.log('Error While Connecting to DB', err ))
