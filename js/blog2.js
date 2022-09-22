import { showLoadingIndicator, hideLoadingIndicator } from "./components/loadingindicator.js";

const loadMoreBtn = document.getElementById("load-more");

let pageNr = 0;

async function setup() {
    const posts = await getPosts();
    renderPosts(posts);
    setSearchListener(posts);
}

function getPosts() {
    pageNr++;
    const blogPostsUrl = "https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts?page=" + pageNr + "&_embed";

    try {
        const response = await fetch(blogPostsUrl);

        const totalPages = response.headers.get("x-wp-totalpages");

        if (Number(totalPages) === pageNr) {
            loadMoreBtn.style.display = "none";
        }

        const postData = await response.json();
        return postData;

    } catch(error) {
        console.log(error);
                blogContainer.innerHTML += `<div class="blog-container">
                <p>The blog posts seems to have vanished into thin air! Please try again later.</p>
                </div>`;
                hideLoadingIndicator()

    }

}

function filterPosts(searchValue, postsList) {
    return postsList.filter(function (blogPost) {
        if (blogPost.title.rendered.toLowerCase().includes(searchValue) || blogPost.excerpt.rendered.toLowerCase().includes(searchValue))
            return true;
        }
};

function postTemplate(postData) {
    return `<div class="blog-container">
            <p>${postData.modified}</p>
            <a href="blog-specific.html?id=${postData.id}"><img src="${postImage}" alt="${blogImageAlt}" class="blogposts-image specific-image"></a>
            <h2>${postData.title.rendered}</h2>
            <p>${postData.excerpt.rendered}</p>
            <a href="blog-specific.html?id=${postData.id}" class="post-link">View post</a>
            </div>`;
};

function renderPosts(postList) {
    const blogContainer = document.querySelector(".blog-content");
    postList.forEach(function (post) {
        postContainer.innerHTML += postTemplate(post)
      });
}

function setSearchListener(postList) {
    const search = document.querySelector(".searchbar");
    search.oninput = function(event) {
        renderPosts(filterPosts(search.value, postList))
    }
}



setup().then(console.log);