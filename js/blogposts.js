const blogContainer = document.querySelector(".blog-content");
const loadMoreBtn = document.getElementById("load-more");
let pageNr = 1;

let blogPostsUrl = "https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts?page=" + pageNr + "&_embed";

async function getBlogs(blogPostsUrl) {

    showLoadingIndicator()

    try {
        const response = await fetch(blogPostsUrl);
        const blogPosts = await response.json();

        hideLoadingIndicator()


        blogPosts.forEach(function(blogPost){


            const blogImage = blogPost._embedded["wp:featuredmedia"]?.[0]["source_url"] ?? "https://via.placeholder.com/150";

            blogContainer.innerHTML += `<div class="blog-container">
                                            <p>${blogPost.modified}</p>
                                            <h2>${blogPost.title.rendered}</h2>
                                            <a href="blog-specific.html?id=${blogPost.id}"><img src="${blogImage}" class="blogposts-image specific-image"></a>
                                            <p>${blogPost.excerpt.rendered}</p>
                                            <a href="blog-specific.html?id=${blogPost.id}" class="post-link">View post</a>
                                        </div>`;

        });

    } catch(error) {
        console.log(error);
    }

}

function loadMore() {
    pageNr++;
    blogPostsUrl = "https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts?page=" + pageNr + "&_embed";
    getBlogs(blogPostsUrl);
}

loadMoreBtn.addEventListener('click', loadMore);

getBlogs(blogPostsUrl);








