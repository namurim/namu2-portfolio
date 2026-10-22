(() => {
  const dialogs = [...document.querySelectorAll('dialog.project-modal')];
  dialogs.forEach((dialog) => {
    const frames = [...dialog.querySelectorAll('iframe[data-project-video]')];
    const syncFrames = () => {
      frames.forEach((frame) => {
        if (dialog.open) {
          if (!frame.getAttribute('src')) {
            const url = new URL(frame.dataset.projectVideo);
            if (location.protocol === 'http:' || location.protocol === 'https:') {
              url.searchParams.set('origin', location.origin);
            }
            frame.referrerPolicy = 'strict-origin-when-cross-origin';
            frame.src = url.toString();
          }
        } else {
          frame.removeAttribute('src');
        }
      });
    };
    const observer = new MutationObserver(syncFrames);
    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });
    syncFrames();
  });
  const openLinkedProject = () => {
    const id = location.hash.slice(1);
    const dialog = dialogs.find((item) => item.id === id);
    if (!dialog || dialog.open) return;
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('modal-is-open');
  };
  openLinkedProject();
  window.addEventListener('hashchange', openLinkedProject);
})();
