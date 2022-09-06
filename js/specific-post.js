const postContainer = document.querySelector(".post-container");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const postUrl = "https://blog-api-posts.dvergnir.one/wp-json/wp/v2/posts/" + id;

async function getPost(postUrl){

  try {
      const response = await fetch(postUrl);
      const post = await response.json();

      console.log(post);


        document.title = `${post.title.rendered} | Nice to Mead you`;

        postContainer.innerHTML += `<div class="blog-specific">
                                        <h1>${post.title.rendered}</h1>
                                        ${post.content.rendered}
                                    </div>`;

  } catch(error) {
      console.log(error);
  }
}

getPost(postUrl);