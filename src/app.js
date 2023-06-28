import { addDays, format, isToday, isTomorrow } from "date-fns";
import { displayProjects, changeUpdatedProjectDisplay, displayNumberOfProjects } from "../src/DOM";
import {createProject} from "./components/objects/createProject";

localStorage.clear();
const placeholderProjects = () => {
    let results = []
    results.push(new createProject("test1", "test new", format(new Date(), "yyyy-MM-dd"), "high"));
    results.push(new createProject("test2", "test new", format(new Date(), "yyyy-MM-dd"), "high"));
    results.push(new createProject("test3", "test new", format(new Date(), "yyyy-MM-dd"), "high"));
    results.push(new createProject("test4", "test new", format(new Date(), "yyyy-MM-dd"), "high"));
    results.push(new createProject("test5", "test new", format(new Date(), "yyyy-MM-dd"), "high"));

    results.push(new createProject("test6", "test new", format(addDays(new Date(),1),  "yyyy-MM-dd"), "high"));
    results.push(new createProject("test7", "test new", format(addDays(new Date(),1),  "yyyy-MM-dd"), "high"));
    results.push(new createProject("test8", "test new", format(addDays(new Date(),1),  "yyyy-MM-dd"), "high"));
    results.push(new createProject("test9", "test new", format(addDays(new Date(),1),  "yyyy-MM-dd"), "high"));
    results.push(new createProject("test10", "test new", format(addDays(new Date(),1),  "yyyy-MM-dd"), "high"));

    results.push(new createProject("test11", "test new", format(addDays(new Date(),2),  "yyyy-MM-dd"), "high"));
    results.push(new createProject("test12", "test new", format(addDays(new Date(),2),  "yyyy-MM-dd"), "high"));
    // results.push(new createProject("test13", "test new", format(addDays(new Date(),2),  "yyyy-MM-dd"), "high"));
    // results.push(new createProject("test14", "test new", format(addDays(new Date(),2),  "yyyy-MM-dd"), "high"));
    // results.push(new createProject("test15", "test new", format(addDays(new Date(),2),  "yyyy-MM-dd"), "high"));

    return results;
}
let projects = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : placeholderProjects();

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

const displayByCategory = () => {
    const categoryList = ["today", "tomorrow", "week"];
    categoryList.forEach((category) => { displayProjects(getProjectsByCategory(category), category); });
};

displayNumberOfProjects(projects);
displayByCategory();

const saveOnLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(projects));
}

const createNewProject = (name, discription, dueDate, priority) => {
    return new createProject(name, discription, dueDate, priority);
}

const saveProjects = (project) => {
    projects.push(project);
    saveOnLocalStorage();
    displayByCategory();
    displayNumberOfProjects(projects);
}

const getProjectById = (id) => {
    return (projects.filter((project) => {
        if (project.getId() == id) {
            return project;
        }
    })[0]);
}

const changePriority = (newPriority, id) => {
    const project = getProjectById(id);
    const index = projects.indexOf(project);
    project.setPriority(newPriority);
    project.setDateUpdated(new Date());
    projects[index] = project;
    saveOnLocalStorage();
    changeUpdatedProjectDisplay(project);
}

const deleteProject = (id) => {
    projects = projects.filter((project) => {
        if (id != project.getId()) {
            return project;
        }
    });
    displayNumberOfProjects(projects);
}

const changeDueDate = (date, id) => {
    const index = projects.indexOf(project);
    const project = getProjectById(id);
    project.setDueDate(date);
    projects[index] = project;
    saveOnLocalStorage();
}

export {
    createNewProject,
    saveProjects,
    changePriority,
    deleteProject,
    changeDueDate
}