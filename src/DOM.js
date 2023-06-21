import { changePriority, deleteProject, changeDueDate } from "./app";

let id = null;
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
editForm.addEventListener('submit', function (event) {
    event.preventDefault();
});

const createNewElement = (type, id, textContent) => {
    const container = document.createElement(type);
    container.setAttribute("id", id);
    container.textContent = textContent;

    return container;
};

const submitPriorityButton = document.querySelector("#submitNewPriority");
submitPriorityButton.addEventListener("click", () => {
    console.log(document.querySelector("#new-priority").value)
    changePriority(document.querySelector("#new-priority").value, id);
});

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
                document.querySelector(`.${project.getId()}`).remove();
            });
            
            const editButton = document.querySelector(`#edit-${project.getName()}`);
            editButton.addEventListener("click", () => {
                editForm.style.display = "block";
                id = project.getId();
            });
        };

    });
};

    // const deleteButton = document.querySelector(`#delete-${project.name}`);
    // deleteButton.addEventListener("click", () => {
    //     // call delete method
    // });

export {displayProjects, formContainer};
