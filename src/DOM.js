import { changePriority, deleteProject, changeDueDate } from "./app";
import { format } from "date-fns";

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
    changePriority(document.querySelector("#new-priority").value, id);
    document.querySelector("#new-priority").value = "";
    editForm.style.display = "none";
});

const displayProjects = (projects, category) => {
    const projectsContainer = document.querySelector(`#${category}-projects`);

    projects.forEach((project) => {
        if (document.querySelector(`.${project.getId()}`) == null) {
            const projectContainer = document.createElement("div");
            projectContainer.setAttribute("class", `${project.getId()}`)
            projectContainer.style.borderTop = "solid antiquewhite 0.3px";
            projectContainer.style.padding = "2px 3px";

            projectContainer.appendChild(
                createNewElement("div", "project-name", project.getName())
                );
            projectContainer.appendChild(
                createNewElement("div", "project-discription", project.getDiscription())
                );
            projectContainer.appendChild(
                createNewElement("div", "project-dueDate", format(project.getDueDate(), "yyyy-MM-dd"))
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

const changeUpdatedProjectDisplay = (project) => {
    document.querySelector(`.${project.getId()} :nth-child(3)`).textContent = project.getDueDate();
    document.querySelector(`.${project.getId()} :nth-child(4)`).textContent = format(project.getDueDate(), "yyyy-MM-dd");
}
const displayNumberOfProjects = (projects) => {
    document.querySelector("#content-header :last-child").textContent = projects.length;
}

const searchIcon = document.querySelector("#searchIcon");
searchIcon.src = "../src/components/icons/magnify.svg";

// tasks
const upcomingIcon = document.querySelector("#upcomingIcon");
upcomingIcon.src = "../src/components/icons/chevron-double-right.svg";
const todayIcon = document.querySelector("#todayIcon");
todayIcon.src = "../src/components/icons/format-list-bulleted.svg";
const calendarIcon = document.querySelector("#calendarIcon");
calendarIcon.src = "../src/components/icons/calendar-month-outline.svg";
const stickywallIcon = document.querySelector("#stickywallIcon");
stickywallIcon.src = "../src/components/icons/note.svg";

// 
const settingsIcon = document.querySelector("#settingsIcon");
settingsIcon.src = "../src/components/icons/tune.svg";
const signoutIcon = document.querySelector("#signoutIcon");
signoutIcon.src = "../src/components/icons/arrow-right-thin-circle-outline.svg"


export {displayProjects, formContainer, changeUpdatedProjectDisplay, displayNumberOfProjects};
