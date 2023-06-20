import { changePriority, deleteProject, changeDueDate } from "./app";


const formContainer = document.querySelector('#AddNewTask-modal');

const form = document.querySelector('#AddTaskForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

const addTaskButtons = document.querySelectorAll("#addTask");
addTaskButtons.forEach((button)=>{
    button.addEventListener("click", () => {
        formContainer.style.display = "block";
    });
});


const editForm = document.querySelector("#EditPriority-modal");
// editForm.style.display = "none";

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
        if (document.querySelector(`.${project.getId()}`) == null) {
            const projectContainer = document.createElement("div");
            projectContainer.setAttribute("class", `${project.getId()}`)
        
            projectContainer.appendChild(
                createNewElement("div", "project-name", project.getName())
                );
            projectContainer.appendChild(
                createNewElement("div", "project-discription", project.getDiscription())
                );
            projectContainer.appendChild(
                createNewElement("div", "project-dueDate", project.getDueDate())
                );
            projectContainer.appendChild(
                createNewElement("div", "project-priority", project.getPriority())
                );
            projectContainer.appendChild(
                createNewElement("button", `edit-${project.getName()}`, "edit")
                );
            projectContainer.appendChild(
                createNewElement("button", `delete-${project.getName()}`, "delete")
                );
    
            projectsContainer.appendChild(projectContainer); 
    
            // event listeners for each task
    
            const deleteButton = document.querySelector(`#delete-${project.getName()}`);
            deleteButton.addEventListener("click", () => {
                deleteProject(project.getId());
            });
            
            const editButton = document.querySelector(`#edit-${project.getName()}`);
            editButton.addEventListener("click", () => {
                const editForm = document.querySelector("#EditPriority-modal");
                editForm.style.display = "block";
            });
        };

    });
};

    // const deleteButton = document.querySelector(`#delete-${project.name}`);
    // deleteButton.addEventListener("click", () => {
    //     // call delete method
    // });

export {displayProjects, formContainer};
