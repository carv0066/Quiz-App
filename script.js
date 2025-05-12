const question = document.querySelector(".question");
const incorrect = document.querySelectorAll(".incorrect");
const correct = document.querySelector(".correct");
const buttons = document.querySelectorAll(".buttons");
const answersList = document.querySelector(".answer-list");
const nextBtn = document.querySelector(".next");
const questionTitle = document.querySelector(".question-title");

//Fetch the data from an API
const apiUrl = "https://opentdb.com/api.php?amount=10";
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
    number = 1;//Numger on the question title
    //Quiz data is the same as the info
    console.log("Data is", quizInfo)
    console.log("these are the questions", quizInfo.results[index]);
    question.textContent = quizInfo.results[index].question;
    incorrect.forEach((wrong, i) => {
        //Loop trough the wrong answers and Log each answer in a separate button
        wrong.textContent = quizInfo.results[index].incorrect_answers[i];
    })
    correct.textContent = quizInfo.results[index].correct_answer;

    //When clicking on next I should get a New Question with its answer options
    nextBtn.addEventListener("click", () => {
        console.log("Button clicked!", nextBtn.textContent);
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

        question.textContent = quizInfo.results[index].question;
        incorrect.forEach((wrong, i) => {
            wrong.textContent = quizInfo.results[index].incorrect_answers[i];
        })
        correct.textContent = quizInfo.results[index].correct_answer;

        //Increase number on the question
        number++;
        questionTitle.innerHTML = 
        `Question ${number}`;

        // Call randomAnswers again to shuffle and reattach the button event listeners for the styling and clicks
        randomAnswers();
    })
})

let buttonsArray = Array.from(buttons);
console.log("Not Random Array:", buttons);

let clickCounter = 0;

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
    console.log("Randomized Array:", buttonsArray);
    // Clear the placeholder answers
    answersList.innerHTML = "";
    //After Clicking on one answer it should not let me click any other option
    buttonsArray.forEach(button => {
        //Grab list of answers and append new random answers to it
        answersList.append(button)

        button.addEventListener('click', () => {
            if (button.classList.contains("incorrect") && clickCounter < 1) {
                console.log("the answers is wrong!!!!!!")
                button.style.backgroundColor = "#FFB7C3";
                clickCounter++;
                nextBtn.classList.toggle("nextdis");
                nextBtn.disabled = false;
            } else if (button.classList.contains("correct") && clickCounter < 1) {
                console.log("The answer is correct!!!!")
                button.style.backgroundColor = "#B4EBCA";
                clickCounter++;
                nextBtn.classList.toggle("nextdis");
                nextBtn.disabled = false;
            }
        })
    })
}
randomAnswers();


//Learn to save the answers for each question to check result at the end
//No boolean questions(true or false)
//remove true or false questions from it

//Make it so that after clicking on an answer, im not allowed to click the other buttons 
//The number of the question should update after clicking the next button
//find the &quot error, why it shows like that
//only multiple choice, maybe remove true or false
//give score at the end with how many correct and wrong answersds
//Process, read.me 