import { displayNavigation } from "./components/functions.js";

displayNavigation();

setTimeout(() => {
    const modal = document.getElementById("modal-open");
    const showModal = document.getElementById("modal-closed");

showModal.addEventListener("click", () => {
    modal.style.display = "block";
});

}, "1000");




window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal-open");

    if (event.target == modal) {
      modal.style.display = "none";
    }
});

