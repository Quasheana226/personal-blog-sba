

let posts = [];

let editingId = null;




///Elements from html

const form = document.querySelector('#post-form');
const titleInput = document.querySelector('#title');
const contentInput = document.querySelector('#content');
const titleError = document.querySelector('#title-error');
const contentInput = document.querySelector('#content-error');
const submitBtn = document.querySelector('#submit-btn');
const cancelBtn = document.querySelector('#cancel-btn');
const postsContainer = document.querySelector('#posts-container');

// Gets the date of the day 

function getTimestamp() {
    return new Date().toLocaleDateString('en-Us', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'

    });
}

// Saving to local storage
function loadFromStorage() {
    const saved = localStorage.getItem('posts')

    if (saved) { // something being saved before 
        posts = JSON.parse(saved);
    }
}



// Reseting the form
function resetForm() {
    titleInput = ''; //  Title should be clean
    contentInput = ''; // content should be clean
    titleError.style.display = 'none'; //error messages 
    contentError.style.display = 'none';



    editingId = null;

    submitBtn.textContent = 'Add post'
    cancelBtn.style.display = 'none'


}

//validating form

function validateForm() {

}