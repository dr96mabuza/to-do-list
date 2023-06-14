const formContainer = document.querySelector('#AddNewTaskFormContainer');

const form = document.querySelector('#AddTaskForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

// const addProjectButton = document.querySelector('.addProjects');
// addProjectButton.addEventListener('click', () => {
//     formContainer.style.display = 'block';
// });

// const editForm = document.querySelector("#editForm");
// editForm.addEventListener("submit", (event) => { event.preventDefault(); });

// const submitEditForm = document.querySelector("#editForm");
// submitEditForm.addEventListener("click", () => {
//     // ?????
//     // needs to call edit method
// });

const createNewElement = (type, id, textContent) => {
    const container = document.createElement(type);
    container.setAttribute("id", id);
    container.textContent = textContent;

    return container;
};

const displayProjects = (projects, category) => {
    const projectsContainer = document.querySelector(`#${category}`);

    projects.forEach((project) => {
        const projectContainer = document.createElement("div");
        
        projectContainer.appendChild(
            createNewElement("div", "project-name", project.name)
            );
        projectContainer.appendChild(
            createNewElement("div", "project-discription", project.discription)
            );
        projectContainer.appendChild(
            createNewElement("div", "project-dueDate", project.dueDate)
            );
        projectContainer.appendChild(
            createNewElement("div", "project-priority", project.priority)
            );
        projectContainer.appendChild(
            createNewElement("button", `edit-${project.name}`, "edit")
            );
        projectContainer.appendChild(
            createNewElement("button", `delete-${project.name}`, "delete")
            );

        projectsContainer.appendChild(projectContainer); 
    });
};

    // const deleteButton = document.querySelector(`#delete-${project.name}`);
    // deleteButton.addEventListener("click", () => {
    //     // call delete method
    // });

export {displayProjects};
