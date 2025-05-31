const usersContainer = document.getElementById('usersContainer');
const todosContainer = document.getElementById('todosContainer');

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = user.name;
      li.addEventListener('click', () => {
        fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`)
          .then(res => res.json())
          .then(todos => {
            todosContainer.innerHTML = '';
            todos.forEach(todo => {
              const todoLi = document.createElement('li');
              todoLi.textContent = todo.title + (todo.completed ? ' ✓' : '');
              todosContainer.appendChild(todoLi);
            });
          });
      });
      usersContainer.appendChild(li);
    });
  })