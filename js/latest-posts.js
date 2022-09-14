import { showLoadingIndicator, hideLoadingIndicator } from "./components/loadingindicator.js";

const blogPostsUrl = "https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts?_embed";
const postContainer = document.querySelector(".latest-container");
const latestPosts = document.querySelector(".latest-posts");
const slider = document.getElementById("slider");
const leftBtn = document.getElementById("slide-left");
const rightBtn = document.getElementById("slide-right");


async function getBlogs(blogPostsUrl){

    showLoadingIndicator()

    try {
        const response = await fetch(blogPostsUrl);
        const blogPosts = await response.json();

        hideLoadingIndicator()

        blogPosts.forEach(function(blogPosts) {

            const blogImage = blogPosts._embedded["wp:featuredmedia"]?.[0]["source_url"] ?? "https://via.placeholder.com/150";

            postContainer.innerHTML += `<div class="latest-posts">
                                            <a href="blog-specific.html?id=${blogPosts.id}" class="card"><img src="${blogImage}" class="blogposts-image specific-image">
                                            <h3 id="latest-heading">${blogPosts.title.rendered}</h3>
                                            <p>${blogPosts.excerpt.rendered}</p>
                                            <a href="blog-specific.html?id=${blogPosts.id}" class="post-link latest-link">Read more</a>
                                            </a>
                                        </div>`;

        });

    } catch(error) {
        console.log(error);
    }
}


leftBtn.addEventListener("click", () => {
    slider.scrollBy(-870, 0);
});

rightBtn.addEventListener("click", () => {
    slider.scrollBy(870, 0);
});

window.addEventListener("resize", function() {
   let width = slider.offsetWidth;
});

getBlogs(blogPostsUrl);

