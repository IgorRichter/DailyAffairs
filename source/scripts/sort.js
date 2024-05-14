import { parseDate } from './utils.js';

const dashboardList = document.querySelector('.dashboard .list-with-tasks__wrapper');
const tasksList = document.querySelector('.tasks .list-with-tasks__wrapper');
const projectTasksList = document.querySelector('.projects-task .list-with-tasks__wrapper');

const selectControlDashboard = document.querySelector('.dashboard__select-control');

selectControlDashboard.addEventListener('change', function () {
    const selectedValue = selectControlDashboard.value;

    if (selectedValue === 'priority') {
        sortByPriority(dashboardList);
    } else if (selectedValue === 'name') {
        sortByName(dashboardList);
    } else {
        sortByDataOrder(dashboardList);
    }
});

const selectControlTasks = document.querySelector('.tasks__select-control');

selectControlTasks.addEventListener('change', function () {
    const selectedValue = selectControlTasks.value;

    if (selectedValue === 'priority') {
        sortByPriority(tasksList);
    } else if (selectedValue === 'name') {
        sortByName(tasksList);
    } else if (selectedValue === 'date') {
        sortByDate(tasksList);
    } else {
        sortByDataOrder(tasksList);
    }
});



const selectControlProjectTasks = document.querySelector('.projects-task-control');

selectControlProjectTasks.addEventListener('change', function () {
    const selectedValue = selectControlProjectTasks.value;

    if (selectedValue === 'priority') {
        sortByPriority(projectTasksList);
    } else if (selectedValue === 'name') {
        sortByName(projectTasksList);
    } else if (selectedValue === 'date') {
        sortByDate(projectTasksList);
    } else {
        sortByDataOrder(projectTasksList);
    }
});

function sortByPriority(list) {
    const tasks = Array.from(list.querySelectorAll('li'));
    tasks.sort((a, b) => {
        const priorityA = getPriorityOrder(a.querySelector('.task__circle'));
        const priorityB = getPriorityOrder(b.querySelector('.task__circle'));
        return priorityA - priorityB;
    });
    tasks.forEach(task => list.appendChild(task));
}

function sortByName(list) {
    const tasks = Array.from(list.querySelectorAll('li'));
    tasks.sort((a, b) => {
        const titleA = a.querySelector('.task__title').textContent.toLowerCase();
        const titleB = b.querySelector('.task__title').textContent.toLowerCase();
        return titleA.localeCompare(titleB);
    });
    tasks.forEach(task => list.appendChild(task));
}

function sortByDataOrder(list) {
    const tasks = Array.from(list.querySelectorAll('li'));
    tasks.sort((a, b) => {
        const orderA = parseInt(a.dataset.order);
        const orderB = parseInt(b.dataset.order);
        return orderA - orderB;
    });
    tasks.forEach(task => list.appendChild(task));
}

function sortByDate(list) {
    const tasks = Array.from(list.querySelectorAll('li'));
    tasks.sort((a, b) => {
        const dateA = parseDate(a.querySelector('.task__data').textContent);
        const dateB = parseDate(b.querySelector('.task__data').textContent);
        return dateA - dateB;
    });
    tasks.forEach(task => list.appendChild(task));
}

function getPriorityOrder(circleElement) {
    const priorityOrder = {
        'task__circle--priority1': 1, // Срочно
        'task__circle--priority2': 2, // Важно
        'task__circle--priority3': 3, // Второстепенно
        'task__circle': 4 // Без приоритета
    };

    const priorityClass = Array.from(circleElement.classList).find(className =>
        className.startsWith('task__circle--priority')
    );

    return priorityClass ? priorityOrder[priorityClass] : priorityOrder['task__circle'];
}