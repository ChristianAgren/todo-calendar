function initTODOs() {
        addSaveTodoButton()

}

function addSaveTodoButton() {
    const   input = document.querySelector('.add-todo input'),
            saveButton = document.querySelector('.add-todo button');

    saveButton.addEventListener('click', () => {
        const   todo = input.value;
        const   targetDate = JSON.parse(localStorage.getItem('selectedDay')) || undefined;
        const   localStrList = JSON.parse(localStorage.getItem(targetDate)) || [];

        if (todo != ""){
            if((targetDate != undefined) && (targetDate != 'not available')) {
                localStrList.unshift(todo)
                localStorage.setItem(targetDate, JSON.stringify((localStrList)))
                updateTodolistInDOM(targetDate)
            }
        }
    })
}

function updateTodolistInDOM(targetDate){
    const   DOMList = document.querySelector('.todo-list');
    removeTodosFromDOM(DOMList)
    addTodosToDOM(DOMList, targetDate)
}

function removeTodosFromDOM(DOMList){
    const   lis = document.querySelectorAll('.todo-list li');

    lis.forEach(todo => {
        DOMList.removeChild(todo)
    });
}

function addTodosToDOM(DOMList, targetDate) {

    const todoList = JSON.parse(localStorage.getItem(targetDate))    
    
    if (todoList != null) {

        todoList.forEach(todo => {
            const   li = document.createElement('li'),

                    removeElement = document.createElement('i'),
                    editElement = document.createElement('i');

            li.append(todo)
            removeElement.append('clear')
            editElement.append('edit')
            removeElement.className = 'material-icons delete-icon'
            editElement.className = 'material-icons edit-icon'
            li.appendChild(removeElement)
            li.appendChild(editElement)
            DOMList.appendChild(li)

        })
    }
    addRemoveButtonsToDOM()
    editTodo()
}


function addRemoveButtonsToDOM() {
    const target = document.querySelectorAll('.delete-icon');

    const targetDate = JSON.parse(localStorage.getItem('selectedDay'));
    const targetDateLocalArray = JSON.parse(localStorage.getItem(targetDate))

    target.forEach(icon => {
        icon.addEventListener('click', (event) => {          
            
            const Index = Array.prototype.indexOf.call(target, event.target)
            targetDateLocalArray.splice(Index, 1)
            localStorage.setItem(targetDate, JSON.stringify(targetDateLocalArray))
            updateTodolistInDOM(targetDate)                                                                  
        })
   
    });
  
}

function editTodo () {
    
    const target = document.querySelectorAll('.edit-icon')
    const targetDate = JSON.parse(localStorage.getItem('selectedDay'))
    const targetDateLocalArray = JSON.parse(localStorage.getItem(targetDate))
    
    
    target.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const Index = Array.prototype.indexOf.call(target, event.target)

        } )
    })

}