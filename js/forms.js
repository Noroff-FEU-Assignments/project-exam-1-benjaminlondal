const fullName = document.getElementById("name");
const nameError = document.getElementById("nameError");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
const subject = document.getElementById("subject");
const subjectError = document.getElementById("subjectError");
const message = document.getElementById("message");
const messageError = document.getElementById("messageError");
const submitButton = document.getElementById("send");
const validationFeedback = document.querySelector(".feedback");


function enableSubmitForm() {

    if (checkLength(fullName.value, 5) && emailValidation(email.value) && checkLength(subject.value, 15) && checkLength(message.value, 25)) {
        submitButton.disabled = false;
        validationFeedback.getElementsByClassName.display = "block";
    } else {
        submitButton.disabled = true;
        validationFeedback.style.display = "none";
    }

    if (checkLength(fullName.value, 5) ) {
        nameError.style.display = "none";
    } else {
        nameError.style.display = "block";
    }

    if (emailValidation(email.value) ) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    if (checkLength(subject.value, 15) ) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
    }

    if (checkLength(message.value, 25) ) {
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block";
    }
    
}

fullName.addEventListener("keyup", enableSubmitForm);
email.addEventListener("keyup", enableSubmitForm);
subject.addEventListener("keyup", enableSubmitForm);
message.addEventListener("keyup", enableSubmitForm);

function checkLength(value, len) {

    if (value.trim().length >= len) {
        return true;
    } else {
        return false
    }

}

function emailValidation(email) {

    const regEx = /\S+@\S+\.\S+/;
    const charactersMatch = regEx.test(email);
    return charactersMatch;

}

function submitForm(event) {

    event.preventDefault();
    form.reset();

}

form.addEventListener("submit", submitForm);