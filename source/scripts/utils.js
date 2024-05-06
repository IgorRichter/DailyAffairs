const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydown = (callback) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

const sidebar = document.querySelector('.sidebar');

export { isEscapeKey, onDocumentKeydown, sidebar }