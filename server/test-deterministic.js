require('dotenv').config();
const { analyzeResume } = require('./utils/ai');

// Sample resume and job description
const jobDescription = `Senior React Developer

We're looking for an experienced React Developer to build beautiful and responsive user interfaces. 
You'll work closely with our design and backend teams to deliver seamless user experiences.

Requirements:
- 5+ years of React development experience
- JavaScript ES6+ proficiency
- HTML5 and CSS3 knowledge
- Experience with state management (Redux/Context API)
- Git version control
- Understanding of RESTful APIs
- Tailwind CSS experience
`;

const resumeText = `John Doe
Senior Frontend Developer

Experience:
- 6 years of React development at Tech Companies
- Expert in JavaScript ES6+, HTML5, CSS3
- Proficient with Redux for state management
- Experience with RESTful APIs and Axios
- Git expert with GitHub experience
- Strong Tailwind CSS skills
- Experience with Webpack and Vite

Skills: React, JavaScript, Redux, HTML5, CSS3, Git, REST APIs, Tailwind CSS, Node.js basics`;

async function testDeterministicScoring() {
    console.log("🧪 Testing Deterministic AI Scoring...\n");
    console.log("Resume: Senior React Developer");
    console.log("Job: React Frontend Developer\n");
    console.log("Submitting the same resume 5 times...\n");
    
    const results = [];
    
    for (let i = 1; i <= 5; i++) {
        console.log(`📝 Attempt ${i}...`);
        try {
            const result = await analyzeResume(jobDescription, resumeText);
            results.push(result.score);
            console.log(`✅ Score: ${result.score}%`);
            console.log(`   Match Size: ${result.matchSize}`);
            console.log(`   Summary: ${result.summary.substring(0, 80)}...\n`);
        } catch (error) {
            console.error(`❌ Error on attempt ${i}:`, error.message);
        }
    }
    
    // Check if all scores are identical
    console.log("\n📊 Results Summary:");
    console.log("─".repeat(50));
    results.forEach((score, index) => {
        console.log(`Attempt ${index + 1}: ${score}%`);
    });
    console.log("─".repeat(50));
    
    const allIdentical = results.every(score => score === results[0]);
    
    if (allIdentical) {
        console.log(`\n✅ SUCCESS! All 5 scores are IDENTICAL: ${results[0]}%`);
        console.log("🎉 Deterministic AI is working correctly!");
    } else {
        console.log(`\n⚠️  INCONSISTENT scores detected:`);
        console.log(`Scores: ${results.join(", ")}`);
        console.log("Note: Slight variations can occur if temperature is not properly set.");
    }
}

testDeterministicScoring();
