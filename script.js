const questions = [
    "What best describes your current work?",
    "When solving problems, what do you naturally do first?",
    "How do you prefer receiving information?",
    "What creates the most friction in your work?",
    "What puts you into flow?",
    "What drains your energy fastest?",
    "How do you typically make important decisions?",
    "What are you currently optimizing for?",
    "What environment helps you perform best?",
    "What kind of life are you ultimately trying to build?",
    "What do people consistently rely on you for?",
    "What challenge keeps showing up in your life?",
    "What do you learn unusually fast?",
    "What work feels most meaningful?",
    "If you could permanently solve one recurring problem, what would it be?"
];

let currentQuestion = 0;
let answers = [];
let generatedConfig = "";

const loadingMessages = [
    "Analyzing operating patterns",
    "Building cognition profile",
    "Building regulation profile",
    "Compiling configuration"
];

function startQuestionnaire(){

    document.getElementById("home-screen").classList.add("hidden");

    document.getElementById("question-screen").classList.remove("hidden");

    renderQuestion();
}

function renderQuestion(){

    document.getElementById("progress").innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("question").innerText =
        questions[currentQuestion];

    document.getElementById("answer").value =
        answers[currentQuestion] || "";
}

function nextQuestion(){

    const answer =
        document.getElementById("answer").value.trim();

    if(answer === "") return;

    answers[currentQuestion] = answer;

    currentQuestion++;

    if(currentQuestion >= questions.length){

        generateConfig();

    } else {

        renderQuestion();
    }
}

function previousQuestion(){

    if(currentQuestion === 0){

    document.getElementById("question-screen")
        .classList.add("hidden");

    document.getElementById("home-screen")
        .classList.remove("hidden");

    return;
}

    answers[currentQuestion] =
        document.getElementById("answer").value;

    currentQuestion--;

    renderQuestion();
}

function restartQuestionnaire(){

    const confirmed = confirm(
        "Restart and clear all answers?"
    );

    if(!confirmed) return;

    currentQuestion = 0;

    answers = [];

    renderQuestion();
}

async function generateConfig(){

    document.getElementById("question-screen")
        .classList.add("hidden");

    document.getElementById("loading-screen")
        .classList.remove("hidden");

    let index = 0;

    const loadingInterval = setInterval(() => {

        document.getElementById("loading-message")
            .innerText =
            loadingMessages[index % loadingMessages.length];

        index++;

    }, 1000);

    try{

        generatedConfig = await callAI(answers);

    } catch(error){

        console.error(error);

        generatedConfig =
            "Error generating configuration.\n\n" +
            error.message;
    }

    clearInterval(loadingInterval);

    document.getElementById("loading-screen")
        .classList.add("hidden");

    document.getElementById("success-screen")
        .classList.remove("hidden");
}

function buildConfig(){

    let output = "RYOS CONFIG\n\n";

    questions.forEach((question,index)=>{

        output += question + "\n";

        output +=
            (answers[index] || "") + "\n\n";

    });

    return output;
}

function downloadConfig(){

    const blob =
        new Blob([generatedConfig], {
            type:"text/plain"
        });

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download = "ryos-config.txt";

    a.click();
}
const API_KEY = "AQ.Ab8RN6JlUgz9xHkGtjnEEupkz77Y3zcPtps4_74FnC_eRajYeg";

async function callAI(userAnswers){

    const compiler =
    await fetch("prompt")
        .then(r => r.text());

const core =
    await fetch("ryos-core")
        .then(r => r.text());

const config =
    await fetch("ryos-config")
        .then(r => r.text());

const prompt = hi


    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + API_KEY,
        {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                contents:[
                    {
                        parts:[
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

console.log("FULL RESPONSE");
console.log(data);

    if (
    data.candidates &&
    data.candidates[0] &&
    data.candidates[0].content &&
    data.candidates[0].content.parts &&
    data.candidates[0].content.parts[0]
) {
    return data.candidates[0].content.parts[0].text;
}

console.log(data);

return JSON.stringify(data, null, 2);
}
/*
================================================

FUTURE AI INTEGRATION

const USE_AI = true;

async function callAI(){

    // Insert AI API here

    // Load:
    // RyOS Core
    // Rico Config
    // Compiler Prompt
    // User Answers

    return "AI GENERATED CONFIG";
}

================================================
*/
