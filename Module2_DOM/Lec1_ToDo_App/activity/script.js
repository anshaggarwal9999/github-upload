let toDoInput = document.querySelector(".todo-input");
let addTodoButton = document.querySelector(".add-todo");
let list = document.querySelector(".todos-list");
// let deleteTodoButton = document.querySelector(".delete-todo");

addTodoButton.addEventListener("click", function() {
    let todo = toDoInput.value;
    if(todo) {
        let listItem = document.createElement("li");
        listItem.classList.add("todo-item");

        let pTag = document.createElement("p");
        pTag.classList.add("todo");
        pTag.innerHTML = todo;

        let button = document.createElement("button");
        button.classList.add("delete-todo");
        button.innerHTML = "Delete Todo";

        listItem.append(pTag);
        listItem.append(button);
        // console.log(listItem);

        list.append(listItem);
        toDoInput.value = "";

        button.addEventListener("click", function(event) {
            // deleteTodoButton.previousElementSibling.remove();
            button.parentNode.remove();
            // deleteTodoButton.remove();
        });
    }
});

toDoInput.addEventListener("keypress", function(event) {
    if(event.key == "Enter") {
        console.log("Enter Pressed");
    }
});