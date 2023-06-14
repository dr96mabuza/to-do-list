import { addDays, format, isToday, isTomorrow, parse } from "date-fns";
import uniqid from "uniqid";
import { displayProjects } from "../src/DOM";

format(new Date(2023, 6, 8), "yyyy/MM/dd")

const runToDoList = () => {
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
    }
    localStorage.clear();
    const pp = new createProject("test", "test new", `2023-06-14`, "high");
    let projects = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [pp];
    console.log(isToday(projects[0].dueDate));
    
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
        project.dateUpdated = new Date()
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