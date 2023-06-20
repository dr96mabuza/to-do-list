import { addDays, format, isToday, isTomorrow, parse } from "date-fns";
import uniqid from "uniqid";
import { displayProjects } from "../src/DOM";

format(new Date(2023, 6, 8), "yyyy-MM-dd")

class createProject {
    constructor (name, discription, dueDate, priority) {
        this._name = name;
        this._discription = discription;
        this._dueDate = parse(dueDate, "yyyy-MM-dd", new Date());
        this._priority = priority;
        this._id = uniqid();
        this._dateCreated = new Date();
        this._dateUpdated = new Date();
        // this.tasks = tasks;
    }

    getName() {return this._name;};
    getDiscription() {return this._discription;};
    getDueDate() { return this._dueDate; };
    setDueDate(newDueDate) {
        this._dueDate = parse(newDueDate, "yyyy-MM-dd", new Date());
    };
    getPriority() { return this._priority; };
    setPriority(priority) {this._priority = priority;};
    getId() {return this._id; };
    setDateUpdated(dateUpdated) {this._dateUpdated = dateUpdated; };
}

localStorage.clear();
const pp = new createProject("test", "test new", `2023-06-20`, "high");
let projects = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [pp];

const getProjectsByCategory = (category) => {
    const result = projects.filter((project) => {
        if (isToday(project.getDueDate()) && category == "today") {
            return project;
        } else if (isTomorrow(project.getDueDate()) && category == "tomorrow") {
            return project;
        } else if (project.getDueDate() > addDays(new Date(), 2) && project.getDueDate() <= addDays(new Date(), 7) && category == "week") {
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
    return projects.filter((project) => {
        if (project.getId() == id) {
            return project;
        }
    });
}

const changePriority = (newPriority, id) => {
    const project = getProjectById(id);
    const index = projects.indexOf(project);
    project.setPriority(newPriority);
    project.setDateUpdated(new Date());
    projects[index] = project;
    saveOnLocalStorage();
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


