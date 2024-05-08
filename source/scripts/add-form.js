import { attachEventToPriorityInput, attachEventToTextarea } from './task-edit.js';
import { newItems } from './const.js';

const MAX_LENGTH_TITLE = 100;
const MAX_LENGTH_DISC = 500;

const TextError = {
    TITLE: 'Длина заголовка не должна превышать 100 символов.',
    DISC: 'Длина описания не должна превышать 500 символов.'
};

const taskTemplate = document.querySelector('#task');
const projectTemplate = document.querySelector('#project');
const projectEditorTemplate = document.querySelector('#project-editor');
const taskEditorTemplate = document.querySelector('#task-editor');
const tasksLists = document.querySelectorAll('.list-with-tasks');
const projectLists = document.querySelectorAll('.projects__list');

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

                function validateInput(inputElement, maxLength, errorElement, errorMessage) {
                    const inputValue = inputElement.value.trim();

                    if (inputValue.length > maxLength) {
                        errorElement.textContent = errorMessage;
                        inputElement.classList.add('has-error');
                        submitButton.disabled = true;
                    } else {
                        errorElement.textContent = '';
                        inputElement.classList.remove('has-error');
                        submitButton.disabled = false;
                    }
                }

                function updateSubmitButtonAvailability() {
                    const isTitleFieldFilled = titleField.value.trim() !== '';
                    const isTitleFieldValid = !titleField.classList.contains('has-error');
                    const isDescriptionFieldValid = !descriptionField.classList.contains('has-error');
                    submitButton.disabled = !isTitleFieldFilled || !isTitleFieldValid || !isDescriptionFieldValid;
                }

                titleField.addEventListener('input', () => {
                    validateInput(titleField, MAX_LENGTH_TITLE, errorFieldTitle, TextError.TITLE);
                    updateSubmitButtonAvailability();
                });

                descriptionField.addEventListener('input', () => {
                    validateInput(descriptionField, MAX_LENGTH_DISC, errorFieldDescription, TextError.DISC);
                    updateSubmitButtonAvailability();
                });

                updateSubmitButtonAvailability();

                // Добавление обработчика события для кнопки "Добавить задачу"
                submitButton.addEventListener('click', () => {
                    validateInput(titleField, MAX_LENGTH_TITLE, errorFieldTitle, TextError.TITLE);
                    validateInput(descriptionField, MAX_LENGTH_DISC, errorFieldDescription, TextError.DISC);

                    if (titleField.classList.contains('has-error') || descriptionField.classList.contains('has-error')) {
                        return;
                    }

                    const title = titleField.value;
                    const description = descriptionField.value;

                    if (isProjectSection) {
                        projectLists.forEach(list => {
                            const project = projectTemplate.content.cloneNode(true);
                            const projectTitle = project.querySelector('.project__title');
                            const projectDescription = project.querySelector('.project__discription');

                            projectTitle.textContent = title;
                            projectDescription.textContent = description;

                            list.querySelector('.projects__list-wrapper').appendChild(project);
                        });
                    } else {
                        tasksLists.forEach(list => {
                            const task = taskTemplate.content.cloneNode(true);
                            const taskTitle = task.querySelector('.task__title');
                            const taskDescription = task.querySelector('.task__discription');
                            const taskDate = task.querySelector('.task__data');
                            const taskProject = task.querySelector('.task__project');
                            const taskCircle = task.querySelector('.task__circle');
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

                            if (priority === "Срочно") {
                                taskCircle.classList.add('task__circle--priority1');
                            } else if (priority === "Важно") {
                                taskCircle.classList.add('task__circle--priority2');
                            } else if (priority === "Второстепенно") {
                                taskCircle.classList.add('task__circle--priority3');
                            }

                            list.querySelector('.list-with-tasks__wrapper').appendChild(task);
                        });
                    }

                    editorForm.reset();
                    updateSubmitButtonAvailability();
                });

                if (!isProjectSection) {
                    attachEventToPriorityInput();
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
