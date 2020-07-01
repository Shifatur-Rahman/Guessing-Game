//ui declare
const game = document.querySelector("#game");
const min = document.querySelector("#min");
const max = document.querySelector("#max");
const inputNum = document.querySelector("#inputNumber");
const submit = document.querySelector("#submit");
const loading = document.querySelector(".loading");
const message = document.querySelector(".message");
const progress = document.querySelector(".progress-bar");

// num declare
let minimum = 1,
  maximum = 10,
  winningNum = randomNum(minimum, maximum),
  totalGuess = 3;
// assign min & max value
min.innerHTML = minimum;
max.innerHTML = maximum;

submit.addEventListener("click", function (e) {
  var guess = inputNum.value;
  loading.style.display = "block";
  setTimeout(function () {
    loading.style.display = "none";
    if (isNaN(guess) || guess < minimum || guess > maximum) {
      setMessage(
        `Please enter a number between ${minimum} & ${maximum}`,
        "black"
      );
    } else {
      if (guess == winningNum) {
        gameOver(true, `${guess} is right, You Won`);

        progressBar("100%", "WIN WIN WIN", "bg-success");
      } else {
        totalGuess = totalGuess - 1;
        if (totalGuess == 0) {
          gameOver(false, `The  Game is Over. Correct answer is ${winningNum}`);
          progressBar("100%", "LOST LOST LOST", "bg-warning");
        } else {
          setMessage(`Wrong , You already have ${totalGuess} times`, "pink");
          switch (totalGuess) {
            case 2: {
              progressBar("33%", "Guess 2 left", "bg-danger");
              break;
            }
            case 1: {
              progressBar("66%", "Guess 1 left", "bg-danger");
              break;
            }
          }
        }
      }
    }
  }, 1500);

  e.preventDefault();
});

function progressBar(width, content, className) {
  progress.className = "progress-bar";
  progress.parentElement.style.height = "20px";
  progress.style.width = width;
  progress.textContent = content;
  progress.classList.add(className);
}
function setMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
}

function gameOver(bool, msg) {
  var color;
  bool === true ? (color = "green") : (color = "red");
  inputNum.disabled = true;
  inputNum.style.borderColor = color;
  setMessage(msg, color);
  submit.innerHTML = "Play Again";
  submit.className = "play-again";
}

//play again
game.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
});

function randomNum(minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum + 1));
}
