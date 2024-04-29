function openNavMenu() {
  const mobileListOfLinks = document.getElementById('mobileListOfLinks');
  mobileListOfLinks.style.display = 'block';
}

function closeNavMenu() {
  const mobileListOfLinks = document.getElementById('mobileListOfLinks');
  mobileListOfLinks.style.display = 'none';
}

function filterClass(element) {
  const allElements = document.querySelectorAll('.h3InsideClass');
  allElements.forEach((el) => {
    el.classList.remove('mainClass');
  });
  element.classList.add('mainClass');
}