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
    const projectsContainer = document.querySelector("#projects");
    projects.map((project) => {
        const projectContainer = document.createElement("div");
        
        const nameContainer = document.createElement("div");
        nameContainer.setAttribute("id", "project-name");
        nameContainer.textContent(project.name);
        projectContainer.appendChild(nameContainer);

        const discriptionContainer = document.createElement("div");
        discriptionContainer.setAttribute("id", "project-discription");
        discriptionContainer.textContent(project.discription);
        projectContainer.appendChild(discriptionContainer);

        const dueDateContainer = document.createElement("div");
        dueDateContainer.setAttribute("id", "project-dueDate");
        dueDateContainer.textContent(project.dueDate);
        projectContainer.appendChild(dueDateContainer);

        const priorityContainer = document.createElement("div");
        priorityContainer.setAttribute("id", "project-priority");
        priorityContainer.textContent(project.priority);
        projectContainer.appendChild(priorityContainer);

        const editButton = document.createElement("button");
        editButton.setAttribute("id", "edit");
        projectContainer.appendChild(editButton);

        projectsContainer.appendChild(projectContainer); 
    });
};


export {displayProjects};