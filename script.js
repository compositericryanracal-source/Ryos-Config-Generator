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

function generateConfig(){

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

    setTimeout(() => {

        clearInterval(loadingInterval);

        generatedConfig = buildConfig();

        document.getElementById("loading-screen")
            .classList.add("hidden");

        document.getElementById("success-screen")
            .classList.remove("hidden");

    }, 4000);
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
