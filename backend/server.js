const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const aiRoutes = require('./routes/aiRoutes');

// Load variabel lingkungan dari .env
dotenv.config();

const app = express();

// MIDDLEWARE
// Izin akses agar frontend bisa memanggil backend
app.use(cors()); 
// Agar backend bisa membaca data JSON yang dikirim frontend
app.use(express.json()); 

// ROUTES
// Semua rute AI akan diawali dengan /api/ai
app.use('/api/ai', aiRoutes);

// Health Check (Untuk memastikan server hidup)
app.get('/', (req, res) => {
    res.send("🚀 DevFlow AI Backend is running perfectly!");
});

// Menentukan Port
const PORT = process.env.PORT || 5000;

// Menjalankan Server
app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`✅ SERVER AKTIF DI PORT: ${PORT}`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log(`=========================================`);
});