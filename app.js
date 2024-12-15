const taskInput = document.querySelector('.add-new__input');
const addButton = document.querySelector('.add-new__btn');
const incompleteTaskHolder = document.querySelector('.tasks--uncompleted');
const completedTasksHolder = document.querySelector('.tasks--completed');

function createNewTaskElement(taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'tasks__label';

  checkBox.type = 'checkbox';
  checkBox.className = 'tasks__checkbox';

  editInput.type = 'text';
  editInput.className = 'input';

  editButton.innerText = 'Edit';
  editButton.className = 'btn btn--edit';

  deleteButton.className = 'btn btn--delete';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'btn__picture';
  deleteButtonImg.alt = 'Remove';

  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function addTask() {
  console.log('Add Task...');

  if (!taskInput.value) {
    return;
  }

  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);

  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

function editTask() {
  console.log('Edit Task...');
  console.log(`Change 'edit' to 'save'`);

  const listItem = this.parentNode;

  const editInput = listItem.querySelector('.input');
  const label = listItem.querySelector('.tasks__label');
  const editBtn = listItem.querySelector('.btn--edit');

  const containsClass = listItem.classList.contains('tasks__row--edit');

  if (containsClass) {
    label.innerText = editInput.value;

    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;

    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('tasks__row--edit');
}

function deleteTask() {
  console.log('Delete Task...');

  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
}

function taskCompleted() {
  console.log('Complete Task...');

  const listItem = this.parentNode;

  completedTasksHolder.appendChild(listItem);

  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log('Incomplete Task...');

  const listItem = this.parentNode;

  incompleteTaskHolder.appendChild(listItem);

  bindTaskEvents(listItem, taskCompleted);
}

function ajaxRequest() {
  console.log('AJAX Request');
}

addButton.onclick = addTask;

addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');

  const checkBox = taskListItem.querySelector('.tasks__checkbox');
  const editButton = taskListItem.querySelector('.btn--edit');
  const deleteButton = taskListItem.querySelector('.btn--delete');

  editButton.onclick = editTask;

  deleteButton.onclick = deleteTask;

  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
