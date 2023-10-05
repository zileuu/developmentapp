const navigationBar = document.querySelectorAll('[data-nav-list]');
const addtaskButton = document.querySelector('.task-list__add-task');
const taskModal = document.querySelector('.task__modal-box');
const closetaskModal = document.querySelector('.close');
//Adding task into the list
const addtaskToList = document.querySelector('#add-task');
const taskList = document.querySelector('.task-system__task-list');
const selectGenre = document.querySelector('#task-genre');
const genreLogo = document.querySelector('.add-task__genre-image');
//Removing the empty message display
const emptyMessage = document.querySelector('.task-list__empty-item');

//Add task into the list
const addtask = () => {
    //Create a new item
    const newtaskItem = document.createElement('div');
    newtaskItem.className = 'task-list__task-item';

    //Place of task description container
    const newtaskDescriptionContainer = document.createElement('div');
    newtaskDescriptionContainer.className = 'task-description';

    //Place of trash bin for delete
    const trashBin = document.createElement('div');
    trashBin.className = 'trash-icon';
    trashBin.innerHTML = '<i class="fas fa-trash-alt fa-2x"></i>';
    trashBin.addEventListener('click', () => {
       taskList.removeChild(newtaskItem);
       //Display empty message
       displayEmptyMessage();
    }); 

    //Place of logo
    const newtaskLogo = document.createElement('div');
    newtaskLogo.className = 'task-logo';
    newtaskLogo.innerHTML = changetaskLogo();
    
    //task title
    const newtaskTitle = document.createElement('h2');
    newtaskTitle.textContent = document.querySelector('#task-name').value;

    //task genre
    const newtaskGenre = document.createElement('div');
    newtaskGenre.classList = 'task-genre';
    newtaskGenre.textContent = document.querySelector('#task-genre').value;

    //task rating
    const newtaskRating = document.createElement('div');
    newtaskRating.className = 'task-rating';
    newtaskRating.innerHTML = changetaskRating();

    //task description
    const newtaskDescription = document.createElement('p');
    newtaskDescription.textContent = document.querySelector('#task-description').value;

    //Validation in the add task form
    if(validation(
        document.querySelector('#task-name'), 
        document.querySelector('#task-genre'), 
        document.querySelector('#task-rating'), 
        document.querySelector('#task-description')
    )) {
        taskModal.style.display = 'block';
        return;
    }

    //Append the description information inside the container
    newtaskDescriptionContainer.appendChild(newtaskTitle);
    newtaskDescriptionContainer.appendChild(newtaskGenre);
    newtaskDescriptionContainer.appendChild(newtaskRating);
    newtaskDescriptionContainer.appendChild(newtaskDescription);

    //Append the container
    newtaskItem.appendChild(trashBin);
    newtaskItem.appendChild(newtaskLogo);
    newtaskItem.appendChild(newtaskDescriptionContainer)

    //Add the task list into the container
    taskList.appendChild(newtaskItem);

    //Close modal as the item is listed
    taskModal.style.display = 'none';
    clearFormat(document.querySelector('#task-name'), 
        document.querySelector('#task-genre'), 
        document.querySelector('#task-rating'), 
        document.querySelector('#task-description')
    );

    //Remove empty message
    displayEmptyMessage();
}

//Change the logo of task according to genre
//Change the logo of task according to genre
const changetaskLogo = () => {
    const genreLogo = document.querySelector('#task-genre').value;
    switch(genreLogo) {
        case 'University':
            return '<i class="fas fa-pencil-alt"></i>'; // University icon for Action genre
        case 'Job':
            return '<i class="fas fa-briefcase fa-7x"></i>'; // Job icon for Comedy genre
        case 'House':
            return '<i class="fas fa-home fa-7x"></i>'; // House-hold icon for Drama genre
        case 'Home-Work':
            return '<i class="fas fa-book fa-7x"></i>'; // Home-work icon for Horror genre
        case 'Gym':
            return '<i class="fas fa-dumbbell fa-7x"></i>'; // Gym icon for Romance genre
        default:
            return '';
    }
}

//Change the task ratings
const changetaskRating = () => {
    const rating = document.querySelector('#task-rating').value;
    const remainingStar = 5 - rating;
    let starRatings = '';
    for(let i = 0; i < rating; i++) {
        starRatings += '<i class="fas fa-star" style="margin-right: 4px"></i>';
    }
    for(let i = 0; i < remainingStar; i++) {
        starRatings += '<i class="far fa-star" style="margin-right: 4px"></i>';
    }
    return starRatings;
}

//Validation of forms
const validation = (title, genre, rating, description) => {
    let hasErrors = false; 
    //Naming validation
    if(title.value === undefined || title.value === '') {
        title.style.borderColor = 'red';
        hasErrors = true;
    }
    else {
        title.style.borderColor = 'white';
    }

    //Genre validation
    if(genre.options[genre.selectedIndex].value === 'None') {
        genre.style.borderColor = 'red';
        hasErrors = true;
    }
    else {
        genre.style.borderColor = 'white';
    }

    //Rating validation
    if(rating.options[rating.selectedIndex].value === 'None') {
        rating.style.borderColor = 'red';
        hasErrors = true;
    }
    else {
        rating.style.borderColor = 'white';
    }

    //Description validation
    if(description.value === undefined || description.value === '') {
        description.style.borderColor = 'red';
        hasErrors = true;
    }
    else {
        description.style.borderColor = 'white';
    }

    //Return if it has errors
    return hasErrors;
}

//Clear error formatting as the task item is sent
const clearFormat = (title, genre, rating, description) => {
    //Remove image 
    genreLogo.innerHTML ='';

    //Default border colors
    title.style.borderColor = 'white';
    genre.style.borderColor = 'white';
    rating.style.borderColor = 'white';
    description.style.borderColor = 'white';

    //Clear all values
    title.value = '';
    genre.value = 'None';
    rating.value = 'None';
    description.value = '';
}

//Whether to display the empty message or not depending on the number of tasks
const displayEmptyMessage = () => taskList.childElementCount <= 2 ? emptyMessage.style.display = 'block' : emptyMessage.style.display = 'none';


//Filter out all tasks by genre
const filtertasks = chosenGenre => {
    const taskItem = Array.from(document.querySelectorAll('.task-list__task-item'));
    let selectedGenre = [];

    taskItem.forEach(task => task.style.display = 'flex');
    switch(chosenGenre) {
        case 'University':
            selectedGenre = taskItem.filter(task => task.children[2].children[1].textContent !== 'University');
            break;
        case 'Job':
            selectedGenre = taskItem.filter(task => task.children[2].children[1].textContent !== 'Job');
            break;
        case 'House':
            selectedGenre = taskItem.filter(task => task.children[2].children[1].textContent !== 'House');
            break;
        case 'Home-Work':
            selectedGenre = taskItem.filter(task => task.children[2].children[1].textContent !== 'Home-Work');
            break;
        case 'Gym':
            selectedGenre = taskItem.filter(task => task.children[2].children[1].textContent !== 'Gym');
            break;
        default:
            break;
    }
    selectedGenre.forEach(task => task.style.display = 'none');
}

//Navigation bar setting to active whenever clicked
navigationBar.forEach(navigation => {
    navigation.addEventListener('click', e => {
        filtertasks(navigation.textContent);
        const active = document.querySelector('.active');
        active.classList.remove('active');
        navigation.classList.add('active');
    });
});

//For opening of modal box
addtaskButton.addEventListener('click', () => {
    taskModal.style.display = 'block';
});

//When closing of modal box through x icon
closetaskModal.addEventListener('click', () => {
    taskModal.style.display = 'none';
});

//Add task modal submit button
addtaskToList.addEventListener('click', e => {
    addtask(); //Add tasks
});

//Selecting genre and changing its logo in modal 
selectGenre.addEventListener('change', e => {
    genreLogo.innerHTML = changetaskLogo();
});

//Whenever the user clicks outside the modal
window.addEventListener('click', e => {
    if(e.target === taskModal) { //If the user clicks outside the modal content
        taskModal.style.display = 'none';
    }
});