'use strict';

const stepOneButton = document.querySelector('.form-step-one-button');
const stepTwoButton = document.querySelector('.form-step-two-button');

const stepOneForm = document.querySelector('.form-step-one');
const stepTwoForm = document.querySelector('.form-step-two');
const stepThreeForm = document.querySelector('.form-step-three');

const stepOneRadioButtons = document.querySelectorAll('.form-step-one-radio');
const stepTwoRadioButtons = document.querySelectorAll('.form-step-two-radio');

const discountCode = document.querySelector('.form-discount-code');
const copyDiscountButton = document.querySelector('.form-button-copy');

let timer;
let minutes = 20 * 60000;
let finish;

let yearValue = 7;
let charValue = 'NVJ';

const stepOne = (event) => {
    event.preventDefault();
    stepTwoForm.classList.remove('hidden');
    stepOneForm.classList.add('hidden');
}

const stepTwo = (event) => {
    event.preventDefault();

    finish = Date.now() + minutes;
    timer = setInterval(showRemaining);

    stepTwoForm.classList.add('hidden');
    stepThreeForm.classList.remove('hidden');
}

const getYearValue = (event) => {
    const yearEventValue = event.currentTarget.value;
    const firstNumber = yearEventValue.charAt(yearEventValue.length - 1);
    const secondNumber = yearEventValue.charAt(yearEventValue.length - 2);

    yearValue = parseInt(firstNumber) + parseInt(secondNumber);
    renderCode(yearValue, charValue);
}

function getCharValue(event) {
    const characterValue = event.currentTarget?.value?.replaceAll('a', '').normalize().toUpperCase();

    charValue = characterValue.substring(characterValue.length - 4);
    renderCode(yearValue, charValue);
}

const renderCode = (number, characters) => {
    discountCode.innerHTML = number + characters;
}

//Listeners

for (const yearRadioButtons of stepOneRadioButtons) {
    yearRadioButtons.addEventListener('click', getYearValue);
}

for (const charRadioButtons of stepTwoRadioButtons) {
    charRadioButtons.addEventListener('click', getCharValue);
}

stepOneButton.addEventListener('click', stepOne);
stepTwoButton.addEventListener('click', stepTwo);
copyDiscountButton.addEventListener('click', copyToClickBoard);


//countdown 

let _second = 1000;
let _minute = _second * 60;
let _hour = _minute * 60;
let _day = _hour * 24;

const showRemaining = () => {
    const now = new Date();
    const distance = finish - now;

    if (distance < 0) {
        clearInterval(timer);

        document.querySelector('.form-countdown').classList.add('hidden');
        document.querySelector('.form-countdown-end').classList.remove('hidden')
        return;
    }

    const minutes = Math.floor((distance % _hour) / _minute);
    const seconds = Math.floor((distance % _minute) / _second);

    let minutesText = `${minutes}`
    let secondsText = `${seconds}`

    if (minutes < 10) {
        minutesText = `0${minutes}`;
    }

    if (seconds < 10) {
        secondsText = `0${seconds}`;
    }

    document.querySelector(
        '.form-timeout-text'
    ).innerText = `${minutesText}:${secondsText}`;

    console.log({ minutesText: minutesText, secondsText: secondsText, minutes: minutes, seconds: seconds })
}
