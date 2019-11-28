function defineTODOs() {
    const   todos = ["Gå ut med hunden", "Dammsuga vardagsrummet", "Tvätta kläder"];

    addTodosToDOM(todos)
}


function addTodosToDOM(todos) {
    const   list = document.querySelector('.todo-list');

    todos.forEach(todo => {
        console.log(todo);
        
        const   li = document.createElement('li'),
        remove = document.createElement('i');

        li.append(todo)
        remove.append('clear')
        remove.className = 'material-icons delete-icon'
        li.appendChild(remove)
        list.appendChild(li)
    });

            
addRemoveButtonsToDOM()
}

function addRemoveButtonsToDOM() {
    const target = document.querySelectorAll('.delete-icon');

    target.forEach(icon => {
        console.log(icon);
        icon.addEventListener('click', function(event) {
            event.target.parentElement.parentElement.removeChild(event.target.parentElement)
        })
           
    });

}