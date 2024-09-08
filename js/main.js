const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = [...letters];

let lettersContainer = document.querySelector(".letters");

let controlBtns = document.querySelector(".control-buttons .btns");

lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";

    lettersContainer.appendChild(span);
});

let stopTimer;
let timeLeft = 180;

const words = {
    scientists : ["Einstein", "Newton", "Curie", "Galileo", "Darwin", "Tesla", "Hawking", "Pasteur", "Faraday", "Maxwell", "Aristotle", "Archimedes", "Feynman", "Hooke", "Huygens", "Turing", "Kepler", "Mendeleev", "Lavoisier", "Crick"],
    historical_Figures: ["Napoleon", "Caesar", "Alexander", "Gandhi", "Lincoln", "Churchill", "Cleopatra", "Hours", "Mandela", "Washington", "Hitler", "Stalin", "Plato", "Confucius", "Martin Luther", "sesi", "Michelangelo", "Shakespeare", "Columbus", "Charlemagne"],
    countries: ["China", "India", "Germany", "palestine", "Japan", "Brazil", "Canada", "Russia", "Australia", "Italy", "sudan", "Mexico", "Spain", "Banen", "Egypt", "Argentina", "Saudi", "Korea", "Turkey", "Netherlands"],
    football_Players : ["Messi", "Ronaldo", "Pele", "Maradona", "Beckham", "Zidane", "Neymar", "Mbappe", "Xavi", "Iniesta", "Ronaldinho", "Cruyff", "Kaka", "Rooney", "Haaland", "Kante", "Scholes", "Lampard", "Rivaldo", "Baggio"],
    fruits : ["Apple", "Banana", "Orange", "Strawberry", "Grape", "Mango", "Pineapple", "Blueberry", "Watermelon", "Peach", "Pear", "Kiwi", "Plum", "Cherry", "Raspberry", "Papaya", "Apricot", "Pomegranate", "Lemon", "Lime"],
};


let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName;
randomPropName = allKeys[randomPropNumber];

// ***********************

allKeys.forEach(key => {
    let btn = document.createElement("button");
    btn.className = key;
    btn.classList.add("rounded-pill");
    btn.innerHTML = key;
    controlBtns.appendChild(btn);
});
let btns = Array.from( document.querySelectorAll(".control-buttons .btns button"));
btns.forEach(btn => {
    btn.onclick = function(){
        randomPropName = btn.innerHTML;
        console.log(randomPropName);
        document.querySelector(".control-buttons span").click();
    }
});
// ***********************
document.querySelector(".control-buttons span").onclick = function () {
    playSound("start");
    document.querySelector(".control-buttons").remove();

    stopTimer = setInterval(updateTimer, 1000);

    let randomPropValue = words[randomPropName];
    
    let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
    let randomValueValue = randomPropValue[randomValueNumber];
    console.log(randomValueValue);
    document.querySelector(".game-info .category span").innerHTML = `${randomPropName} `;
    
    let lettersGuessContainer = document.querySelector(".letters-guess");
    
    let lettersAndSpace = Array.from(randomValueValue);
    
    lettersAndSpace.forEach(letter => {
        let span = document.createElement("span");
        if (letter === " ") {
            span.className = "with-space";
        }
        lettersGuessContainer.appendChild(span);
    });
    
    let guessSpans = document.querySelectorAll(".letters-guess span");
    let guessSpansArray = Array.from(guessSpans);
    
    let wrongAttempts = 0;
    
    let theDraw = document.querySelector(".hangman-draw");
    
    
    
    document.addEventListener("click", (e) => {
    
        let theStatus = false;
    
        if (e.target.className === "letter-box") {
            
            e.target.classList.add("clicked");
    
            let theClickedLetter = e.target.innerHTML.toLowerCase();
    
            let chosenWord = Array.from(randomValueValue.toLowerCase());
    
    
            chosenWord.forEach((wordLetter, wordIndex) => {
                
                if (theClickedLetter == wordLetter) {
                    
                    theStatus = true;
    
                    guessSpans.forEach((span, spanIndex) => {
                        
                        if (wordIndex === spanIndex) {
    
                            span.innerHTML = theClickedLetter;
                        };
                    });
                }
            });
            // outside loop
            
    
            if (theStatus !== true) {
                
                wrongAttempts++;
    
                theDraw.classList.add(`wrong-${wrongAttempts}`);
                
                playSound("wrong");
    
                if (wrongAttempts === 8) {
    
                    endGameLose();
    
                    lettersContainer.classList.add("finished");
                }
    
            } else {
                playSound("right");
                endGameWin();
            }
        }
    });
    
    function endGameLose() {
        playSound("over");
        let div = document.createElement("div");
        let divText = document.createTextNode(`Game Over, The Word is (${randomValueValue})`);
        let icon = document.createElement("i");
        icon.classList.add("fa-solid");
        icon.classList.add("fa-heart-crack");
    
    
        div.appendChild(divText);
        div.appendChild(document.createElement("br"));
        div.appendChild(icon);
    
        div.className = "popup";
    
        document.body.appendChild(div);
        clearInterval(stopTimer);
    
        reload();
    };
    function endGameWin() {
        let checkWin = guessSpansArray.every(span => span.innerHTML.trim() !== "");
        if (checkWin) {
            let div = document.createElement("div");    
            let divText = document.createTextNode(`You Win`);
            div.appendChild(divText);
    
            showConfetti();
            playSound("win");
            div.className = "popup";
    
            document.body.appendChild(div);
            clearInterval(stopTimer);
    
            reload();
        };
    };
    function updateTimer() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
    
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
    
        document.getElementById("timer").textContent = minutes + ":" + seconds;
    
        timeLeft--;
    
        if (timeLeft < 0 ) {
            clearInterval(stopTimer);
            document.getElementById("timer").textContent = " Time Over !";
            lettersContainer.classList.add("finished");
            endGameLose();
            playSound("over");
        }
    };
};

function playSound(idAudio) {
    let audio = document.getElementById(idAudio);
    audio.pause();
    audio.currentTime = 0;
    audio.play();
};
function showConfetti() {
    
    var d = 15 * 1000;
    var animationEnd = Date.now() + d;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / d);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // ****************************************************
    var end = Date.now() + (15 * 1000);

    // go Buckeyes!
    var colors = ['#bb0000', '#ffffff'];

    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
};

function hexToRgb(hex) {
    // إزالة الهاش # إذا كانت موجودة
    hex = hex.replace(/^#/, '');

    // تحويل اللون إلى رقم صحيح
    let bigint = parseInt(hex, 16);

    // استخراج قيم RGB
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return `${r} ${g} ${b} / 20%`;
}

  // استدعاء متغير CSS
let root = document.documentElement;
let primaryColorHex = getComputedStyle(root).getPropertyValue('--primary-color').trim();

// تحويل اللون من Hex إلى RGB

let primaryColorRgb = hexToRgb(primaryColorHex);

// إنشاء متغير جديد في CSS مع القيمة الجديدة
root.style.setProperty('--primary-color-rgb', `rgb(${primaryColorRgb})`);

// يمكنك الآن استخدام المتغير الجديد في CSS
getComputedStyle(root).getPropertyValue('--primary-color-rgb');




document.getElementById('stop-sound').addEventListener('click', function() {
    let sounds = document.querySelectorAll('audio');
    
    sounds.forEach(function(sound) {
        sound.pause(); // إيقاف الصوت
        sound.currentTime = 0; // إعادة الصوت إلى البداية
        sound.src = "";
    });
});

function reload() {
    let re = document.querySelector(".reload svg");
    re.classList.add("d-inline-block");
};

document.querySelector(".reload div").onclick = () => {
    location.reload();
};


document.addEventListener("keydown", (e) => {
    let pressedLetter = e.key.toLowerCase(); // الحصول على الحرف الذي تم الضغط عليه وتحويله إلى حرف صغير

    let letterBox = Array.from(document.querySelectorAll(".letter-box")); // الحصول على كل عناصر الأحرف

    // البحث عن الحرف المطابق في عناصر الأحرف
    letterBox.forEach(letter => {
        if (letter.innerHTML === pressedLetter && !letter.classList.contains("clicked")) {
            letter.click(); // محاكاة النقر على الحرف
        }
    });
});