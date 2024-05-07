import { attachEventToPriorityInput } from './task-edit.js';
import { newItems } from './const.js';

const taskTemplate = document.querySelector('#task-editor');
const projectTemplate = document.querySelector('#project-editor');

newItems.forEach(newItem => {
    const newItemButton = newItem.querySelector('.new-item__task');
    const section = newItem.closest('.list');
    const isProjectSection = section && section.classList.contains('projects__list');

    // Обработчик клика по кнопке "Добавить задачу/проект"
    newItemButton.addEventListener('click', () => {
        const templateToUse = isProjectSection ? projectTemplate : taskTemplate;
        const editor = templateToUse.content.cloneNode(true);
        const editorForm = editor.querySelector('.task-editor');

        if (editorForm && section) {
            const managerItem = section.querySelector('.manager-item');
            if (managerItem) {
                managerItem.innerHTML = '';
                managerItem.appendChild(editor);
                editorForm.classList.add('task-editor--visible');
                newItem.classList.add('new-item--disabled');
                
                if (!isProjectSection) {
                    attachEventToPriorityInput();
                }
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