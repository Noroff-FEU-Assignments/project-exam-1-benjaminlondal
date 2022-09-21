export function displayErrorMessage() {
    blogContainer.innerHTML += `<div class="blog-container">
                <p>The blog posts seems to have vanished into thin air! Please try again later.</p>
                </div>`;
                hideLoadingIndicator()
                loadMoreBtn.style.display = "none";
};
