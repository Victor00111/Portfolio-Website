// Show respective projects when button is clicked on
const personalButton = document.getElementById('personalButton');
const schoolButton = document.getElementById('schoolButton');
const personalProjects = document.getElementById('personalProjects');
const schoolProjects = document.getElementById('schoolProjects');

personalButton.addEventListener('click', function() {
  personalProjects.style.display = 'block';
  schoolProjects.style.display = 'none';
});

schoolButton.addEventListener('click', function() {
  personalProjects.style.display = 'none';
  schoolProjects.style.display = 'block';
});