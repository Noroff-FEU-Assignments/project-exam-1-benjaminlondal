import { showLoadingIndicator, hideLoadingIndicator } from "./components/loadingindicator.js";

const loadMoreBtn = document.getElementById("load-more");
let pageNr = 0;

async function setup() {
	const posts = await getPosts();
	hideLoadingIndicator();
	renderPosts(posts);
	setSearchListener(posts);
}

async function getPosts() {
	showLoadingIndicator();
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
	} catch (error) {
		console.log(error);
		blogContainer.innerHTML += `<div class="blog-container">
                <p>The blog posts seems to have vanished into thin air! Please try again later.</p>
                </div>`;
	}
}

function postTemplate(postData) {
	const blogImage = postData._embedded["wp:featuredmedia"]?.[0]["source_url"] ?? "https://via.placeholder.com/150";
	const blogImageAlt = postData._embedded["wp:featuredmedia"]?.[0].alt_text ?? "Missing alt text";

	return `<div class="blog-container">
            <p>${postData.modified}</p>
            <a href="blog-specific.html?id=${postData.id}"><img src="${blogImage}" alt="${blogImageAlt}" class="blogposts-image specific-image"></a>
            <h2>${postData.title.rendered}</h2>
            <p>${postData.excerpt.rendered}</p>
            <a href="blog-specific.html?id=${postData.id}" class="post-link">View post</a>
            </div>`;
}

function renderPosts(postList) {
	const blogContainer = document.querySelector(".blog-content");

	blogContainer.innerHTML = "";

	postList.forEach(function (post) {
		blogContainer.innerHTML += postTemplate(post);
	});
}

function setSearchListener(postList) {
	const search = document.querySelector(".searchbar");

	search.oninput = function (event) {
		const searchValue = event.target.value.trim().toLowerCase();
		const filteredPosts = filterPosts(searchValue, postList);
		renderPosts(filteredPosts);
	};
}

function filterPosts(searchValue, postsList) {
	const filteredPosts = postsList.filter(function (postData) {
		if (postData.title.rendered.toLowerCase().includes(searchValue) || postData.excerpt.rendered.toLowerCase().includes(searchValue)) {
			return true;
		}
	});

	return filteredPosts;
}

setup().then(console.log);

loadMoreBtn.addEventListener("click", setup);
