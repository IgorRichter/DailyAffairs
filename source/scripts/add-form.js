import { attachEventToPriorityInput, attachEventToTextarea } from './task-edit.js';
import { deleteTask, editTask, deleteProject, editProject } from './edit-form.js';
import { generateUniqueId, getTodayDate, validateInput, updateSubmitButtonAvailability, generateUniqueOrder } from './utils.js';
import { newItems, MAX_LENGTH_TITLE, MAX_LENGTH_DISC, TextError } from './const.js';
import { updateTasksVisibility } from './data-sort.js';
import { updateExpiredTasks, updateTasksList, setupCompleteTaskButtons, applyCompletedTaskClass, applyExpiredTaskClass } from './task-types-sort.js';
import { navigateToProjectTasks, navigateBackToProjects } from './project-section.js';
import { loadFromLocalStorage, saveTask, saveProject, isTaskExists } from './app.js';

const taskTemplate = document.querySelector('#task');
const projectTemplate = document.querySelector('#project');
const projectEditorTemplate = document.querySelector('#project-editor');
const taskEditorTemplate = document.querySelector('#task-editor');
const tasksLists = document.querySelectorAll('.list-with-tasks');
const projectLists = document.querySelectorAll('.projects__list');

// Инициализация задач и проектов при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const tasks = loadFromLocalStorage('tasks');
  tasks.forEach(task => {
    const taskOrder = generateUniqueOrder();
      tasksLists.forEach(list => {
          const taskElement = taskTemplate.content.cloneNode(true);
          const taskItem = taskElement.querySelector('.task');
          taskItem.dataset.id = task.id;
          taskItem.dataset.order = taskOrder;
          taskItem.dataset.project = task.project;
          taskItem.querySelector('.task__title').textContent = task.title;
          taskItem.querySelector('.task__discription').textContent = task.description;
          taskItem.querySelector('.task__data').textContent = task.date || 'Без срока';
          taskItem.querySelector('.task__project').textContent = task.project;

          const taskCircle = taskItem.querySelector('.task__circle');
          if (task.priority === "Срочно") {
              taskCircle.classList.add('task__circle--priority1');
          } else if (task.priority === "Важно") {
              taskCircle.classList.add('task__circle--priority2');
          } else if (task.priority === "Второстепенно") {
              taskCircle.classList.add('task__circle--priority3');
          }

          list.querySelector('.list-with-tasks__wrapper').appendChild(taskItem);

          editTask();
          deleteTask();
      });
  });

  const projects = loadFromLocalStorage('projects');
  projects.forEach(project => {
      projectLists.forEach(list => {
          const projectElement = projectTemplate.content.cloneNode(true);
          const projectTitle = projectElement.querySelector('.project__title');
          const projectDescription = projectElement.querySelector('.project__discription');

          projectTitle.textContent = project.title;
          projectDescription.textContent = project.description;

          list.querySelector('.projects__list-wrapper').appendChild(projectElement);

          editProject();
          deleteProject();
      });
  });

  const projectItems = document.querySelectorAll('.project__info-wrapper');
  projectItems.forEach(item => {
      item.addEventListener('click', navigateToProjectTasks);
  });

  const backButton = document.querySelector('.button-back');
  backButton.addEventListener('click', navigateBackToProjects);

  setupCompleteTaskButtons();
  updateTasksVisibility();
  applyCompletedTaskClass();
  applyExpiredTaskClass();
});

newItems.forEach(newItem => {
    const newItemButton = newItem.querySelector('.new-item__task');
    const section = newItem.closest('.list');
    const isProjectSection = section && section.classList.contains('projects__list');

    // Обработчик клика по кнопке "Добавить задачу/проект"
    newItemButton.addEventListener('click', () => {
        const templateToUse = isProjectSection ? projectEditorTemplate : taskEditorTemplate;
        const editor = templateToUse.content.cloneNode(true);
        const editorForm = editor.querySelector('.task-editor');

        if (editorForm && section) {
            const managerItem = section.querySelector('.manager-item');
            if (managerItem) {
                managerItem.innerHTML = '';
                managerItem.appendChild(editor);
                editorForm.classList.add('task-editor--visible');
                newItem.classList.add('new-item--disabled');

                const titleField = editorForm.querySelector('[name="title_task"]');
                const descriptionField = editorForm.querySelector('[name="discription_task"]');
                const submitButton = editorForm.querySelector('.task-editor__submit-btn');
                const errorFieldTitle = document.createElement('span');
                const errorFieldDescription = document.createElement('span');

                errorFieldTitle.classList.add('task-editor__error');
                errorFieldDescription.classList.add('task-editor__error');
                titleField.parentNode.appendChild(errorFieldTitle);
                descriptionField.parentNode.appendChild(errorFieldDescription);

                titleField.addEventListener('input', () => {
                  validateInput(titleField, MAX_LENGTH_TITLE, errorFieldTitle, TextError.TITLE, submitButton);
                  updateSubmitButtonAvailability(titleField, descriptionField, submitButton);
                });

                descriptionField.addEventListener('input', () => {
                    validateInput(descriptionField, MAX_LENGTH_DISC, errorFieldDescription, TextError.DISC, submitButton);
                    updateSubmitButtonAvailability(titleField, descriptionField, submitButton);
                });

                updateSubmitButtonAvailability(titleField, descriptionField, submitButton);

                // Добавление обработчика события для кнопки "Добавить задачу"
                submitButton.addEventListener('click', () => {
                    validateInput(titleField, MAX_LENGTH_TITLE, errorFieldTitle, TextError.TITLE, submitButton);
                    validateInput(descriptionField, MAX_LENGTH_DISC, errorFieldDescription, TextError.DISC, submitButton);

                    if (titleField.classList.contains('has-error') || descriptionField.classList.contains('has-error')) {
                        return;
                    }

                    const title = titleField.value;
                    const description = descriptionField.value;

                    if (isProjectSection) {
                        const project = {
                            title: title,
                            description: description
                        };

                        projectLists.forEach(list => {
                            const projectElement = projectTemplate.content.cloneNode(true);
                            projectElement.querySelector('.project__title').textContent = title;
                            projectElement.querySelector('.project__discription').textContent = description;
                            list.querySelector('.projects__list-wrapper').appendChild(projectElement);
                        });

                        saveProject(project);
                        const projectItems = document.querySelectorAll('.project__info-wrapper');
                        projectItems.forEach(item => {
                            item.addEventListener('click', navigateToProjectTasks);
                        });
                      
                        const backButton = document.querySelector('.button-back');
                        backButton.addEventListener('click', navigateBackToProjects);

                    } else {
                        const taskId = generateUniqueId();
                        const taskOrder = generateUniqueOrder();

                        tasksLists.forEach(list => {
                            const task = taskTemplate.content.cloneNode(true);
                            const taskItem = task.querySelector('.task');
                            taskItem.dataset.id = taskId;
                            taskItem.dataset.order = taskOrder;
                            const taskTitle = task.querySelector('.task__title');
                            const taskDescription = task.querySelector('.task__discription');
                            const taskDate = task.querySelector('.task__data');
                            const taskProject = task.querySelector('.task__project');
                            const taskCircle = task.querySelector('.task__circle');
                            const priorityLabel = document.querySelector('.task-editor__priority-label');
                            let date = editorForm.querySelector('[name="data_task"]').value;
                            let priority = editorForm.querySelector('[name="priority_task"]').value;
                            let project = editorForm.querySelector('[name="project_task"]').value;

                            taskTitle.textContent = title;
                            taskDescription.textContent = description;
                            taskDate.textContent = date;
                            if (!date) {
                              taskDate.textContent = 'Без срока';
                            }

                            taskProject.textContent = project;
                            taskItem.dataset.project = project;

                            if (priority === "Срочно") {
                                taskCircle.classList.add('task__circle--priority1');
                            } else if (priority === "Важно") {
                                taskCircle.classList.add('task__circle--priority2');
                            } else if (priority === "Второстепенно") {
                              taskCircle.classList.add('task__circle--priority3');
                              }
                              priorityLabel.classList.remove('task-editor__priority-label--priority1', 'task-editor__priority-label--priority2', 'task-editor__priority-label--priority3');
                        
                              list.querySelector('.list-with-tasks__wrapper').appendChild(task);
                              
                              editTask();
                              deleteTask();
      
                              // Сохранение задачи в localStorage, если ее еще нет
                              if (!isTaskExists(taskId)) {
                                  saveTask({
                                      id: taskId,
                                      order: taskOrder,
                                      title,
                                      description,
                                      date,
                                      priority,
                                      project
                                  });
                              }
                          });
                      }
      
                      editorForm.reset();
                      updateSubmitButtonAvailability(titleField, descriptionField, submitButton);
                      updateTasksVisibility();
                      updateExpiredTasks();
      
                      const selectedButtonElement = document.querySelector('.tasks__header-button--active');
                      if (selectedButtonElement) {
                          const selectedButton = selectedButtonElement.textContent.trim();
                          updateTasksList(selectedButton);
                      }
                      
                      setupCompleteTaskButtons();
                  });
      
                  if (!isProjectSection) {
                      attachEventToPriorityInput(getTodayDate());
                  }
      
                  attachEventToTextarea();
              }
          }
      
          // Обработчик клика по кнопке "Закрыть"
          const closeButton = editorForm.querySelector('.task-editor__close-btn');
          if (closeButton) {
              closeButton.addEventListener('click', () => {
                  editorForm.classList.add('task-editor--hidden');
                  editorForm.addEventListener('transitionend', function handleTransitionEnd() {
                      editorForm.remove();
                      newItem.classList.remove('new-item--disabled');
                      editorForm.removeEventListener('transitionend', handleTransitionEnd);
                  }, { once: true });
              });
          }
      });
});
