let filterCodes = {
  red: "#e74c3c",
  blue: "#3498db",
  green: "#2ecc71",
  black: "#34495e",
};

// this is the default filter selected for tickets !!!
let selectedFilter = "black";

let allFilters = document.querySelectorAll(".ticket-filters div");
let ticketContainer = document.querySelector(".tickets-container");
let openModalBtn = document.querySelector(".open-modal");
let closeModalBtn = document.querySelector('.close-modal');

function loadTickets() {
  ticketContainer.innerHTML = "";

  if(localStorage.getItem('allTickets')) {
    let allTickets = JSON.parse(localStorage.getItem('allTickets'));

    for(let i = 0; i < allTickets.length; i++) {
      //object destructuring
      let ticketObject = allTickets[i];
      // console.log(ticketObject);
      // create a div and add class ticket to it
      let ticketDiv = document.createElement("div");
      //get an unique ID
      ticketDiv.classList.add("ticket");
      // set the html of the ticket wala div !!
      ticketDiv.innerHTML = ` <div class="ticket-filter ${ticketObject.ticketFilter}"></div>
      <div class="ticket-info">
      <div class="ticket-id">#${ticketObject.ticketId}</div>
      <div class="ticket-delete">
        <i class="fas fa-trash" id = ${ticketObject.ticketId}></i>
      </div>
      </div>
      <div class="ticket-content">${ticketObject.ticketContent}</div>`;

      // append the ticket on the UI !!!!
      ticketContainer.append(ticketDiv);

      ticketDiv.querySelector('.ticket-delete i').addEventListener("click", handleTicketDelete);
      ticketDiv.querySelector('.ticket-filter').addEventListener("click", toggleTicketFilter);
    }
  }
}
loadTickets();

openModalBtn.addEventListener("click", handleOpenModal);
closeModalBtn.addEventListener("click", handleCloseModal);

function toggleTicketFilter(e) {
  console.log(e);
  let currentFilter = e.target.classList[1];
  let filters = ["red" , "blue" , "green" , "black"];

  let idx = filters.indexOf(currentFilter);
  idx++;
  idx = idx % filters.length;

  let currentTicket = e.target;
  currentTicket.classList.remove(currentFilter);
  currentTicket.classList.add(filters[idx]);

  let allTickets = JSON.parse(localStorage.getItem("allTickets"));
  let id = currentTicket.nextElementSibling.children[0].textContent.split("#")[1];
  console.log(id);

  for(let i=0 ; i<allTickets.length ; i++){
    if(allTickets[i].ticketId == id){
      allTickets[i].ticketFilter = filters[idx];
      break;
    }
  }

  localStorage.setItem("allTickets" , JSON.stringify(allTickets));
}

function handleTicketDelete(e) {
  let confirmation = window.prompt("You Want to delete it or not");
  if(confirmation == "Yes" || confirmation == "yes") {
    let ticketToBeDeleted = e.target.id;

    let allTickets = JSON.parse(localStorage.getItem("allTickets"));

    let filteredTickets = allTickets.filter(function(ticketObject) {
      return ticketObject.ticketId != ticketToBeDeleted;
    });

    localStorage.setItem("allTickets", JSON.stringify(filteredTickets));

    loadTickets();
  }
}

function handleCloseModal(e) {
  if(document.querySelector(".modal")){
    document.querySelector(".modal").remove();
  }
}

function handleOpenModal(e) {
  let modal = document.querySelector(".modal");
  // if modal already exists in document then return !!
  if (modal) {
    return;
  }
  // else created a div with class modal
  let modalDiv = createModal();
  // to empty modal text box add a click event on modal text box
  modalDiv
    .querySelector(".modal-textbox")
    .addEventListener("click", clearModalTextBox);

  // to add ticket when pressing enter in the modal text box !!!  
  modalDiv
    .querySelector(".modal-textbox")
    .addEventListener("keypress", addTicket);

  // get all modal filters  
  let allModalFilters = modalDiv.querySelectorAll(".modal-filter");

  for (let i = 0; i < allModalFilters.length; i++) {
    // add a click event on every modal filter
    allModalFilters[i].addEventListener("click", chooseModalFilter);
  }


  // append modalDiv on the ui !!
  ticketContainer.append(modalDiv);
}

function createModal() {
  let modalDiv = document.createElement("div");
  modalDiv.classList.add("modal");
  modalDiv.innerHTML = `<div class="modal-textbox" data-typed="false" contenteditable="true">
  Enter your task here
 </div>
<div class="modal-filter-options">
  <div class="modal-filter red"></div>
  <div class="modal-filter blue"></div>
  <div class="modal-filter green"></div>
  <div class="modal-filter black active-filter"></div>
</div>`;
  return modalDiv;
}

function chooseModalFilter(e) {
  // get the filter name which is clicked !!!
  let selectedModalFilter = e.target.classList[1];

  // check if the clicked filter name is equals to the default filter(already selected filter) if true then go back !!!
  if (selectedModalFilter == selectedFilter) {
    return;
  }
  // set selected filter as the now choose filter !!!
  selectedFilter = selectedModalFilter;
  // remove active filter class
  document.querySelector(".modal-filter.active-filter").classList.remove("active-filter");
  // add active filter class on now selected filter 
  e.target.classList.add("active-filter");
}

function addTicket(e) {
  if (e.key == "Enter") {
    // get the content of the modal text box !!
    let modalText = e.target.textContent;
    // create a div and add class ticket to it
    let ticketDiv = document.createElement("div");
    //get an unique ID
    let ticketId = uid();
    ticketDiv.classList.add("ticket");
    // set the html of the ticket wala div !!
    ticketDiv.innerHTML = ` <div class="ticket-filter ${selectedFilter}"></div>
    <div class="ticket-info">
      <div class="ticket-id">#${ticketId}</div>
      <div class="ticket-delete" tId = ${ticketId}>
        <i class="fas fa-trash" id=${ticketId}></i>
      </div>
    </div>
    <div class="ticket-content">${modalText}</div>`;

    // append the ticket on the UI !!!!
    ticketContainer.append(ticketDiv);

    ticketDiv.querySelector('.ticket-delete i').addEventListener("click", handleTicketDelete);
    ticketDiv.querySelector('.ticket-filter').addEventListener("click", toggleTicketFilter);

    // remove the modal from the ui !!!
    e.target.parentNode.remove();

    //ticket has been appended
    if(!localStorage.getItem("allTickets")) {
      let allTickets = [];

      let ticketObject = {};
      ticketObject.ticketId = ticketId;
      ticketObject.ticketFilter = selectedFilter;
      ticketObject.ticketContent = modalText;

      allTickets.push(ticketObject);

      localStorage.setItem('allTickets', JSON.stringify(allTickets));
    }
    else {
      let allTickets = JSON.parse(localStorage.getItem('allTickets'));
      
      let ticketObject = {};
      ticketObject.ticketId = ticketId;
      ticketObject.ticketFilter = selectedFilter;
      ticketObject.ticketContent = modalText;

      allTickets.push(ticketObject);

      let temp = JSON.stringify(allTickets);

      localStorage.setItem('allTickets', temp);
    }
    
    // again set by default filter as black !!!
    selectedFilter = "black";
  }
}

function clearModalTextBox(e) {
  if (e.target.getAttribute("data-typed") == "true") {
    return;
  }
  e.target.innerHTML = "";
  e.target.setAttribute("data-typed", "true");
}

// [ <div></div> ,<div></div> ,<div></div> ,<div></div>  ];
for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", chooseFilter);
}

function chooseFilter(e) {
  if(e.target.classList.contains('active-filter')) {
    e.target.classList.remove('active-filter');
    loadTickets();
    return;
  }

  if(document.querySelector('.filter.active-filter')) {
    document.querySelector('.filter.active-filter').classList.remove('active-filter');
  }
  // let filter = e.target.classList[1];
  e.target.classList.add('active-filter');
  let ticketFilter = e.target.classList[1];

  loadSelectedTickets(ticketFilter);
  // let filterCode = filterCodes[filter];
  // ticketContainer.style.background = filterCode;
}

function loadSelectedTickets(ticketFilter) {
  if(localStorage.getItem("allTickets")){
    let allTickets = JSON.parse(localStorage.getItem("allTickets"));
    
    let filteredTickets = allTickets.filter( function(filterObject){
      return filterObject.ticketFilter == ticketFilter;
    });

    // empty tickets container
    ticketContainer.innerHTML = "";

    for(let i = 0; i < filteredTickets.length; i++) {
      let {ticketId, ticketFilter, ticketContent} = filteredTickets[i];

      // create a div and add class ticket to it
      let ticketDiv = document.createElement("div");
      //get an unique ID
      ticketDiv.classList.add("ticket");
      // set the html of the ticket wala div !!
      ticketDiv.innerHTML = `<div class="ticket-filter ${ticketFilter}"></div>
      <div class="ticket-info">
      <div class="ticket-id">#${ticketId}</div>
      <div class="ticket-delete" tId = ${ticketId}>
      <i class="fas fa-trash" id=${ticketId}></i>
      </div>
      </div>
      <div class="ticket-content">${ticketContent}</div>`;

      // append the ticket on the UI !!!!
      ticketContainer.append(ticketDiv);
      
      ticketDiv.querySelector('.ticket-delete i').addEventListener("click", handleTicketDelete);
    }
  }
}