const loader = document.querySelector(".loader");

function showLoadingIndicator() {
    loader.classList.add("loading");
}
 
function hideLoadingIndicator() {
     loader.classList.remove("loading");
}