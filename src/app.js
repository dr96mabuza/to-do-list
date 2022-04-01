const runToDoList = () => {
    class createProject {
        constructor (name, discription, dueDate, ...tasks) {
        
            this.name = name;
            this.discription = discription;
            this.dueDate = dueDate;
            this.tasks = tasks;
        }
    }

    let arrayForProjects = [];

    const saveProjects = (name, discription, ...tasks) => {
        const project = new createProject(name, discription, ...tasks);
        return arrayForProjects.push(project);
    }

    saveProjects('who', 'what', '1996/12/19', 'why');

    const displayProjects = () => {
        const body = document.querySelector('body');
        const content = document.createElement('div');
        body.appendChild(content);
        for(let i = 0; i < arrayForProjects.length; i++) {
            const container = document.createElement('div');
            content.appendChild(container);

            const nameContainer = document.createElement('div');
            nameContainer.textContent = arrayForProjects[i].name;
            container.appendChild(nameContainer);

            const discriptionContainer = document.createElement('div');
            discriptionContainer.textContent = arrayForProjects[i].discription;
            container.appendChild(discriptionContainer);

            const dateContainer = document.createElement('div');
            dateContainer.textContent = arrayForProjects[i].dueDate;
            container.appendChild(dateContainer);
            
            for (let j = 0; j < arrayForProjects[i].tasks.length; j++) {
                const tasksContainer = document.createElement('div');
                tasksContainer.textContent = arrayForProjects[i].tasks[j];
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'remove task';
                deleteButton.addEventListener('click', () => {arrayForProjects[i].tasks.splice(j,1);console.log(arrayForProjects[i].tasks)});
                tasksContainer.appendChild(deleteButton);
                container.appendChild(tasksContainer);
            }
        }
    }

    return {displayProjects};
}

export {runToDoList};