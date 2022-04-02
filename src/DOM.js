const formContainer = document.querySelector('#formContainer');

const form = document.querySelector('#form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

const addProjectButton = document.querySelector('.addProjects');
addProjectButton.addEventListener('click', () => {
    formContainer.style.display = 'block';
});