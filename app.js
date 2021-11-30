const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let image = document.getElementsByTagName('img');
let missed = 0;

const phrases = [
    'in space no one can hear you scream', 
    'get to the chopper', 
    'come with me if you want to live', 
    'may the force be with you',
    'take the gun leave the cannoli'
];

// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    const randomNum = Math.floor(Math.random() * arr.length);
    let phraseArray = arr[randomNum].split('');
    return phraseArray;
}


// adds the letters of a string to the display
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('LI');
        let ul = phrase.firstElementChild;
        li.textContent = arr[i];
        ul.appendChild(li);
        if (li.textContent !== ' ') {
            li.classList.add("letter");
        } else {
            li.classList.add("space");
        }
    }
}

// check if a letter is in the phrase
const checkLetter = button => {
    let letters = document.querySelectorAll('li');
    let matched = null;
    for (i=0; i <letters.length; i++) {
        if (button === letters[i].textContent.toLowerCase()) {
        letters[i].classList.add('show');
        matched = true;    
        }
    }
    return matched;
}

// check if the game has been won or lost
const checkWin = () => {
    let correctLetter = document.getElementsByClassName('letter');
    let showLetter = document.getElementsByClassName('show');
    if (correctLetter.length === showLetter.length) {
        overlay.className = 'win';
        overlay.firstElementChild.textContent = 'You won!';
        overlay.style.display = 'flex';
        phrase.style.display = 'none'; // unsure why, but transition/transform for displayed letters shows on top of win/loss overlay, this fixes
    } else if (missed > 4) {
        overlay.className = 'lose';
        overlay.firstElementChild.textContent = 'You lost!';
        overlay.style.display = 'flex';
        phrase.style.display = 'none'; // unsure why, but transition/transform for displayed letters shows on top of win/loss overlay, this fixes
    }
    startButton.textContent = "Play Again?";
}

// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    phrase.style.display = 'revert'; // this "fixes" the "fix" from lines 61 or 66
    missed = 0; 
    for (let i = 0; i < image.length; i++) {
        image[i].src = 'images/liveHeart.png';
    }
    phrase.firstElementChild.innerHTML = ''; 
    let oldKeys = document.querySelectorAll('.chosen')
    for (let l = 0; l < oldKeys.length; l++) {
        oldKeys[l].removeAttribute('disabled');
    }
    for (let m = 0; m < oldKeys.length; m++) {
        oldKeys[m].classList.remove("chosen");
    }
    overlay.style.display = 'none';
    let phraseArray = getRandomPhraseAsArray(phrases);
    getRandomPhraseAsArray(phrases); 
    addPhraseToDisplay(phraseArray);  
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
    if (e.target.tagName === "BUTTON") {
        e.target.className = 'chosen';
        e.target.disabled = true;
        const match = checkLetter(e.target.textContent.toLowerCase());
        if (match === null) {
            missed++;
            image[missed - 1].src = 'images/lostHeart.png';
        }
        checkWin();
    }
});

