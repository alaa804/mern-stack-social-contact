const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');
const app = express();

// CONNECT DATABASE 
connectDB();

// INIT MIDDILWARE
app.use(express.json({ extended: false }))

app.get('/' , ( req , res) => {
    res.json({ msg : 'WELCOM TO CONTACT KEPPER API...'  })
})


// DEFINE ROUTES
app.use('/api/users' , require('./routes/users'));
app.use('/api/auth' , require('./routes/auth'));
app.use('/api/contacts' , require('./routes/contacts'));

const PORT = process.env.PORT || 5000

app.listen(PORT , () => console.log(`Server started on port ${PORT}`.yellow.bold));