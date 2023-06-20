import './style.css';
import './formStyle.css';
import { createNewProject, saveProjects } from "./app";
import './DOM';
import {formContainer} from "./DOM";


const projectName = document.querySelector('#project-name');
const projectDiscription = document.querySelector('#project-discription');
const dateDue = document.querySelector('#project-dueDate');
const priority = document.querySelector('#project-priority');

const resetForm = () => {
    projectName.value = '';
    projectDiscription.value = '';
    dateDue.value = "";
    priority.value = "";
};

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', () => {
    if(projectName.value != '' && projectDiscription.value != '' && dateDue != "" && priority.value != ''){
        saveProjects(createNewProject(projectName.value, projectDiscription.value, dateDue.value, priority.value));
        formContainer.style.display = 'none';
        resetForm()
    };
});