import { attachEventToPriorityInput } from './task-edit.js';

const newItems = document.querySelectorAll('.new-item');
const taskTemplate = document.querySelector('#task-editor');

newItems.forEach(newItem => {
    const newItemButton = newItem.querySelector('.new-item__task');

    newItemButton.addEventListener('click', () => {
        const taskEditor = taskTemplate.content.cloneNode(true);
        const taskEditorForm = taskEditor.querySelector('.task-editor');

        if (taskEditorForm) {
          const section = newItem.closest('.list');
          if (section) {
            const managerItem = section.querySelector('.manager-item');
            if (managerItem) {
              managerItem.innerHTML = '';
              managerItem.appendChild(taskEditor);
              taskEditorForm.classList.add('task-editor--visible');
              newItem.classList.add('new-item--disabled');
              attachEventToPriorityInput();
            }
          }
        }

        const closeButton = taskEditorForm.querySelector('.task-editor__close-btn');
        if (closeButton) {
          closeButton.addEventListener('click', () => {
            taskEditorForm.classList.add('task-editor--hidden');
        
            taskEditorForm.addEventListener('transitionend', function() {
                taskEditorForm.remove();
                newItem.classList.remove('new-item--disabled');
            }, { once: true });
          });
        }
    });
});