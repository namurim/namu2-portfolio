(() => {
  const dialogs = [...document.querySelectorAll('dialog.detail-modal')];
  const close = (dialog) => dialog.close();
  document.querySelectorAll('[data-dialog]').forEach((button) => {
    button.addEventListener('click', () => {
      const dialog = document.getElementById(button.dataset.dialog);
      if (!dialog || dialog.open) return;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.body.classList.add('modal-is-open');
    });
  });
  dialogs.forEach((dialog) => {
    dialog.querySelector('.modal-close').addEventListener('click', () => close(dialog));
    let backdropPointerDown = false;
    dialog.addEventListener('pointerdown', (event) => {
      const rect = dialog.getBoundingClientRect();
      backdropPointerDown = event.target === dialog &&
        (event.clientX < rect.left || event.clientX > rect.right ||
         event.clientY < rect.top || event.clientY > rect.bottom);
    });
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom;
      if (backdropPointerDown && event.target === dialog && outside) close(dialog);
      backdropPointerDown = false;
    });
    dialog.addEventListener('close', () => {
      if (!dialogs.some((item) => item.open)) document.body.classList.remove('modal-is-open');
    });
  });
})();
