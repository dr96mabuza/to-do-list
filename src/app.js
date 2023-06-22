import { addDays, format, isToday, isTomorrow } from "date-fns";
import { displayProjects, changeUpdatedProjectDisplay } from "../src/DOM";
import {createProject} from "./components/objects/createProject";

format(new Date(2023, 6, 8), "yyyy-MM-dd")

localStorage.clear();
const pp = new createProject("test", "test new", `2023-06-22`, "high");
let projects = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [pp];

const getProjectsByCategory = (category) => {
    const result = projects.filter((project) => {
        if (isToday(project.getDueDate()) && category == "today") {
            return project;
        } else if (isTomorrow(project.getDueDate()) && category == "tomorrow") {
            return project;
        } else if (project.getDueDate() > addDays(new Date(), 1) && project.getDueDate() <= addDays(new Date(), 7) && category == "week") {
            return project;
        }
    });
    return result;
}

const displayByCategory = () => {
    const categoryList = ["today", "tomorrow", "week"];
    categoryList.forEach((category) => { displayProjects(getProjectsByCategory(category), category); });
};

(function (){
    displayByCategory();
})();


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