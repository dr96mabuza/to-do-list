import { changePriority, deleteProject, changeDueDate } from "./app";
import { format } from "date-fns";
import { createProject } from "./components/objects/createProject";

let id = null;

/**
 * get new task form.
 */
const formContainer = document.querySelector('#AddNewTask-modal');

/**
 * prevent event default behavior when submitting form.
 */
const form = document.querySelector('#AddTaskForm');
form.addEventListener('submit', function (event) {
    event.preventDefault();
});

/**
 * display add new task form on add button click.
 */
const addTaskButtons = document.querySelectorAll("#addTask");
addTaskButtons.forEach((button)=>{
    button.addEventListener("click", () => {
        formContainer.style.display = "block";
    });
});

/**
 * prevent event default behavior when submitting form.
 */
const editForm = document.querySelector("#EditPriority-modal");
editForm.addEventListener('submit', function (event) {
    event.preventDefault();
});

/**
 * create new html element. adding id and text attribute.
 * to render project data.
 * @param {string} type 
 * @param {string} id 
 * @param {string} textContent 
 * @returns html element
 */
const createNewElement = (type, id, textContent) => {
    const container = document.createElement(type);
    container.setAttribute("id", id);
    container.textContent = textContent;

    return container;
};

/**
 * create unique checkbox for each project.
 * @param {uniqid} id 
 * @returns html element
 */
const createCheckboxElement = (id) => {
    const container = document.createElement("INPUT");
    container.setAttribute("type", "checkbox");
    container.setAttribute("id", `checkbox-${id}`);
    return container;
};

/**
 * select/get new priority button.
 */
const submitPriorityButton = document.querySelector("#submitNewPriority");
/**
 * add event listner on submit new priority button.
 * submit new priority and hide form display.
 */
submitPriorityButton.addEventListener("click", () => {
    changePriority(document.querySelector("#new-priority").value, id);
    document.querySelector("#new-priority").value = "";
    editForm.style.display = "none";
});

/**
 * render individual project on its own.
 * @param {createProject} project 
 */
const displaySingleProject = (project) => {
    const name = document.querySelector("#individual-project :nth-child(2) :nth-child(2)");
    name.textContent = project.getName();

    const discription = document.querySelector("#individual-project :nth-child(3) :nth-child(2)");
    discription.textContent = project.getDiscription();

    const dueDate = document.querySelector("#individual-project :nth-child(4) :nth-child(2)");
    dueDate.textContent = project.getDueDate();

    const priority = document.querySelector("#individual-project :nth-child(4) :nth-child(2)");
    priority.textContent = project.getPriority();

    // event listeners for each task

    const deleteButton = document.querySelector(
        "#individual-project :nth-child(6) :nth-child(1)"
        );
    deleteButton.addEventListener("click", () => {
        deleteProject(project.getId());
        // document.querySelector(`.${project.getId()}`).remove();
    });
    
    const editButton = document.querySelector(
        "#individual-project :nth-child(6) :nth-child(2)"
        );
    editButton.addEventListener("click", () => {
        editForm.style.display = "block";
        id = project.getId();
    });
};

/**
 * create project container and display based on category. ie today, tomorrow...
 * @param {Array} projects 
 * @param {string} category 
 */
const displayProjects = (projects, category) => {
    const projectsContainer = document.querySelector(`#${category}-projects`);

    projects.forEach((project) => {
        if (document.querySelector(`.${project.getId()}`) == null) {
            const projectContainer = document.createElement("div");
            projectContainer.setAttribute("class", `${project.getId()}`)
            projectContainer.style.borderTop = "solid antiquewhite 0.3px";
            projectContainer.style.padding = "2px 3px";


            projectContainer
            .appendChild(
                createCheckboxElement(project.getId())
            );
            projectContainer
            .appendChild(
                createNewElement(
                    "div", 
                    "project-name", 
                    project.getName()
                )
            );
    
            projectsContainer.appendChild(projectContainer); 
        };

    });
};

/**
 * render new data after change of priority.
 * @param {createProject} project 
 */
const changeUpdatedProjectDisplay = (project) => {
    document
    .querySelector(
        `.${project.getId()} :nth-child(3)`
        ).textContent = project.getDueDate();
    document
    .querySelector(
        `.${project.getId()} :nth-child(4)`
        ).textContent = format(project.getDueDate(), "yyyy-MM-dd");
}

/**
 * display the number of current projects.
 * @param {Array} projects 
 */
const displayNumberOfProjects = (projects) => {
    document
    .querySelector("#content-header :last-child")
    .textContent = projects.length;
}


/* ADD SIDEBAR ICONS */
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


export {
    displayProjects, 
    formContainer, 
    changeUpdatedProjectDisplay, 
    displayNumberOfProjects
};
