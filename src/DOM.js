import { changePriority, deleteProject, changeDueDate } from "./app";
import { format } from "date-fns";
import uniqid from "uniqid";
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
        // display add task form
        formContainer.style.display = "flex";
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
 * @param { String } type 
 * @param { String } id 
 * @param { String } textContent 
 * @returns { HTMLElement }
 */
const createNewElement = (type, id, textContent) => {
    const container = document.createElement(type);
    container.setAttribute("id", id);
    container.textContent = textContent;

    return container;
};

/**
 * create unique checkbox for each project.
 * @param { uniqid } id 
 * @returns { HTMLElement }
 */
const createCheckboxElement = (id) => {
    const container = document.createElement("INPUT");
    container.setAttribute("type", "checkbox");
    container.setAttribute("id", `checkbox-${id}`);
    return container;
};

/**
 * close edit display.
 */
document.querySelector("#EditPriorityForm :first-child :last-child")
.addEventListener("click", () => {
    document.querySelector("#EditPriority-modal").style.display = "none";
});

/**
 * select/get new priority button.
 */
const submitPriorityButton = document.querySelector("#submitNewPriority");
/**
 * add event listner on submit new priority button.
 * submit new priority and hide form display.
 */
submitPriorityButton
.addEventListener("click", () => {
    changePriority(document.querySelector("#new-priority").value, id);
    changeDueDate(document.querySelector("#new-dueDate").value, id);
    document.querySelector("#new-priority").value = "";
    document.querySelector("#new-dueDate").value = "";
    editForm.style.display = "none";
});

/**
 * checks if project is complete or not and display result.
 * @param { Boolean } complete 
 * @returns { String }
 */
const projectCompleted = (complete) => { if (complete == true) {return "complete";} else {return "incomplete";}}

/**
 * render individual project on its own.
 * @param { createProject } project 
 */
const displaySingleProject = (project) => {
    document
    .querySelector("#individual-project :nth-child(1)")
    .addEventListener("click", () => {
        document.querySelector("#individual-project-model").style.display = "none";
    });

    // display project name.
    document
    .querySelector("#individual-project :nth-child(2) :nth-child(2)")
    .textContent = project.getName();

    // display project discription.
    document
    .querySelector("#individual-project :nth-child(3) :nth-child(2)")
    .textContent = project.getDiscription();

    // display project due date.
    document
    .querySelector("#individual-project :nth-child(4) :nth-child(2)")
    .textContent = format(project.getDueDate(), "PPP");

    // display project priority.
    document
    .querySelector("#individual-project :nth-child(5) :nth-child(2)")
    .textContent = project.getPriority();

    // display if project is complete.
    document
    .querySelector("#individual-project :nth-child(6) :nth-child(2)")
    .textContent = projectCompleted(project.getCompleted());

    // event listeners for each task

    // add event to delete button.
    document
    .querySelector("#individual-project :nth-child(7) :nth-child(2)")
    .addEventListener("click", () => {
        // remove project from list.
        deleteProject(project.getId());

        // remove project from display,
        document
        .querySelector(`.${project.getId()}`)
        .remove();
        
        // close display.
        document
        .querySelector("#individual-project-model")
        .style
        .display = "none";
    });
    
    // edit project
    document
    .querySelector("#individual-project :nth-child(7) :nth-child(1)")
    .addEventListener("click", () => {
        // display edit form.
        editForm.style.display = "flex";
        id = project.getId();
    });
};

/**
 * add css style for each project container.
 * @param {HTMLDivElement} projectContainer 
 */
const styleProjectContainer = (projectContainer) => {
    projectContainer.style.borderTop = "solid #ECECEC 0.3px";
    projectContainer.style.padding = "0px 0px 3px 3px";
    projectContainer.style.display = "flex";
    projectContainer.style.flexDirection = "row";
    projectContainer.style.justifyContent = "space-between";
    projectContainer.style.alignContent = "center";
    projectContainer.style.justifyItems = "center";
};

/**
 * add css style for each name project container.
 * @param { HTMLDivElement } nameDisplay 
 */
const styleNameDisplay = (nameDisplay) => {
    nameDisplay.style.display = "flex";
    nameDisplay.style.flexDirection = "row";
    nameDisplay.style.justifyContent = "flex-start";
    nameDisplay.style.alignContent = "center";
    nameDisplay.style.padding = "2px 3px";
    nameDisplay.style.gap = "8px";
    nameDisplay.style.paddingTop = "10px"
};

/**
 * css style for arrow img/icon.
 * @param { HTMLImageElement } img 
 */
const styleOpenFullProjectDetails = (img) => {
    img.style.height = "20px";
    img.style.width = "20px";
    img.style.paddingTop = "6px";
    img.style.paddingRight = "10px";
    img.style.filter = "invert(77%) sepia(9%) saturate(11%) hue-rotate(335deg) brightness(90%) contrast(81%)";
}

/**
 * create project container and display based on category. ie today, tomorrow...
 * @param { Array } projects 
 * @param { String } category 
 */
const displayProjects = (projects, category) => {
    const projectsContainer = document.querySelector(`#${category}-projects`);

    projects.forEach((project) => {
        if (document.querySelector(`.${project.getId()}`) == null) {
            const projectContainer = document.createElement("div");
            projectContainer.setAttribute("class", `${project.getId()}`)
            styleProjectContainer(projectContainer);

            const nameDisplay = document.createElement("div");
            styleNameDisplay(nameDisplay);
            const checkbox = createCheckboxElement(project.getId());
            checkbox.addEventListener("change", () => {
                project.getCompleted() ? project.setCompleted(false) : project.setCompleted(true);
            })
            nameDisplay.appendChild(checkbox);
            nameDisplay
            .appendChild(
                createNewElement("div", "project-name", project.getName())
            );
            projectContainer
            .appendChild(nameDisplay);

            // add arrow icon
            const img = createNewElement("img",`open-${project.getId()}`,"");
            img.setAttribute("src", "../src/components/icons/chevron-right.svg");
            styleOpenFullProjectDetails(img)

            projectContainer.appendChild(img);
            projectsContainer.appendChild(projectContainer); 

            // open and display complete project data on click.
            document
            .querySelector(`#open-${project.getId()}`)
            .addEventListener("click", () => {
                displaySingleProject(project);
                document
                .querySelector("#individual-project-model")
                .style
                .display = "flex";
            });
        };
    });
};

/**
 * render new data after change of priority.
 * @param { createProject } project 
 */
const changeUpdatedProjectDisplay = (project) => {
    // document
    // .querySelector(`.${project.getId()} :nth-child(3)`)
    // .textContent = project.getDueDate();
    // document
    // .querySelector(`.${project.getId()} :nth-child(4)`)
    // .textContent = format(project.getDueDate(), "yyyy-MM-dd");
    console.log("in")
}

/**
 * display the number of current projects.
 * @param { Array } projects 
 */
const displayNumberOfProjects = (projects) => {
    document
    .querySelector("#content-header :last-child")
    .textContent = projects.length;
}

const renderIcons = () => {
    /* Add tasks*/
    const addTaskButtons = document.querySelectorAll("#addTask > img");
    addTaskButtons.forEach((button) => {
        button.src = "../src/components/icons/plus.svg";
        button.style.height = "20px";
    });

    /* ADD SIDEBAR ICONS */
    // menu
    document
    .querySelector("#menuIcon")
    .src = "../src/components/icons/menu.svg";
    document
    .querySelector("#searchIcon")
    .src = "../src/components/icons/magnify.svg";

    // tasks
    document
    .querySelector("#upcomingIcon")
    .src = "../src/components/icons/chevron-double-right.svg";
    document
    .querySelector("#todayIcon")
    .src = "../src/components/icons/format-list-bulleted.svg";
    document
    .querySelector("#calendarIcon")
    .src = "../src/components/icons/calendar-month-outline.svg";
    document
    .querySelector("#stickywallIcon")
    .src = "../src/components/icons/note.svg";

    // 
    document
    .querySelector("#settingsIcon")
    .src = "../src/components/icons/tune.svg";
    document
    .querySelector("#signoutIcon")
    .src = "../src/components/icons/arrow-right-thin-circle-outline.svg";
};

(function () {
  renderIcons();  
})();


export {
    displayProjects, 
    formContainer, 
    displayNumberOfProjects
};
