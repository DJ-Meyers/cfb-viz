const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Hello World' }));

// Define Routes
app.use('/api/recruiting', require('./routes/recruiting'));
app.use('/api/teams', require('./routes/teams'));
app.use('/api/playbyplay', require('./routes/playbyplay'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
