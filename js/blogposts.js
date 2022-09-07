const blogPostsUrl = "https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts?_embed";
const blogContainer = document.querySelector(".blog-content");



async function getBlogs(blogPostsUrl){


    try {
        const response = await fetch(blogPostsUrl);
        const blogPosts = await response.json();


        blogPosts.forEach(function(blogPost){

            const blogImage = blogPost._embedded["wp:featuredmedia"]?.[0]["source_url"] ?? "https://via.placeholder.com/150";

            blogContainer.innerHTML += `<div class="blog-container">
                                            <p>${blogPost.date}</p>
                                            <h2>${blogPost.title.rendered}</h2>
                                            <img  src="${blogImage}"class="blogposts-image">
                                            <p>${blogPost.excerpt.rendered}</p>
                                            <a href="blog-specific.html?id=${blogPost.id}" class="post-link">View post</a>
                                        </div>
                                        <a href="`;

        });
    } catch(error) {
        console.log(error);
    }
}
   

getBlogs(blogPostsUrl);


