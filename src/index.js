import './style.css';
import './formStyle.css';
import { createNewProject, saveProjects } from "./app";
import './DOM';
import {formContainer} from "./DOM";


const projectName = document.querySelector('#project-name');
const projectDiscription = document.querySelector('#project-discription');
const dateDue = document.querySelector('#project-dueDate');
const priority = document.querySelector('#project-priority');

/**
 * remove text after form has been submitted.
 */
const resetForm = () => {
    projectName.value = '';
    projectDiscription.value = '';
    dateDue.value = "";
    priority.value = "";
};

/**
 * create new project after form has benn submitted and hide form.
 */
const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', () => {
    if(projectName.value != '' && projectDiscription.value != '' && dateDue != "" && priority.value != ''){
        saveProjects(createNewProject(projectName.value, projectDiscription.value, dateDue.value, priority.value));
        formContainer.style.display = 'none';
        resetForm()
    };
});