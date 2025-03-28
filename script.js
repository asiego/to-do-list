// DOM-skriptit
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// kuuntelija joka vaihtaa input laatikon taustavärin välittömästi virheilmoituksen jälkeen
taskInput.addEventListener('input', function() {
    taskInput.style.borderColor = '';  
    taskInput.style.backgroundColor = '';  
});
// tehtävän lisäys 
function addTask() {
    const taskText = taskInput.value.trim();
    // Lisätään huomatus tyhjästä syötteestä
    if (taskText === '') {
        alert('Syötteesi on tyhjä!');
        taskInput.style.backgroundColor = 'red';
        return;
    }
    // Lisätään huomatus liian lyhyestä syötteestä
    if (taskText.length < 2) {
        alert('Syötteesi on liian lyhyt!');
        taskInput.style.backgroundColor = 'red';
        return;
    }

    // Palautetaan värit virheellisen syötteen jälkeen
    taskInput.style.borderColor = '';
    taskInput.style.backgroundColor = '';
    // Tehtävien lisäys listaan jos syöte hyväksytty / ei tyhjä
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;

        // Lisätään kuuntelija 
        li.addEventListener('click', completeTask);

        // Luodaan poista nappi
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Poista';
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
        if (taskList.style.display === 'none') { // Lisätään tehtävälista näkyviin ensimmäisen hyväksytyn syötteen jälkeen
            taskList.style.display = 'block';
        }
        saveTasksToLocalStorage();
        taskInput.value = '';
    }
}

// Lisätään tehtävien merkkaaminen suoritetuksi
function completeTask(event) {
    const task = event.target;
    task.classList.toggle('completed');
    saveTasksToLocalStorage(); // 
}

// Tehtävien poistaminen listasta
function deleteTask(event) {
    event.stopPropagation(); 
    const task = event.target.parentElement;
    taskList.removeChild(task);
    saveTasksToLocalStorage(); 
}

// Tallennetaan tehtävät localstorageen
function saveTasksToLocalStorage() {
    const tasks = [];
    const taskItems = taskList.getElementsByTagName('li');
    for (let i = 0; i < taskItems.length; i++) {
        tasks.push(taskItems[i].firstChild.textContent); // Tallennetaan vain tehtävän teksti
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Ladataan tehtävät localstoragesta
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.textContent = taskText;
        li.addEventListener('click', completeTask);

        // Luodaan poista tehtävä nappi
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Poista';
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Ladataan tehtävät kun sivu aukaistaan
document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage(); 
    const taskList = document.getElementById('taskList');
    if (taskList.children.length > 0) {
        taskList.style.display = 'block'; 
    }
});