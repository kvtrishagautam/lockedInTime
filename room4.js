const clues = [
    {
        clue: "🧙 In layers they dance, a style so fine, dress up your pages, let your beauty shine. Three letters hold the key to this grace, type them backward to find your place. 🧙",
        answer: "ssc"
    },
    {
        clue: "🔮 A tale of reuse, a script that’s wise, with logic and loops, it begins to rise. An eight-letter secret, crafted with care, reverse the sounds, and you’ll find it there. 🔮",
        answer: "noitcnuf"
    },
    {
        clue: "🕸️ To build a foundation, a structure you seek, four letters entwined, in elegance, they speak. The canvas of the web, where all things align, spell it in reverse, and the answer will shine. 🕸️",
        answer: "lmth"  // Changed answer to match HTML
    },
    {
        clue: "🧩 In testing we trust, to catch every flaw, with vigilance keen, we scrutinize all. An eight-letter mantra, of quality's call, type it in reverse, let the challenge enthrall. 🧩",
        answer: "gnitset"
    },
    {
        clue: "✨ To code is to create, a magic unseen, find wisdom in error, let your logic glean. ✨",
        answer: "gniggubed" // Changed answer to match debugging
    }
];

let currentClueIndex = 0;
let timeLeft = 60;
let timerId;

const clueText = document.getElementById('clue-text');
const answerInput = document.getElementById('answer-input');
const submitAnswerButton = document.getElementById('submit-answer');
const feedback = document.getElementById('feedback');
const timer = document.getElementById('time');
const escapeButton = document.getElementById('escape-button'); // Reference to the escape button

function loadClue() {
    clueText.textContent = clues[currentClueIndex].clue;
    answerInput.value = '';
    feedback.textContent = '';
    timeLeft = 60;
    timer.textContent = timeLeft;
    clearInterval(timerId);
    timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timerId);
        feedback.textContent = "Time's up! Try again.";
        disableInput();
    }
}

function disableInput() {
    answerInput.disabled = true;
    submitAnswerButton.disabled = true;
}

function enableInput() {
    answerInput.disabled = false;
    submitAnswerButton.disabled = false;
}

submitAnswerButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim(); // Remove extra spaces
    const correctAnswer = clues[currentClueIndex].answer;

    // Input validation
    if (userAnswer === "") {
        feedback.textContent = "Please enter an answer!";
        return;
    }

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Correct! Moving to the next clue.";
        currentClueIndex++;
        enableInput(); // Re-enable input for the next clue
        if (currentClueIndex < clues.length) {
            loadClue();
        } else {
            feedback.textContent = "Congratulations! You've completed the challenge.";
            clearInterval(timerId);
            escapeButton.style.display = 'block'; // Show the escape button
        }
    } else {
        feedback.textContent = "Incorrect, try again!";
    }
});

// Redirect to home page on escape button click
escapeButton.addEventListener('click', () => {
    window.location.href = 'dashboard.html'; // Change this URL to your actual home page
});

window.onload = () => {
    loadClue();
}
