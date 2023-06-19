
import './style.css';
import './formStyle.css';
import {runToDoList} from './app';
import './DOM';

export const run = runToDoList();



// const projectName = document.querySelector('#projectName');
// const projectDiscription = document.querySelector('#projectDiscription');
// const dateDue = document.querySelector('#dueDate');
// const tasks = document.querySelector('#projectTasks');

const submitButton = document.querySelector('#submit');
// submitButton.addEventListener('click', () => {
//     if(projectName.value != '' && projectDiscription.value != '' && tasks.value != ''){
//         // run.saveProjects(projectName.value, projectDiscription.value, dateDue.value, tasks.value);
//         // run.displayProjects();
//         // run.todaysProjects();
//         formContainer.style.display = 'none';
//     };
// });