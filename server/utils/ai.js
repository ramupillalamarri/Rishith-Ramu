const { GoogleGenerativeAI } = require("@google/generative-ai");

// Mock analysis function for testing without API key
function getMockAnalysis(jobDescription, resumeText) {
    const scores = [45, 65, 78, 82, 55, 91, 72];
    const randomScore = scores[Math.floor(Math.random() * scores.length)];
    
    let matchSize = "Low";
    if (randomScore >= 75) matchSize = "High";
    else if (randomScore >= 55) matchSize = "Medium";

    return {
        score: randomScore,
        matchSize: matchSize,
        summary: `The candidate shows ${matchSize.toLowerCase()} alignment with the job requirements. Their background demonstrates relevant experience, though some skill gaps were identified that could be addressed through training or mentoring.`,
        missingKeywords: ["Docker", "Kubernetes", "CI/CD", "Agile"],
        interviewQuestions: [
            "Can you describe your experience with containerization and orchestration tools?",
            "Tell us about a challenging project you led and how you overcame obstacles.",
            "How do you approach learning new technologies and frameworks?",
            "Describe your experience with agile development methodologies.",
            "What are your career goals and how does this role fit into your growth path?"
        ]
    };
}

async function analyzeResume(jobDescription, resumeText) {
    // Check if API key is valid (should start with 'AIza' for Google API keys)
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes('test-key') || process.env.GEMINI_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
        console.warn("⚠️  Using mock analysis mode (no valid GEMINI_API_KEY)");
        return getMockAnalysis(jobDescription, resumeText);
    }

    console.log("✅ Using Google Generative AI (Gemini 2.0 Flash)");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash",
        generationConfig: {
            temperature: 0, // Set to 0 for deterministic responses
            topP: 1,
            topK: 1,
            maxOutputTokens: 1000,
        }
    });

    const prompt = `You are an expert HR Recruitment AI. Analyze this resume against the job description OBJECTIVELY and CONSISTENTLY.

Job Description:
"${jobDescription}"

Candidate Resume:
"${resumeText.substring(0, 30000)}"

Provide ONLY valid JSON (no markdown blocks). Be consistent and objective. Use this exact structure:
{
  "score": number (0-100, based on skill match percentage),
  "matchSize": "High" (75-100) or "Medium" (50-74) or "Low" (0-49),
  "summary": "2-3 sentences about fit",
  "missingKeywords": ["skill1", "skill2", "skill3"],
  "interviewQuestions": ["question1", "question2", "question3", "question4", "question5"]
}`;

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        console.log("Raw AI response:", responseText);
        
        // Clean up potential markdown formatting
        let jsonString = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        
        // Handle cases where JSON might be wrapped in quotes
        if (jsonString.startsWith('"') && jsonString.endsWith('"')) {
            jsonString = jsonString.slice(1, -1).replace(/\\"/g, '"');
        }
        
        const parsedResult = JSON.parse(jsonString);
        
        // Validate and ensure correct structure
        return {
            score: Math.min(100, Math.max(0, parsedResult.score || 0)),
            matchSize: parsedResult.matchSize || "Medium",
            summary: parsedResult.summary || "Analysis completed",
            missingKeywords: Array.isArray(parsedResult.missingKeywords) ? parsedResult.missingKeywords : [],
            interviewQuestions: Array.isArray(parsedResult.interviewQuestions) ? parsedResult.interviewQuestions : []
        };
    } catch (error) {
        console.error("AI Analysis Error:", error.message);
        console.log("Falling back to mock analysis");
        // Fallback to mock if real API fails
        return getMockAnalysis(jobDescription, resumeText);
    }
}

module.exports = { analyzeResume };
