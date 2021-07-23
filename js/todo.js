// LISTA ZMIENNYCH GLOBALNYCH !

let $todoInput;  //tu użytkownik wpisuje treść zadania
let $alertInfo; // info o braku zadań / konieczności dodania notatki
let $addBtn; // przycisk ADD - dodaje nowe elementy do listy
let $ulList; // nasza lista zadań, tagi <ul></ul>
let $newTask; // nowo dodane LI, nowe zadanie !

let $popup; //pobrany popup
let $popupInfo; // alert w popupie, jak sie doda pusty tekst
let $editedTodo; // edytowany Todo
let $popupInput;  //tekst wpisywany w inputa w popup'ie
let $addPopupBtn; // przycisk "zatwiedź" w popup'ie
let $closeTodoBtn; //przycisk od zamykania popup'a
let $idNumber = 0;

const main = () => {
    prepareDOMElements ();
    prepareDOMEvents ();
};

// pobieramy nasze elementy (wsztstkie querySelectory)
const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.todoList ul');
   
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
};

// nadajemy nasłuchiwanie
const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
};



const addNewTask = () => {
    if ( $todoInput.value !== '') { //tutaj funkcja sprawdza czy treść jest różna od pustego stringa
       $idNumber++; 
       $newTask = document.createElement('li'); // tutaj funkcja dodaje nowy element ! 
       $newTask.innerText = $todoInput.value;
       $newTask.setAttribute('id', `todo-$($idNumber)`);
       $ulList.appendChild($newTask);

       $todoInput.value = '';
       $alertInfo.innerText = '';
       createToolsArea();
    } else {
        $alertInfo.innerText = 'Wpisz treść zadania !';
    }
};

const createToolsArea = () => { //tworzymy funkcję dodające 4 NOWE elementy !
    const toolsPanel = document.createElement ('div');
    toolsPanel.classList.add('tools');
    $newTask.appendChild(toolsPanel);

    const completeBtn = document.createElement ('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    const editBtn = document.createElement ('button');
    editBtn.classList.add('edit');
    editBtn.innerText = 'EDIT';
    
    const deleteBtn = document.createElement ('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
};

const checkClick = (e) => { // tutaj piszę funkcję która będzie sprawdzać który przycisk został kliknięty !  
    if (e.target.closest('button').classList.contains('complete')) {
        e.target.closest('li').classList.toogle('completed');
        e.target.closest('button').classList.toogle('completed');

    } else if (e.target.closest('button').className === 'edit') {
        editTask(e);
    } else if (e.target.closest('button').className === 'delete')
        deleteTask(e);
};
// e.target - jest równoznaczny z nasłuchiwaniem na 'click' ! 

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;

    $popup.style.display = 'flex';
};

const closePopup = () => {
    $popup.style.display = 'none';
}

const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
};

document.addEventListener('DOMContentLoaded', main); // zamiast "mouseover" np. = my w tym zapisie czekamy az cala strona się wczyta ! 
