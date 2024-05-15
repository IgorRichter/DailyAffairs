// Функции для сохранения и загрузки данных из localStorage
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

// Функции для работы с задачами и проектами
function saveTask(task) {
  const tasks = loadFromLocalStorage('tasks');
  tasks.push(task);
  saveToLocalStorage('tasks', tasks);
}

function saveProject(project) {
  const projects = loadFromLocalStorage('projects');
  projects.push(project);
  saveToLocalStorage('projects', projects);
}

function isTaskExists(taskId) {
  const tasks = loadFromLocalStorage('tasks');
  return tasks.some(task => task.id === taskId);
}

export { saveToLocalStorage, loadFromLocalStorage, saveTask, saveProject, isTaskExists }