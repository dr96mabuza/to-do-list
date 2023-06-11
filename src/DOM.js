const formContainer = document.querySelector('#formContainer');

const form = document.querySelector('#form');
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

const addProjectButton = document.querySelector('.addProjects');
addProjectButton.addEventListener('click', () => {
    formContainer.style.display = 'block';
});

const editForm = document.querySelector("#editForm");
editForm.addEventListener("submit", () => { event.preventDefault(); });

const submitEditForm = document.querySelector("#editForm");
submitEditForm.addEventListener("click", () => {
    // ?????
    // needs to call edit method
});

const displayProjects = (projects) => {
    const projectsContainer = document.querySelector("body");
    projects.forEach((project) => {
        // console.log("hi");
        const projectContainer = document.createElement("div");
        projectsContainer.appendChild(projectContainer); 
        
        const nameContainer = document.createElement("div");
        nameContainer.setAttribute("id", "project-name");
        nameContainer.textContent = project.name;
        projectContainer.appendChild(nameContainer);

        const discriptionContainer = document.createElement("div");
        discriptionContainer.setAttribute("id", "project-discription");
        discriptionContainer.textContent = project.discription;
        projectContainer.appendChild(discriptionContainer);

        const dueDateContainer = document.createElement("div");
        dueDateContainer.setAttribute("id", "project-dueDate");
        dueDateContainer.textContent = project.dueDate;
        projectContainer.appendChild(dueDateContainer);

        const priorityContainer = document.createElement("div");
        priorityContainer.setAttribute("id", "project-priority");
        priorityContainer.textContent = project.priority;
        projectContainer.appendChild(priorityContainer);

        const createEditButton = document.createElement("button");
        editButton.setAttribute("id", `#edit-${project.name}`);
        projectContainer.appendChild(createEditButton);

        const editButton = document.querySelector( `#edit-${project.name}`);
        editButton.addEventListener("click", () => {
            // insert edit form
        });

        const createDeleteButton = document.createElement("button");
        createDeleteButton.setAttribute("id", `delete-${project.name}`);
        projectContainer.appendChild(createDeleteButton);

        const deleteButton = document.querySelector(`#delete-${project.name}`);
        deleteButton.addEventListener("click", () => {
            // call delete method
        });
    });
};




export {displayProjects};
