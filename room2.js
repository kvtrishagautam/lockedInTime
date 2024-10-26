const magicalSpells = [
    {
        code: `function summonLightOrbs(orbCount) {
  let orbsPower == 0;
  for(let i = 0; i < orbCount; i++) {
    orbsPower += i
  }
  return orbsPower
}`,
        solution: `function summonLightOrbs(orbCount) {
  let orbsPower = 0;
  for(let i = 0; i < orbCount; i++) {
    orbsPower += i;
  }
  return orbsPower;
}`,
        scroll: "The ancient spell requires proper binding of magical energy. Check how the orbs' power is being bound.",
        description: "The Light Orb Summoning spell is failing to properly accumulate magical energy"
    },
    {
        code: `function mirrorDimension(enchantment) {
  return enchantment === enchantment.reverse();
}`,
        solution: `function mirrorDimension(enchantment) {
  return enchantment === enchantment.split('').reverse().join('');
}`,
        scroll: "The mirror dimension requires splitting the enchantment into its elemental components before reversing.",
        description: "The Mirror Dimension spell is not properly reflecting the magical enchantments"
    },
    {
        code: `function timeLoop(seconds) {
  for(let time = 0; time <= seconds; time--) {
    castTimeSpell(time);
  }
}`,
        solution: `function timeLoop(seconds) {
  for(let time = seconds; time >= 0; time--) {
    castTimeSpell(time);
  }
}`,
        scroll: "Time magic is delicate - ensure your loop doesn't create an eternal paradox.",
        description: "The Time Loop spell is causing an infinite temporal distortion"
    }
];

let currentSpell = 0;
let timeLeft = 600;
let scrollsLeft = 3;
let gameInterval;
let editor;

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = '✨';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkle.style.setProperty('--tx', `${(Math.random() - 0.5) * 100}px`);
    sparkle.style.setProperty('--ty', `${(Math.random() - 0.5) * 100}px`);
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1500);
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (timeLeft <= 0) {
        clearInterval(gameInterval);
        alert("Time's up! You couldn't escape!");
        document.getElementById('game-content').innerHTML = `<div class="game-over">Game Over! You couldn't escape in time!</div>`;
    }
}

function loadChallenge() {
    const spell = magicalSpells[currentSpell];
    document.getElementById('challenge-description').textContent = spell.description;
    document.getElementById('code-editor').value = spell.code;
    if (editor) {
        editor.setValue(spell.code);
    }
    document.getElementById('scroll-hint').style.display = 'none';
}

function startGame() {
    editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
        lineNumbers: true,
        mode: 'javascript',
        theme: 'monokai'
    });
    
    loadChallenge();
    
    gameInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
    }, 1000);
}

document.getElementById('scroll-btn').addEventListener('click', () => {
    if (scrollsLeft > 0) {
        scrollsLeft--;
        timeLeft -= 30;
        document.getElementById('scrolls').textContent = scrollsLeft;
        document.getElementById('scroll-hint').textContent = magicalSpells[currentSpell].scroll;
        document.getElementById('scroll-hint').style.display = 'block';
    } else {
        alert("No scrolls left!");
    }
});

document.getElementById('cast-btn').addEventListener('click', () => {
    const userCode = editor.getValue();
    if (userCode.trim() === magicalSpells[currentSpell].solution.trim()) {
        createSparkle(window.innerWidth / 2, window.innerHeight / 2);
        currentSpell++;
        if (currentSpell < magicalSpells.length) {
            loadChallenge();
        } else {
            clearInterval(gameInterval);
            alert("Congratulations! You've solved all the spells!");
            document.getElementById('game-content').innerHTML = `
                <div class="game-over">You have successfully escaped!</div>
                <button id="home-button" class="btn">Escaperoom</button>`;
            
            // Add an event listener for the home button
            document.getElementById('home-button').addEventListener('click', () => {
                window.location.href = 'dashboard.html'; // Change this to your home page URL
            });
        }
    } else {
        alert("Incorrect spell! Try again.");
    }
});

startGame();
