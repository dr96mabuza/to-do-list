const formContainer = document.querySelector('#formContainer');

const form = document.querySelector('#form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

const addProjectButton = document.querySelector('.addProjects');
addProjectButton.addEventListener('click', () => {
    formContainer.style.display = 'block';
});

const displayProjects = (projects) => {
    projects.map((project) => {
        // loop through list and display each project.
    });
}