const question = document.querySelector(".question");
const incorrect = document.querySelectorAll(".incorrect");
const correct = document.querySelector(".correct");
const buttons = document.querySelectorAll(".buttons");
const answersList = document.querySelector(".answer-list");

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
        wrong.textContent = quizInfo.results[0].incorrect_answers;

    })
    correct.textContent = quizInfo.results[0].correct_answer;

    let buttonsArray = Array.from(buttons);
    console.log("Array", buttonsArray);

function randomAnswers() {
    let i = buttonsArray.length, j, temp;

    while(--i > 0) {
        // Get random number ranging between 0 and i
        j = Math.floor(Math.random() * (i+1));
    
        temp = buttonsArray[j];
        buttonsArray[j] = buttonsArray[i];
        buttonsArray[i] = temp;
    }
        // Append items from the randomized array into the list, I know I can use map instead of forEach
        console.log("Array Modified:",buttonsArray);
        buttonsArray.map(button => {
            button.remove();


            const newBtn = document.createElement("button");
            newBtn.classList.add("buttons");
            const btnText = document.createTextNode(button.textContent);
            newBtn.appendChild(btnText);
            answersList.appendChild(newBtn);

            console.log("Is:",button)
            console.log("are:", buttons[0])
        })
}
randomAnswers();
// when Clicking on an answer it should tell me the correct and incorrect one
//don't select it with the query selector but select it from the class
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if(btn.classList.contains("buttons")) {
            console.log("the answers is wrong!!!!!!")
        } else {
            console.log("The answer is correct!!!!")
        }
    })
})

})
//When clicking on right answer it should turn green
//When clicking on wrong answer it should turn red, and the right answer green

//Answer can only be clicked once
//Each answer should be stored till the end
//Add the type of question and make it so its never a true or false question
//Add a next button where the question would change when clicked
//next button only activates after answering question
//do 5 questions
//Process, read.me 