const hamburgerMenu = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

function displayNavigation() {
    if (nav.style.display === "none") {
        nav.style.display = "block";
      } else {
        nav.style.display = "none";
      }
    
}

hamburgerMenu.onclick = displayNavigation;