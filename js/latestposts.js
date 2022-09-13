const blogPostsUrl = "https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts?_embed";
const postContainer = document.querySelector(".latest-container");



async function getBlogs(blogPostsUrl){

    showLoadingIndicator()

    try {
        const response = await fetch(blogPostsUrl);
        const blogPosts = await response.json();

        hideLoadingIndicator()

        for(var i = 0; i < blogPosts.length; i++) {

            if (i === 3) {
                break;
            }

            const blogImage = blogPosts[i]._embedded["wp:featuredmedia"]?.[0]["source_url"] ?? "https://via.placeholder.com/150";

            postContainer.innerHTML += `<div class="blog-container latest-posts">
                                            <a href="blog-specific.html?id=${blogPosts[i].id}"><img src="${blogImage}" class="blogposts-image specific-image"></a>
                                            <h3>${blogPosts[i].title.rendered}</h3>
                                            <p>${blogPosts[i].excerpt.rendered}</p>
                                            <a href="blog-specific.html?id=${blogPosts[i].id}" class="post-link latest-link">Read more</a>
                                        </div>`;

        }

    } catch(error) {
        console.log(error);
    }
}
   

getBlogs(blogPostsUrl);