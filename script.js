let input = document.querySelector('.input')
let addBtn = document.querySelector('.add')
let tasksDiv = document.querySelector('.tasks')

let addTextToArray = []

//check if there is tasks in local
if(localStorage.getItem('tasks')) {
    addTextToArray = JSON.parse(localStorage.getItem('tasks'))
}

getDataFromLocalStorage()

addBtn.onclick = function() {
    if(input.value !== '') {
        addTaskToArray(input.value)
        input.value = '';
    }
}

tasksDiv.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        deleteTaskWith(e.target.parentElement.getAttribute('data-id'))
        e.target.parentElement.remove()
    }
})


function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false
    }
    addTextToArray.push(task)
    addElementToPage(taskText)
    addDataToLocalStorageFrom(addTextToArray)
}

function addElementToPage(taskText) {
    tasksDiv.innerHTML = ''
    addTextToArray.forEach((task) => {
        let liELe = document.createElement('li')
        liELe.className = 'task'
        liELe.setAttribute('data-id', task.id)
        liELe.appendChild(document.createTextNode(task.title))

        let deleteBtn = document.createElement('button')
        deleteBtn.className = 'delete'
        deleteBtn.textContent = 'Delete'
        liELe.appendChild(deleteBtn)

        tasksDiv.appendChild(liELe)
    })
}

function addDataToLocalStorageFrom(addTextToArray) {
    window.localStorage.setItem('tasks', JSON.stringify(addTextToArray))
}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem('tasks')
    if(data) {
        let tasks = JSON.parse(data)
        addElementToPage(tasks)
    }
}

function deleteTaskWith(taskId) {
    addTextToArray = addTextToArray.filter((task) => task.id != taskId)
    addDataToLocalStorageFrom(addTextToArray)
}