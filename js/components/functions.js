export function displayNavigation() {
  const hamburgerMenu = document.querySelector(".hamburger");
  const nav = document.querySelector("nav");

  function displayHamburgerMenu() {
    if (nav.style.display === "none") {
      nav.style.display = "block";
    } else {
      nav.style.display = "none";
    }
  }

  hamburgerMenu.onclick = displayHamburgerMenu;
}
