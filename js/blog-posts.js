import { showLoadingIndicator, hideLoadingIndicator } from "./components/loadingindicator.js";

const blogContainer = document.querySelector(".blog-content");
const loadMoreBtn = document.getElementById("load-more");
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

        const blogPosts = await response.json();

        hideLoadingIndicator()


        blogPosts.forEach(function(blogPost){


            const blogImage = blogPost._embedded["wp:featuredmedia"]?.[0]["source_url"] ?? "https://via.placeholder.com/150";

            blogContainer.innerHTML += `<div class="blog-container">
                                            <p>${blogPost.modified}</p>
                                            <a href="blog-specific.html?id=${blogPost.id}"><img src="${blogImage}" class="blogposts-image specific-image"></a>
                                            <h2>${blogPost.title.rendered}</h2>
                                            <p>${blogPost.excerpt.rendered}</p>
                                            <a href="blog-specific.html?id=${blogPost.id}" class="post-link">View post</a>
                                        </div>`;

        });

    } catch(error) {
        console.log(error);
    }

}


loadMoreBtn.addEventListener('click', getBlogs);

getBlogs();








