require('dotenv').config();
const cors = require('cors');
const express = require('express');
const dbConnect = require('./dbConnect');

const authRoutes = require('./routes/authRoutes');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const userRoutes = require('./routes/userRoutes')
const noticeRoutes = require('./routes/noticeRoutes')

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
dbConnect();
app.options("*", cors()); // Handle preflight requests
// Routes
app.get('/', (req, res) => res.send('Server is running!'));

app.use('/api/auth', authRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('./api/users', userRoutes);
app.use('/api/notices', noticeRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
