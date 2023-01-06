'use strict';

const copyToClickBoard = (event) => {
    event.preventDefault();
    const content = discountCode.innerHTML.replaceAll(" ", "");

    navigator.clipboard
        .writeText(content)
        .then(() => {
            document.querySelector('.form-button-copy').innerText = "¡Copiado!"
        })
        .catch((err) => {
            alert('Something went wrong', err);
        });
}