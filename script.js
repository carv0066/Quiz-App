const question = document.querySelector(".question");
const incorrect = document.querySelectorAll(".incorrect");
const correct = document.querySelector(".correct");
const buttons = document.querySelectorAll(".buttons");
const answersList = document.querySelector(".answer-list");
const nextBtn = document.querySelector(".next");

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
    //Quiz data is the same as the info
    console.log("Data is", quizInfo)
    console.log("Question is:", quizInfo.results[0].question);
    question.textContent = quizInfo.results[0].question;

    incorrect.forEach(wrong => {
        //Loop trough the wrong answers and Log each answer in a separate button
        wrong.textContent = quizInfo.results[0].incorrect_answers.shift();

    })
    correct.textContent = quizInfo.results[0].correct_answer;

    let buttonsArray = Array.from(buttons);
    console.log("Not Random Array:", buttons);

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
        let clickCounter = 0;
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
})

//After clicking on next button It should send me to the next question
//The number of the question should update after clicking the next button




//Each answer should be stored till the end
//Add the type of question and make it so its never a true or false question
//Add a next button where the question would change when clicked
//next button only activates after answering question
//Ony multiple choice question, not true or false
//do 5 questions
//Process, read.me 