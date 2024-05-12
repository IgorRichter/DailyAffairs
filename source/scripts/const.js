const sidebar = document.querySelector('.sidebar');
const newItems = document.querySelectorAll('.new-item');

const MAX_LENGTH_TITLE = 100;
const MAX_LENGTH_DISC = 500;

const TextError = {
    TITLE: 'Длина заголовка не должна превышать 100 символов.',
    DISC: 'Длина описания не должна превышать 500 символов.'
};

export { sidebar, newItems, MAX_LENGTH_TITLE, MAX_LENGTH_DISC, TextError };