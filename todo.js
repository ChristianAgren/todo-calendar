/**
 * Initialises Todo on load
 */
function initTODOs() {
    addSaveTodoButton()
}

/**
 * Loads eventlistener on save button for todos and saves input value to localstorage
 */
function addSaveTodoButton() {
    const input = document.querySelector('.add-todo input'),
        saveButton = document.querySelector('.add-todo button');

    saveButton.addEventListener('click', () => {
        const todo = input.value;
        const targetDate = JSON.parse(localStorage.getItem('selectedDay')) || undefined;
        const localStrList = JSON.parse(localStorage.getItem(targetDate)) || [];

        if (todo != "") {
            if ((targetDate != undefined) && (targetDate != 'not available')) {
                localStrList.unshift(todo)
                localStorage.setItem(targetDate, JSON.stringify((localStrList)))
                updateTodolistInDOM(targetDate)
            }
        }
    })
}

/**
 * Updates all todos for a date on function call
 * @param {String} targetDate The date that has been selected by user
 */
function updateTodolistInDOM(targetDate){
    const   DOMList = document.querySelector('.todo-list');
    removeTodosFromDOM(DOMList)
    addTodosToDOM(DOMList, targetDate)
}

/**
 * Removes all todos from the DOM
 * @param {Element} DOMList The container for all todos
 */
function removeTodosFromDOM(DOMList){
    const   lis = document.querySelectorAll('.todo-list li');

    lis.forEach(todo => {
        DOMList.removeChild(todo)
    });
}

/**
 * Loads all todos from a date into the DOM on function call
 * @param {Element} DOMList The container for all todos
 * @param {*} targetDate The date that has been selected by user
 */
function addTodosToDOM(DOMList, targetDate) {

    const todoList = JSON.parse(localStorage.getItem(targetDate))    
    
    if (todoList != null) {

        todoList.forEach(todo => {
            const   li = document.createElement('li');
            
            li.append(todo)
            buildRemoveButton(li)
            buildEditButton(li)
            DOMList.appendChild(li)

        })
    }
}

function buildRemoveButton(todo) {
    const removeElement = document.createElement('i');

    removeElement.append('clear')
    removeElement.className = 'material-icons delete-icon'
    todo.appendChild(removeElement)
    removeElement.addEventListener('click', removeTodoFromLocalstorage)
}

function removeTodoFromLocalstorage(event) {
    const   target = document.querySelectorAll('.delete-icon'),
            Index = Array.prototype.indexOf.call(target, event.target),
            targetDate = JSON.parse(localStorage.getItem('selectedDay')),
            targetDateLocalArray = JSON.parse(localStorage.getItem(targetDate));

    targetDateLocalArray.splice(Index, 1)
    localStorage.setItem(targetDate, JSON.stringify(targetDateLocalArray))
    removeTodoFromDOM(event) 
}

function removeTodoFromDOM(event) {
    event.target.parentElement.parentElement.removeChild(event.target.parentElement)
}

function buildEditButton(todo) {
    const editElement = document.createElement('i');

    editElement.append('edit')
    editElement.className = 'material-icons edit-icon'
    todo.appendChild(editElement)
    editElement.addEventListener('click', editTodoInLocalstorage)
}

function editTodoInLocalstorage(event) {
    const   target = document.querySelectorAll('.todo-list li'),
            targetDate = JSON.parse(localStorage.getItem('selectedDay')),
            targetDateLocalArray = JSON.parse(localStorage.getItem(targetDate)),
            Index = Array.prototype.indexOf.call(target, event.target.parentElement),
            todoTextValue = targetDateLocalArray[Index],
            targetTodoListItem = event.target.parentElement;    

    removeTextFromTargetListItem(targetTodoListItem)
    addSaveNewInputButton(targetTodoListItem, Index)
    addEditInputField(targetTodoListItem, todoTextValue)    
}

function removeTextFromTargetListItem (li) {
    li.innerText = ""
}

function addSaveNewInputButton (li) {
    const   saveEditButton = document.createElement('i');

    saveEditButton.className = 'material-icons save-edit-icon'
    saveEditButton.append('check')
    li.append(saveEditButton)

    saveEditButton.addEventListener('click', (event) => {
        const   newInputValue = event.target.parentElement.lastChild.value,
                correctTarget = document.querySelectorAll('.todo-list li'),
                correctIndex = Array.prototype.indexOf.call(correctTarget, event.target.parentElement)

        li.classList.remove('edit')
        saveNewInputToLocalstorage(newInputValue, correctIndex)        
        li.innerText = newInputValue
        buildRemoveButton(li)
        buildEditButton(li)
    })
}

function saveNewInputToLocalstorage(input, Index) {
    const   targetDate = JSON.parse(localStorage.getItem('selectedDay')),
            targetDateLocalArray = JSON.parse(localStorage.getItem(targetDate));

    targetDateLocalArray[Index] = input    
    localStorage.setItem(targetDate, JSON.stringify(targetDateLocalArray))
}

function addEditInputField(li, inputValue) {
    const input = document.createElement('input');

    input.setAttribute('maxlength', 60)
    input.className = 'edit-field'
    li.classList.add('edit')
    li.append(input)
    input.value = inputValue
}