const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/useRoutes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
  }));
connectDB();

app.use('/user', userRoutes);

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});  