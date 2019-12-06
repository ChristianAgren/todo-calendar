
function initTODOs() {
    const targetDate = JSON.parse(localStorage.getItem('selectedDay'));
    addSaveTodoButton()
    updateTodolistInDOM(targetDate)
}

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
                updateMonth()
                updateTodolistInDOM(targetDate)
            }
        }
    })
}

function updateTodolistInDOM(targetDate){
    const   DOMList = document.querySelector('.specific');
    removeTodosFromDOM(DOMList)
    addTodosToDOM(DOMList, targetDate)
}

function removeTodosFromDOM(DOMList){
    const   lis = document.querySelectorAll('.specific li'),
            global = document.querySelector('.global'),
            globalListCards = document.querySelectorAll('.global > div');
    

    globalListCards.forEach(element => {
        global.removeChild(element)
    })

    lis.forEach(todo => {
        DOMList.removeChild(todo)
    });
}

function addTodosToDOM(DOMList, targetDate) {
    const todoList = JSON.parse(localStorage.getItem(targetDate))
    
    if (targetDate === 'unspecified') {
        const month = JSON.parse(localStorage.getItem('apiMonth'));
        
        month.forEach(day => {
            const todos = JSON.parse(localStorage.getItem(day.datum)) || false;
            
            if ((todos) && (todos.length != 0)) {
                const globalTodos = document.querySelector('.global'),
                        div = document.createElement('div'),
                        p = document.createElement('p'),
                        ul = document.createElement('ul');
                
                p.append(day.datum)
                div.append(p,ul)
                globalTodos.append(div)
                todos.forEach(todo => {
                    const li = document.createElement('li');
                    li.append(todo)
                    ul.append(li)
                });
            }
                                    
        });
    }
    
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
    updateMonth()
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