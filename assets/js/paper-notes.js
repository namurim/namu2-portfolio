(() => {
  document.querySelectorAll('dialog.paper-note-modal').forEach((dialog) => {
    const frame = dialog.querySelector('iframe[data-video-src]');
    if (!frame) return;
    const observer = new MutationObserver(() => {
      if (dialog.open) {
        if (!frame.getAttribute('src')) frame.src = frame.dataset.videoSrc;
      } else {
        frame.removeAttribute('src');
      }
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });
  });
})();
