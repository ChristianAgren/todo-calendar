function initTODOs() {
    addSaveTodoButton()
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
                updateTodolistInDOM(targetDate)
            }
        }
    })
}

function updateTodolistInDOM(targetDate) {
    const DOMList = document.querySelector('.todo-list');
    removeTodosFromDOM(DOMList)
    addTodosToDOM(DOMList, targetDate)
}

function removeTodosFromDOM(DOMList) {
    const lis = document.querySelectorAll('.todo-list li');

    lis.forEach(todo => {
        DOMList.removeChild(todo)
    });
}

function addTodosToDOM(DOMList, targetDate) {

    const todoList = JSON.parse(localStorage.getItem(targetDate))

    if ((todoList != null) && (todoList != 'not available')) {
        todoList.forEach(todo => {
            const li = document.createElement('li'),
                removeElement = document.createElement('i');
            li.append(todo)
            removeElement.append('clear')
            removeElement.className = 'material-icons delete-icon'
            li.appendChild(removeElement)
            DOMList.appendChild(li)

        })
    }
    addRemoveButtonsToDOM()
}


function addRemoveButtonsToDOM() {
    const target = document.querySelectorAll('.delete-icon');

    const targetDate = JSON.parse(localStorage.getItem('selectedDay'));
    const targetDateLocalArray = JSON.parse(localStorage.getItem(targetDate));

    target.forEach(icon => {
        icon.addEventListener('click', (event) => {

            const Index = Array.prototype.indexOf.call(target, event.target)
            console.log(Index);
            targetDateLocalArray.splice(Index, 1)
            console.log(targetDateLocalArray)
            localStorage.setItem(targetDate, JSON.stringify(targetDateLocalArray))
            updateTodolistInDOM(targetDate)
        })

    });

}