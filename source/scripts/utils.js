const isEscapeKey = (evt) => evt.key === 'Escape';

const onDocumentKeydown = (callback) => (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callback();
  }
};

export { isEscapeKey, onDocumentKeydown }