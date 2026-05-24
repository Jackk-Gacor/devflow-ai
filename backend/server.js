const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 1. API Generate Pipeline
app.post('/api/ai/generate-pipeline', async (req, res) => {
    try {
        const { framework, platform, requirements } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Generate a production-ready CI/CD YAML for ${framework} using ${platform}. Requirements: ${requirements}. Return ONLY the code.`;
        const result = await model.generateContent(prompt);
        res.json({ code: result.response.text() });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// 2. API Generate Dockerfile
app.post('/api/ai/generate-dockerfile', async (req, res) => {
    try {
        const { framework, port } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Create an optimized Dockerfile for ${framework} on port ${port}. Return ONLY the code.`;
        const result = await model.generateContent(prompt);
        res.json({ code: result.response.text() });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// 3. API Analyze Error
app.post('/api/ai/analyze-error', async (req, res) => {
    try {
        const { logs } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `Analyze these logs and give a short Root Cause and Solution: ${logs}`;
        const result = await model.generateContent(prompt);
        res.json({ analysis: result.response.text() });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// 4. API DevOps Chat (Assistant)
app.post('/api/ai/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `You are a Senior DevOps Engineer. Answer this question briefly: ${message}`;
        const result = await model.generateContent(prompt);
        res.json({ reply: result.response.text() });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server DevFlow Full-Power on port ${PORT}`));