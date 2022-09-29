export function displayErrorMessage() {
  const errorMessage = document.querySelector(".error-message");
  errorMessage.innerHTML += `<div class="err-msg-container">
                <p>We can't seem to find the posts. Please try again later.</p>
                </div>`;
}
