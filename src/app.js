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
            this.dateUpdated = new Date()
            // this.tasks = tasks;
        }
    }

    let arrayForProjects = [];

    const createNewProject = (name, discription, dueDate, priority) => {
        return new createProject(name, discription, dueDate, priority);
    }

    const saveProjects = (project) => {
        arrayForProjects.push(project);
    }

    const getProjectById = (id) => {
        return arrayForProjects.filter((project) => {
            if (project.id == id) {
                return project;
            }
        });
    }

    const changePriority = (newPriority, id) => {
        const project = getProjectById(id);
        const index = arrayForProjects.indexOf(project);
        project.priority = newPriority;
        project.dateUpdated = new Date()
        arrayForProjects[index] = project;
    }

    const getName = () => {
        return this.name;
    }

    const getId = () => {
        return this.id;
    }

    


}

export {runToDoList};