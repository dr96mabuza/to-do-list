import { addDays, format, isToday, isTomorrow, parse } from "date-fns";
import uniqid from "uniqid";
import { displayProjects } from "../src/DOM";

format(new Date(2023, 6, 8), "yyyy-MM-dd")

class createProject {
    constructor (name, discription, dueDate, priority) {
        this.name = name;
        this.discription = discription;
        this.dueDate = parse(dueDate, "yyyy-MM-dd", new Date());
        this.priority = priority;
        this.id = uniqid();
        this.dateCreated = new Date();
        this.dateUpdated = new Date();
        // this.tasks = tasks;
    }

    get dueDate() { return this.dueDate; };
    set dueDate(newDueDate) {
        this.dueDate = parse(newDueDate, "yyyy-MM-dd", new Date());
    };
    get priority() { return this.priority; };
    set priority(priority) {this.priority = priority;};
    get id() {return this.id; };
    set dateUpdated(date) {this.dateUpdated = date; };
}

localStorage.clear();
const pp = new createProject("test", "test new", `2023-06-19`, "high");
let projects = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [pp];

const getProjectsByCategory = (category) => {
    const result = projects.filter((project) => {
        if (isToday(project.dueDate) && category == "today") {
            return project;
        } else if (isTomorrow(project.dueDate) && category == "tomorrow") {
            return project;
        } else if (project.dueDate > addDays(project.dueDate, 2) && project.dueDate <= addDays(project.dueDate, 7) && category == "week") {
            return project;
        }
    });
    return result;
}

(function (){
    const categoryList = ["today", "tomorrow", "week"];
    categoryList.forEach((category) => { displayProjects(getProjectsByCategory(category), category); });
})();

const saveOnLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(projects));
}

const createNewProject = (name, discription, dueDate, priority) => {
    return new createProject(name, discription, dueDate, priority);
}

const saveProjects = (project) => {
    projects.push(project);
    saveOnLocalStorage()
}

const getProjectById = (id) => {
    return projects.filter((project) => {
        if (project.id == id) {
            return project;
        }
    });
}

const changePriority = (newPriority, id) => {
    const project = getProjectById(id);
    const index = projects.indexOf(project);
    project.priority = newPriority;
    project.dateUpdated = new Date();
    projects[index] = project;
    saveOnLocalStorage();
}

const deleteProject = (id) => {
    projects = projects.filter((project) => {
        if (id != project.id) {
            return project;
        }
    });
}

const changeDueDate = (date, id) => {
    const index = projects.indexOf(project);
    const project = getProjectById(id);
    project.dueDate = date;
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


