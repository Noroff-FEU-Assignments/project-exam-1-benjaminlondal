import { showLoadingIndicator, hideLoadingIndicator } from "./components/loadingindicator.js";

let blogContainer = document.querySelector(".blog-content");
const loadMoreBtn = document.getElementById("load-more");
const search = document.querySelector(".searchbar");
let pageNr = 0;



async function getBlogs() {

    pageNr++;
    const blogPostsUrl = "https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts?page=" + pageNr + "&_embed";

    showLoadingIndicator()

    try {
        const response = await fetch(blogPostsUrl);

        const totalPages = response.headers.get("x-wp-totalpages");

        if (Number(totalPages) === pageNr) {
            loadMoreBtn.style.display = "none";
        }

        let blogPosts = await response.json();

        hideLoadingIndicator()

        renderPosts(blogPosts);

    } catch(error) {
        console.log(error);
                blogContainer.innerHTML += `<div class="blog-container">
                <p>The blog posts seems to have vanished into thin air! Please try again later.</p>
                </div>`;
                hideLoadingIndicator()

    }

}

loadMoreBtn.addEventListener('click', getBlogs);

getBlogs();

function renderPosts(blogPosts) {
    blogContainer.innerHTML = "";
    
    blogPosts.forEach(function(blogPost){

        const blogImage = blogPost._embedded["wp:featuredmedia"]?.[0]["source_url"] ?? "https://via.placeholder.com/150";
        const blogImageAlt = blogPost._embedded["wp:featuredmedia"]?.[0].alt_text ?? "Missing alt text";

        blogContainer.innerHTML += `<div class="blog-container">
                                        <p>${blogPost.modified}</p>
                                        <a href="blog-specific.html?id=${blogPost.id}"><img src="${blogImage}" alt="${blogImageAlt}" class="blogposts-image specific-image"></a>
                                        <h2>${blogPost.title.rendered}</h2>
                                        <p>${blogPost.excerpt.rendered}</p>
                                        <a href="blog-specific.html?id=${blogPost.id}" class="post-link">View post</a>
                                    </div>`;
    });

};

search.oninput = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredBlogs = blogPosts.filter(function (blogPost) {
        if (blogPost.title.rendered.toLowerCase().includes(searchValue) || blogPost.excerpt.rendered.toLowerCase().includes(searchValue)) {
            return true;
        }
        
    });

    renderPosts(filteredBlogs);
};








