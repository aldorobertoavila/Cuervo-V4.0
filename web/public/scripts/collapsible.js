const collapsibles = document.querySelectorAll('.collapsible-content-section');

collapsibles.forEach(collapsible => {
  const header = collapsible.querySelector('.collapsible-content-section__header');
  const content = collapsible.querySelector('.collapsible-content-section__body');
  const footer = collapsible.querySelector('.collapsible-content-section__footer');

  const toggleContent = () => {
    collapsible.classList.toggle('active');

    if (collapsible.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
      content.style.opacity = '1';
    } else {
      content.style.maxHeight = '0';
      content.style.opacity = '0';
    }
  };

  header.addEventListener('click', toggleContent);
  footer.addEventListener('click', toggleContent);

  if (collapsible.classList.contains('active')) {
    content.style.maxHeight = content.scrollHeight + 'px';
    content.style.opacity = '1';
  }
});
