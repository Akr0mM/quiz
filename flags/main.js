const score = document.getElementById('score');
const questionNumber = document.getElementById('question-number');
const totalQuestions = document.getElementById('total-question-number');
const flag = document.getElementById('flag');
const res1 = document.getElementById('r-1');
const res2 = document.getElementById('r-2');
const res3 = document.getElementById('r-3');
const res4 = document.getElementById('r-4');
const responses = [
    res1,
    res2,
    res3,
    res4
];
var responsesNotFilled = [
    res1,
    res2,
    res3,
    res4
];

const TOTAL_QUESTIONS = 25;
totalQuestions.textContent = TOTAL_QUESTIONS;

var countries = [];
var response = '';

window.onload = init();

async function init() {
    // if (navigator.connection == false) return console.error('No connection');

    const response = await fetch("https://restcountries.com/v3.1/all");
    countries = await response.json();

    responses.forEach(response => {
        response.addEventListener('click', () => { testResponse(response.textContent); });
    });

    generateQuestion(); 
}

function generateQuestion() {
    responsesNotFilled = [res1, res2, res3, res4];
    if (questionNumber.textContent != totalQuestions.textContent) {
        let nextQuestionNumber = parseInt(questionNumber.textContent);
        questionNumber.textContent = nextQuestionNumber + 1;
        let country = generateCountry();

        response = country.name;
        flag.src = country.flag;
        let randomPosRes = Math.floor(Math.random() * responses.length);
        responsesNotFilled.splice(randomPosRes, 1);
        responses[randomPosRes].textContent = response;
        responsesNotFilled.forEach(response => {
            response.textContent = generateCountry().name;
        });
    } else endGame();
}

function generateCountry() {
    let randomCountry = countries[Math.floor(Math.random() * countries.length)];
    let countryName = randomCountry.name.common;
    let countryFlag = randomCountry.flags.png;
    return {
        name: countryName,
        flag: countryFlag
    };
}

function endGame() {
    console.log('End of the game\n' +
        'You did ' + score.textContent + '/' + totalQuestions.textContent + '\n' +
        (parseInt(score.textContent / parseInt(totalQuestions.textContent) * 100)) + '% accurate');
}

function testResponse(responseToTest) {
    if (responseToTest === response) {
        console.log(response + '\nGood Job !');
        nextScore = parseInt(score.textContent);
        score.textContent = nextScore + 1;

        generateQuestion();
    } else {
        console.log('False !' +
            '\nIt was ' + response);

        generateQuestion();
    }
}