function defineTODOs() {
    const   localStrList = JSON.parse(localStorage.getItem('todo-list')) || undefined,
            DOMList = document.querySelector('.todo-list');

    addTodosToDOM(localStrList, DOMList)
    addSaveTodoButton()
    addRemoveButtonsToDOM()
}

function updateTodolistInDOM(localStrList){
    const   DOMList = document.querySelector('.todo-list');
    removeTodosFromDOM(DOMList)
    addTodosToDOM(localStrList, DOMList)
}

function removeTodosFromDOM(DOMList){
    const   lis = document.querySelectorAll('.todo-list li');

    lis.forEach(todo => {
        DOMList.removeChild(todo)        
    });
}

function addTodosToDOM(todos, DOMList) {

    if (todos != undefined) {
        todos.forEach(todo => {         
            const   li = document.createElement('li'),
            removeElement = document.createElement('i');
    
            li.append(todo)
            removeElement.append('clear')
            removeElement.className = 'material-icons delete-icon'
            li.appendChild(removeElement)
            DOMList.appendChild(li)
        });
    }          
}

function addSaveTodoButton() {
    const   input = document.querySelector('.add-todo input'),
            saveButton = document.querySelector('.add-todo button');
            
    saveButton.addEventListener('click', () => {
        const   todo = input.value,
                localStrList = JSON.parse(localStorage.getItem('todo-list')) || [];
        if (todo != ""){
            localStrList.unshift(todo)
            localStorage.setItem('todo-list', JSON.stringify((localStrList)))
            updateTodolistInDOM(localStrList)
        }
    })
}

function addRemoveButtonsToDOM() {
    const target = document.querySelectorAll('.delete-icon');

    target.forEach(icon => {
        icon.addEventListener('click', (event) => {
            console.log(event);
            
            // event.target.parentElement.parentElement.removeChild(event.target.parentElement)
        })
           
    });

}