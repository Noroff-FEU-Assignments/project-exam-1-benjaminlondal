import { showLoadingIndicator, hideLoadingIndicator } from "./components/loadingindicator.js";

const blogPostsUrl = "https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts?_embed&per_page=9";
const postContainer = document.querySelector(".latest-container");
const slider = document.getElementById("slider");
const leftBtn = document.getElementById("slide-left");
const rightBtn = document.getElementById("slide-right");


async function getBlogs(blogPostsUrl){

    showLoadingIndicator()

    try {
        const response = await fetch(blogPostsUrl);
        const blogPosts = await response.json();

        hideLoadingIndicator()

        console.log(blogPosts);

        blogPosts.forEach(function(blogPosts) {

            const blogImage = blogPosts._embedded["wp:featuredmedia"]?.[0]["source_url"] ?? "https://via.placeholder.com/150";
            const blogImageAlt = blogPosts._embedded["wp:featuredmedia"]?.[0].alt_text ?? "Missing alt text";

            postContainer.innerHTML += `<div class="latest-posts">
                                            <p>${blogPosts.formatted_date}</p>
                                            <a href="blog-specific.html?id=${blogPosts.id}" class="card"><img src="${blogImage}" alt="${blogImageAlt}" class="blogposts-image specific-image">
                                            <h3 id="latest-heading">${blogPosts.title.rendered}</h3>
                                            <p>${blogPosts.excerpt.rendered}</p>
                                            <a href="blog-specific.html?id=${blogPosts.id}" class="post-link latest-link">View post</a>
                                            </a>
                                        </div>`;

        });

    } catch(error) {
        console.log(error);
    }
}


leftBtn.addEventListener("click", () => {
    slider.scrollBy(-885, 0);
});

rightBtn.addEventListener("click", () => {
    slider.scrollBy(885, 0);
});

getBlogs(blogPostsUrl);
