const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const fileRoutes = require('./routes/fileRoutes');

app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 3000;

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

module.exports = app;
