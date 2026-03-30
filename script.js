let posts = [];

let editingId = null;

///Elements from html

const form = document.querySelector("#post-form");
const titleInput = document.querySelector("#title");
const content = document.querySelector("#content");
const titleError = document.querySelector("#title-error");
const contentinoput = document.querySelector("#content-error");
const submitBtn = document.querySelector("#submit-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const postsContainer = document.querySelector("#posts-container");

// Gets the date of the day

function getTimestamp() {
    return new Date().toLocaleDateString("en-Us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function saveToStorage() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Saving to local storage
function loadFromStorage() {
    const saved = localStorage.getItem("posts");

    if (saved) {
        // something being saved before
        posts = JSON.parse(saved);
    }
}

// Reseting the form
function resetForm() {
    titleInput = ""; //  Title should be clean
    contentInput = ""; // content should be clean
    titleError.style.display = "none"; //error messages
    contentError.style.display = "none";

    editingId = null;

    submitBtn.textContent = "Add post";
    cancelBtn.style.display = "none";
}

//validating form

function validateForm() {
    let isValid = true; // makes sure everything is fine until otherwise

    if (titleInput.value.trim() === "") {
        titleError.style.display = "block";
        isValid = false;
    } else {
        titleError.style.display = "none";
    }
    if (contentInput.value.trim() === "") {
        contentError.style.display = "block";
        isValid = false;
    } else {
        contentError.style.display = "none";
    }
    return isValid;
    // true green light your let in
    // false stop cannot submit
}

function renderPosts() {
    postsContainer.innerHTML = ""; // clear whatever is showing up
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p class="empty-msg"> Write your first post';
        return;
    }

    posts.forEach(function (post) {
        const card = document.createElement("div"); //new element in memeory
        card.classList.add("post-card");




    });


    card.innerHTML = `
    <div class="post-header">
      <h3 class="post-title">${post.title}</h3>
      <span class="post-date">${post.timestamp}</span>
    </div>

   <p class="post-content">${post.content}</p>
   <div class="post-actions">
      <button class="edit-btn" data-id="${post.id}">Edit</button>
      <button class="delete-btn" data-id="${post.id}">Delete</button>
    </div>
    `;
    postsContainer.appendChild(card);


}
function handleSubmit(event) {
    event.preventDefault();

    if (validateForm()) return; // stop if fields are empty

    if (editingId) {
        // editing an existing post find it and update
        const index = posts.findIndex(post => post.id === editingId);
        posts[index].title = titleInput.value.trim();
        posts[index].content = contentInput.value.trim();
    } else {
        // brand new post build the object and add it
        const newPost = {
            id: generateId(),
            title: titleInput.value.trim(),
            content: contentInput.value.trim(),
            timestamp: getTimestamp(),
        };
        posts.unshift(newPost); // unshift adds to the front so newest shows first
    }
    saveToStorage();
    renderPosts();
    resetForm();




}

function handleDelete(id) {
    posts = posts.filter(post => post.id !== id);
    saveToStorage();
    renderPosts();
}

function handleEdit(id) {
    const post = posts.find(post => post.id === id);
    titleInput.value = post.title;
    contentInput.value = post.content;
    editingId = id;
    submitBtn.textContent = "Update Post";
    cancelBtn.style.display = "inline-block";
    form.scrollIntoView({ behavior: "smooth" });
}

form.addEventListener("submit", handleSubmit);
cancelBtn.addEventListener("click", resetForm);

postsContainer.addEventListener("click", function (event) {
    const clicked = event.target;
    if (clicked.classList.contains("delete-btn")) {
        handleDelete(clicked.getAttribute("data-id"));
    }
    if (clicked.classList.contains("edit-btn")) {
        handleEdit(clicked.getAttribute("data-id"));
    }
});
//
loadFromStorage();
renderPosts();