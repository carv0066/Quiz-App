const question = document.querySelector(".question");
const incorrect = document.querySelectorAll(".incorrect");
const correct = document.querySelector(".correct");
const buttons = document.querySelectorAll(".buttons");
const answersList = document.querySelector(".answer-list");
const nextBtn = document.querySelector(".next");
const questionTitle = document.querySelector(".question-title");
const container = document.querySelector(".container");


function decodeHtmlEntities(text) {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
}
//Fetch the data from an API
const apiUrl = "https://opentdb.com/api.php?amount=10&category=9&type=multiple";
// Make a GET request using the Fetch API
async function fetchQuestions() {
    try {
        const response = await fetch(apiUrl);
        const quizData = await response.json();
        return quizData;
    } catch (error) {
        console.error("An error ocurred", error);
    }
}
//Grab data Fetched and replace placeholder content(Question and 4 answers);
fetchQuestions().then(quizInfo => {
    index = 0;
    number = 1; //Numger on the question title
    //Quiz data is the same as the info
    console.log("Data is", quizInfo)

    question.textContent = decodeHtmlEntities(quizInfo.results[index].question);
    incorrect.forEach((wrong, i) => {
        //Loop trough the wrong answers and Log each answer in a separate button
        wrong.textContent = decodeHtmlEntities(quizInfo.results[index].incorrect_answers[i]);
    })
    correct.textContent = decodeHtmlEntities(quizInfo.results[index].correct_answer);

    //When clicking on next I should get a New Question with its answer options
    nextBtn.addEventListener("click", () => {
        //RESET the button click style changes
        buttonsArray.forEach(button => {
            button.style.backgroundColor = "";
        });
        clickCounter = 0;

        // Disable next button until an answer is selected again
        nextBtn.classList.toggle("nextdis");
        nextBtn.disabled = true;

        //Increase the index inside the array after every click with a counter
        index++;

        if(index < 10) {
            question.textContent = decodeHtmlEntities(quizInfo.results[index].question);
            incorrect.forEach((wrong, i) => {
                wrong.textContent = decodeHtmlEntities(quizInfo.results[index].incorrect_answers[i]);
            })
            correct.textContent = decodeHtmlEntities(quizInfo.results[index].correct_answer);
            
            //Increase number on the question
            number++;
            questionTitle.innerHTML =
                `Question ${number}`;
    
            // Call randomAnswers again to shuffle and reattach the button event listeners for the styling and clicks
            randomAnswers();
        }
        //On the last question it Should give me the results of my correct vs incorrect answers
        else if(incorrectCounter >= correctCounter) {
            container.innerHTML =
            `<div>
            <h2>You Failed!</h2>
            <h3>Incorrect Answers:</h3>${incorrectCounter}
            <br>
            <h3>Correct Answers:</h3>${correctCounter}
            </div>`;
            container.style.backgroundColor = "#FFB7C3";
        }

        else if (correctCounter > incorrectCounter) {
            container.innerHTML =
            `<div>
            <h2>Congrats!</h2>
            <h3>Incorrect Answers:</h3>${incorrectCounter}
            <br>
            <h3>Correct Answers:</h3>${correctCounter}
            </div>`;
            container.style.backgroundColor = "#B4EBCA";
        }
    })
})

let buttonsArray = Array.from(buttons);
console.log("Not Random Array:", buttons);

let clickCounter = 0;
let incorrectCounter = 0;//Amount of incorrect answers
let correctCounter = 0;//Amount of correct Answers

function randomAnswers() {
    let i = buttonsArray.length,
        j, temp;

    while (--i > 0) {
        // Get random number ranging between 0 and i
        j = Math.floor(Math.random() * (i + 1));

        temp = buttonsArray[j];
        buttonsArray[j] = buttonsArray[i];
        buttonsArray[i] = temp;
    }
    // Clear the placeholder answers
    answersList.innerHTML = "";
    //After Clicking on one answer it should not let me click any other option
    buttonsArray.forEach(button => {
        //Grab list of answers and append new random answers to it
        answersList.append(button)

        button.addEventListener('click', () => {
            if (button.classList.contains("incorrect") && clickCounter < 1) {
                button.style.backgroundColor = "#FFB7C3";
                clickCounter++;
                nextBtn.classList.toggle("nextdis");
                nextBtn.disabled = false;
                incorrectCounter++
            } else if (button.classList.contains("correct") && clickCounter < 1) {
                button.style.backgroundColor = "#B4EBCA";
                clickCounter++;
                nextBtn.classList.toggle("nextdis");
                nextBtn.disabled = false;
                correctCounter++
            }
        })
    })
}
randomAnswers();

//No need for local storage