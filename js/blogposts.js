const blogContainer = document.querySelector(".blog-content");
const loadMoreBtn = document.getElementById("load-more");
let addedNr = 1;

let blogPostsUrl = "https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts?page=" + addedNr + "&_embed";

console.log(blogPostsUrl);

async function getBlogs(blogPostsUrl) {


    try {
        const response = await fetch(blogPostsUrl);
        const blogPosts = await response.json();


        blogPosts.forEach(function(blogPost){


            const blogImage = blogPost._embedded["wp:featuredmedia"]?.[0]["source_url"] ?? "https://via.placeholder.com/150";

            blogContainer.innerHTML += `<div class="blog-container">
                                            <p>${blogPost.modified}</p>
                                            <h2>${blogPost.title.rendered}</h2>
                                            <img  src="${blogImage}"class="blogposts-image">
                                            <p>${blogPost.excerpt.rendered}</p>
                                            <a href="blog-specific.html?id=${blogPost.id}" class="post-link">View post</a>
                                        </div>`;

        });

    } catch(error) {
        console.log(error);
    }

}

function loadMore() {
    addedNr++;
    blogPostsUrl = "https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts?page=" + addedNr + "&_embed";
    getBlogs(blogPostsUrl);
}

loadMoreBtn.addEventListener('click', loadMore);

getBlogs(blogPostsUrl);








