const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();

// Inisialisasi Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 1. Logika Pipeline
exports.generatePipeline = async (req, res) => {
  try {
    const { framework, platform, requirements } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are a Senior DevOps Engineer. Generate a professional CI/CD YAML for ${framework} using ${platform}. Requirements: ${requirements}. Return ONLY the code, no explanation.`;
    
    const result = await model.generateContent(prompt);
    res.json({ code: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Logika Dockerfile
exports.generateDockerfile = async (req, res) => {
  try {
    const { framework, port } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Create an optimized Dockerfile for ${framework} on port ${port}. Return ONLY the code.`;
    
    const result = await model.generateContent(prompt);
    res.json({ code: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Logika Analyze Error
exports.analyzeError = async (req, res) => {
  try {
    const { logs } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" }); // Pro lebih teliti
    const prompt = `Analyze these logs, find the root cause and provide a solution: ${logs}`;
    
    const result = await model.generateContent(prompt);
    res.json({ analysis: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Logika Chat Assistant
exports.chatDevOps = async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are a helpful Senior DevOps Assistant. Answer this: ${message}`;
    
    const result = await model.generateContent(prompt);
    res.json({ reply: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};