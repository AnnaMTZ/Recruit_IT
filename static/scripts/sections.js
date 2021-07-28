const toDoSectionLink = document.getElementById('toDoSectionLink');
const candidateSectionLink = document.getElementById('candidateSectionLink');
const toDoList = document.getElementById('to-do-list');
const cvList = document.getElementById('cv-list');

toDoSectionLink.addEventListener('click', () => {
    cvList.classList.add('hide');
    toDoList.classList.remove('hide');
});

candidateSectionLink.addEventListener('click', () => {
    toDoList.classList.add('hide');
    cvList.classList.remove('hide');
});