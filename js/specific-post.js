import { showLoadingIndicator, hideLoadingIndicator } from "./components/loadingindicator.js";

const postContainer = document.querySelector(".post-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const postUrl = `https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts/${id}?_embed`;

async function getPost(postUrl){

  showLoadingIndicator()

  try {
      const response = await fetch(postUrl);
      const post = await response.json();

      hideLoadingIndicator()

      console.log(post);

      const blogImage = post._embedded["wp:featuredmedia"]?.[0]["source_url"] ?? "https://via.placeholder.com/150";

      document.title = `${post.title.rendered} | Nice to Mead you`;
      

      postContainer.innerHTML += `<div class="blog-specific">
                                        <h1>${post.title.rendered}</h1>
                                        <img  src="${blogImage}" id="modal-image" class="blogposts-image specific-image">
                                        <p>${post.content.rendered}</p>
                                    </div>`;

      const modal = document.querySelector(".modal");
      const showModal = document.getElementById("modal-image");
      const getImage = document.getElementById("get-image");
                                                                  
      showModal.addEventListener("click", () => {
            modal.style.display = "block";
            getImage.src = blogImage;
      });
                                                                  
      window.addEventListener("click", function (event) {
            const modal = document.querySelector(".modal");
            if (event.target === modal) {
            modal.style.display = "none";
            }
      });

                                
  } catch(error) {
      console.log(error);
  }
  
}

getPost(postUrl);