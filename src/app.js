import { th } from "date-fns/locale";
import uniqid from "uniqid"

const runToDoList = () => {
    class createProject {
        constructor (name, discription, dueDate, priority) {
        
            this.name = name;
            this.discription = discription;
            this.dueDate = dueDate;
            this.priority = priority;
            this.id = uniqid()
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