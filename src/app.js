import { format } from "date-fns";
import uniqid from "uniqid"

format(new Date(2023, 6, 8), "yyyy/MM/dd")

const runToDoList = () => {
    class createProject {
        constructor (name, discription, dueDate, priority) {
        
            this.name = name;
            this.discription = discription;
            this.dueDate = dueDate;
            this.priority = priority;
            this.id = uniqid();
            this.dateCreated = new Date();
            this.dateUpdated = new Date();
            // this.tasks = tasks;
        }
    }


    let projects = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

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
        project.dateUpdated = new Date()
        projects[index] = project;
        saveOnLocalStorage();
    }

    const deleteProject = (id) => {
        projects = projects.filter((project) => {
            if (id != project.id) {
                return project;
            }
        })
    }

    const changeDueDate = (date, id) => {
        const index = projects.indexOf(project);
        const project = getProjectById(id);
        project.dueDate = date;
        projects[index] = project;
        saveOnLocalStorage();
    }
    
    return {
        createNewProject,
        saveProjects,
        changePriority,
        deleteProject,
        changeDueDate
    }
}

export {
    runToDoList
};