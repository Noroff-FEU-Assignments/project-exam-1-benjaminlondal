export function showLoadingIndicator() {
  document.querySelector(".loader").classList.add("loading");
}

export function hideLoadingIndicator() {
  document.querySelector(".loader").classList.remove("loading");
}
