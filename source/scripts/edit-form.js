import { attachEventToPriorityInput, attachEventToTextarea } from './task-edit.js';
import { MAX_LENGTH_TITLE, MAX_LENGTH_DISC, TextError } from './const.js';
import { validateInput, updateSubmitButtonAvailability } from './utils.js';
import { updateTasksVisibility } from './data-sort.js';
import { updateExpiredTasks, updateTasksList } from './task-types-sort.js';

function deleteItem(deleteButtonSelector, parentSelector, idAttribute = null) {
  const deleteButtons = document.querySelectorAll(deleteButtonSelector);

  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest(parentSelector);
      if (item) {
        if (idAttribute) {
          const itemId = item.dataset.id;
          const itemsToDelete = document.querySelectorAll(`${parentSelector}[${idAttribute}="${itemId}"]`);
          itemsToDelete.forEach(itemToDelete => {
            itemToDelete.remove();
          });
        } else {
          item.remove();
        }
      }
    });
  });
}

function editTemplate(buttonSelector, itemSelector, editorTemplateSelector, itemTitleSelector, itemDescriptionSelector, isTask) {
  const editButtons = document.querySelectorAll(buttonSelector);
  const editorTemplate = document.querySelector(editorTemplateSelector);

  editButtons.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest(itemSelector);
      item.classList.add(`${itemSelector.slice(1)}--edit`);
      if (item) {
        const taskId = item.dataset.id;
        const title = item.querySelector(itemTitleSelector).textContent.trim();
        const description = item.querySelector(itemDescriptionSelector).textContent.trim();
        const editorForm = editorTemplate.content.cloneNode(true).querySelector('.task-editor');
        const titleField = editorForm.querySelector('[name="title_task"]');
        const descriptionField = editorForm.querySelector('[name="discription_task"]');
        const dateField = editorForm.querySelector('[name="data_task"]');
        const priorityField = editorForm.querySelector('[name="priority_task"]');
        const projectField = editorForm.querySelector('[name="project_task"]');
        const priorityLabel = editorForm.querySelector('.task-editor__priority-label');
        const submitButton = editorForm.querySelector('.task-editor__submit-btn');
        const errorFieldTitle = document.createElement('span');
        const errorFieldDescription = document.createElement('span');

        titleField.value = title;
        descriptionField.value = description;

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
        
        const svgUseElement = submitButton.querySelector('use');
        svgUseElement.setAttribute('href', 'icons/stack.svg#checkmark');

        submitButton.addEventListener('click', () => {
          validateInput(titleField, MAX_LENGTH_TITLE, errorFieldTitle, TextError.TITLE, submitButton);
          validateInput(descriptionField, MAX_LENGTH_DISC, errorFieldDescription, TextError.DISC, submitButton);

          if (titleField.classList.contains('has-error') || descriptionField.classList.contains('has-error')) {
            return;
          }

          const updatedTitle = titleField.value.trim();
          const updatedDescription = descriptionField.value.trim();

          item.querySelector(itemTitleSelector).textContent = updatedTitle;
          item.querySelector(itemDescriptionSelector).textContent = updatedDescription;

          if (isTask) {
            const updatedDate = dateField.value.trim();
            const updatedPriority = priorityField.value.trim();
            const updatedProject = projectField.value.trim();

            const tasksWithSameId = document.querySelectorAll(`.task[data-id="${taskId}"]`);
            tasksWithSameId.forEach(task => {
              task.querySelector('.task__title').textContent = updatedTitle;
              task.querySelector('.task__discription').textContent = updatedDescription;
              task.querySelector('.task__data').textContent = updatedDate;
              task.querySelector('.task__project').textContent = updatedProject;
              task.dataset.project = updatedProject;

              const taskCircle = task.querySelector('.task__circle');
              taskCircle.classList.remove('task__circle--priority1', 'task__circle--priority2', 'task__circle--priority3');
              if (updatedPriority === "Срочно") {
                  taskCircle.classList.add('task__circle--priority1');
              } else if (updatedPriority === "Важно") {
                  taskCircle.classList.add('task__circle--priority2');
              } else if (updatedPriority === "Второстепенно") {
                  taskCircle.classList.add('task__circle--priority3');
              }
            });
          }

          editorForm.classList.add('task-editor--hidden');
          editorForm.addEventListener('transitionend', function handleTransitionEnd() {
            item.classList.remove(`${itemSelector.slice(1)}--edit`);
            editorForm.remove();
            editorForm.removeEventListener('transitionend', handleTransitionEnd);
          }, { once: true });

          updateTasksVisibility();
          updateExpiredTasks();
          const selectedButtonElement = document.querySelector('.tasks__header-button--active');
          if (selectedButtonElement) {
              const selectedButton = selectedButtonElement.textContent.trim();
              updateTasksList(selectedButton);
          }
        });

        const managerItem = item.closest('.list, .projects__list').querySelector('.manager-item');
        managerItem.innerHTML = '';
        managerItem.appendChild(editorForm);
        editorForm.classList.add('task-editor--visible');

        const closeButton = editorForm.querySelector('.task-editor__close-btn');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            editorForm.classList.add('task-editor--hidden');
            editorForm.addEventListener('transitionend', function handleTransitionEnd() {
              item.classList.remove(`${itemSelector.slice(1)}--edit`);
              editorForm.remove();
              editorForm.removeEventListener('transitionend', handleTransitionEnd);
            }, { once: true });
          });
        }

        if (isTask) {
          const date = item.querySelector('.task__data').textContent.trim();
          const project = item.querySelector('.task__project').textContent.trim();
          const priority = item.querySelector('.task__circle').classList.contains('task__circle--priority1') ? 'Срочно' :
                           item.querySelector('.task__circle').classList.contains('task__circle--priority2') ? 'Важно' :
                           item.querySelector('.task__circle').classList.contains('task__circle--priority3') ? 'Второстепенно' : '';
          
          dateField.value = date;
          projectField.value = project;
          priorityField.value = priority;

          if (priority === "Срочно") {
            priorityLabel.classList.add('task-editor__priority-label--priority1');
          } else if (priority === "Важно") {
            priorityLabel.classList.add('task-editor__priority-label--priority2');
          } else if (priority === "Второстепенно") {
            priorityLabel.classList.add('task-editor__priority-label--priority3');
          }

          attachEventToPriorityInput(date);
        }
        
        attachEventToTextarea();
      }
    });
  });
}

function deleteTask() {
  deleteItem('.button-delete-task', '.task', 'data-id');
}

function deleteProject() {
  deleteItem('.button-delete-project', '.project');
}

function editTask() {
  editTemplate('.button-edit-task', '.task', '#task-editor', '.task__title', '.task__discription', true);
}

function editProject() {
  editTemplate('.button-edit-project', '.project', '#project-editor', '.project__title', '.project__discription', false);
}

export { deleteTask, editTask, deleteProject, editProject };