const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

const prisma = new PrismaClient();

// Initialize Gemini if key is provided
let ai;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

const mockNews = [
  {
    title: "Reserve Bank of India announces new repo rate hike",
    summary: "The RBI has decided to hike the repo rate by 25 basis points to combat inflation, affecting loan EMIs and fixed deposit rates.",
    source: "Economic Times",
    url: "https://example.com/rbi-repo-rate",
    category: "Economy"
  },
  {
    title: "G20 Summit concludes with New Delhi Declaration",
    summary: "World leaders agreed on a joint declaration addressing climate change, economic growth, and digital public infrastructure.",
    source: "The Hindu",
    url: "https://example.com/g20-summit-delhi",
    category: "International"
  },
  {
    title: "Supreme Court constitutional bench rules on Article 370",
    summary: "The Supreme Court has delivered its verdict on the petitions challenging the abrogation of Article 370 in Jammu and Kashmir.",
    source: "Indian Express",
    url: "https://example.com/sc-article-370",
    category: "Polity"
  }
];

async function generateExamContext(article) {
  if (ai) {
    try {
      const prompt = `
        You are an expert tutor for Indian government exams like UPSC, BPSC, UPPCS, and CGL.
        Analyze the following news article for exam relevance:
        
        Title: ${article.title}
        Summary: ${article.summary}
        
        Provide a concise analysis (max 100 words) explaining:
        1. Which syllabus topics this relates to.
        2. What kind of questions could be asked from this in Prelims or Mains.
      `;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      return response.text;
    } catch (error) {
      console.error("AI Generation Error:", error.message);
      return "AI context generation failed.";
    }
  } else {
    // Mock AI response if no key is provided
    if (article.category === 'Economy') {
      return "Relevant for UPSC GS Paper 3 (Indian Economy). Prelims may ask about repo rate mechanisms or monetary policy committee structure. Mains could ask about the impact of inflation targeting on growth.";
    } else if (article.category === 'International') {
      return "Relevant for UPSC GS Paper 2 (International Relations). Prelims questions might focus on G20 membership and troika. Mains could ask about India's role as a voice of the Global South.";
    } else if (article.category === 'Polity') {
      return "Relevant for UPSC GS Paper 2 (Polity and Constitution). Expect Prelims questions on the powers of the President and Parliament regarding state reorganization. Mains could focus on federalism implications.";
    }
    return "Relevant for General Awareness sections in CGL and state PCS exams.";
  }
}

async function fetchAndProcessNews() {
  console.log(`[${new Date().toISOString()}] Agent started fetching news...`);
  
  try {
    // In a real scenario, we would fetch from NewsAPI or similar here.
    // We are using mock data for demonstration.
    for (const item of mockNews) {
      // Check if article already exists
      const existing = await prisma.article.findUnique({
        where: { url: item.url }
      });
      
      if (!existing) {
        console.log(`Processing new article: ${item.title}`);
        const examContext = await generateExamContext(item);
        
        await prisma.article.create({
          data: {
            title: item.title,
            summary: item.summary,
            source: item.source,
            url: item.url,
            category: item.category,
            examContext: examContext
          }
        });
        console.log(`Saved: ${item.title}`);
      }
    }
    console.log(`[${new Date().toISOString()}] Agent finished processing.`);
  } catch (error) {
    console.error("Agent Error:", error);
  }
}

// Schedule the agent to run every hour
cron.schedule('0 * * * *', fetchAndProcessNews);

// Also run once on startup
fetchAndProcessNews();

module.exports = { fetchAndProcessNews };
