function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle; //Создаем элемент заголовка

}

function createTodoItemForm() {
    let form = document.createElement('form'); //Создание основной формы
    let input = document.createElement('input'); //инпут формы
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button'); //кнопка формы для создания li

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела :)'
    buttonWrapper.classList.add('input-group-append')
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело'  // Добавляем классы и название

    button.disabled = true;
    input.addEventListener('input', () => {
        button.disabled = input.value === '';
    })

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);  //Добавляем кнопку в контейнер -> инпут в форму -> контейнер с кнопкой

    return {
        form,
        input,
        button, //Возвращаем все из функции в dom
    };
}

function createTodoList() {

    let list = document.createElement('ul')  //Создаем лист, куда будут добавляться элементы li TodoItem
    list.classList.add('list-group')
    return list
}


let todos = [];


function createTodoItem(name) {

    let id = todos.length + 1;
    let todo = {
        id: id,
        name: name,
        done: false
    };



    let item = document.createElement('li'); //создаем li

    let buttonGroup = document.createElement('div');  //btn container
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button'); //и две кнопки "готово" "удалить"

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center'); //классы для распределения текста и кнопок в элементе списка
    item.textContent = todo.name;
    item.id = todo.id

    todos.push(todo)
    buttonGroup.classList.add('btn-group', 'btn-group-sm')  //классы для контейнера кнопок и для самих кнопок
    doneButton.classList.add('btn', 'btn-success')
    doneButton.textContent = 'Готово'
    deleteButton.classList.add('btn', 'btn-danger')
    deleteButton.textContent = 'Удалить'

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup)

    return {
        todo,
        item,
        doneButton,
        deleteButton
    }

}





function createTodoApp(container, title= 'Список дел') {

        let todoAppTitle = createAppTitle(title)
        let todoItemForm = createTodoItemForm()
        let todoList = createTodoList()
        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.form.addEventListener('submit', function (e) {
            e.preventDefault()

            if (!todoItemForm.input.value) {
                return;
            }


            let todoItem = createTodoItem(todoItemForm.input.value);

            todoItem.doneButton.addEventListener('click', function () {
                todoItem.item.classList.toggle('list-group-item-success')
                for (let obj in todos) {
                    if (todos[obj].id === Number(todoItem.item.id)) {
                        todos[obj].done = todoItem.item.classList.contains('list-group-item-success');
                    }
                }
            });
            todoItem.deleteButton.addEventListener('click', function () {
                if (confirm('Вы уверены?')) {
                    todoItem.item.remove()
                    for (let i = 0; i < todos.length; i++) {
                        if (todos[i].id === Number(todoItem.item.id)) {
                            todos.splice(i, 1);
                            break;
                        }
                    }
                }
            })

            todoList.append(todoItem.item);
            todoItemForm.input.value = '';

        })

}


window.createTodoApp = createTodoApp;

