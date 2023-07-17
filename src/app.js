import { addDays, format, isToday, isTomorrow, parseISO } from "date-fns";
import { 
    displayProjects, 
    displayNumberOfProjects 
} from "../src/DOM";
import {createProject} from "./components/objects/createProject";
import uniqid from "uniqid";

let projects = [];
if (localStorage.getItem("todos") !== null) {
    const objectsList = JSON.parse(localStorage.getItem("todos"));
    
    projects = objectsList.map((project) => {

        // convert date string to date
        project._dueDate = parseISO(project._dueDate)
        project._dateUpdated = parseISO(project._dateUpdated)
        project._dateCreated = parseISO(project._dateCreated)
        
        // add object methods
        Object.setPrototypeOf(
            project, 
            new createProject(
                "protrotype",
                "this object is created in order to pass the methods to other objects after deserialization.",
                "2000-01-12",
                "high"
            )
        );
        
        return project;
    });
}

/**
 * takes in {category} string to get {array} of projects by specific dates 
 * @param { String } category 
 * @returns { Array }
 */
const getProjectsByCategory = (category) => {
    const result = projects.filter((project) => {
        if (isToday(project.getDueDate()) && category == "today") {
            return project;
        } else if (isTomorrow(project.getDueDate()) && category == "tomorrow") {
            return project;
        } else if (project.getDueDate() > addDays(new Date(), 1) 
                && project.getDueDate() <= addDays(new Date(), 7) 
                && category == "week") {
            return project;
        }
    });
    return result;
}

/**
 * displays projects by specific category on html.
 */
const displayByCategory = () => {
    const categoryList = ["today", "tomorrow", "week"];
    categoryList
    .forEach((category) => { 
            displayProjects(getProjectsByCategory(category), category); 
        }
    );
};

/**
 * save current projects on local storage.
 */
const saveOnLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(projects));
}

const renderDisplay = () => {
    displayByCategory();
    displayNumberOfProjects(projects);
}

/**
 * create new project.
 * @param { String } name 
 * @param { String } discription 
 * @param { String } dueDate 
 * @param { String } priority 
 * @returns { createProject }
 */
const createNewProject = (name, discription, dueDate, priority) => {
    return new createProject(name, discription, dueDate, priority);
}

/**
 * add new project to array list and then save on local storage and then refresh display.
 * @param { createProject } project 
 */
const saveProjects = (project) => {
    projects.push(project);
    saveOnLocalStorage();
}

/**
 * filter through all the project to get the exact project.
 * @param { uniqid } id 
 * @returns { createProject } project
 */
const getProjectById = (id) => {
    return (projects.filter((project) => {
        if (project.getId() == id) {
            return project;
        }
    })[0]);
}

/**
 * get the project from all projects and edit priority.
 * render new data on webpage.
 * @param { String } newPriority 
 * @param { uniqid } id 
 */
const changePriority = (newPriority, id) => {
    const project = getProjectById(id);
    const index = projects.indexOf(project);
    project.setPriority(newPriority);
    project.setDateUpdated(new Date());
    projects[index] = project;
    
}

/**
 * remove the project from the list
 * @param { uniqid } id 
 */
const deleteProject = (id) => {
    projects = projects.filter((project) => {
        if (id != project.getId()) {
            return project;
        }
    });
}

/**
 * change project new date to a new later date.
 * @param { String } date 
 * @param { uniqid } id 
 */
const changeDueDate = (date, id) => {
    const project = getProjectById(id);
    const index = projects.indexOf(project);
    project.setDueDate(date);
    projects[index] = project;
}

/**
 * 
 * @param { String } date 
 * @param { String } priority 
 * @param { uniqid } id 
 */
const handleChange = (date, priority, id) => {
    changeDueDate(date, id);
    changePriority(priority, id)
    renderDisplay();
}

renderDisplay();

export {
    createNewProject,
    saveProjects,
    handleChange,
    deleteProject,
    renderDisplay
}