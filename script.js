const BASE_URL = "https://jsonplaceholder.typicode.com/todos/";
//HÄMTAR HEM REFERENSER FRÅN INDEX.HTML
const form = document.querySelector(".form");
const ul = document.querySelector(".list");
const li = document.querySelector(".listItem");
const button = document.querySelector(".btn");




//SKAPAR EN TOM LOKAL ARRAY
todosArray = []

//HÄMTAR DATAN FRÅN API:et OCH GÖR OM DET TILL EN JAVASCRIPTFIL
const getTodos = async () => {
    const res = await fetch ("https://jsonplaceholder.typicode.com/todos?_limit=7");
    const data = await res.json();
    //LOOPAR IGENOM ALL DATA MAN FÅR FRÅN API:et OCH PUSHAR IN DET I DET LOKALA ARRAYET = todosArray 
    // console.log(data)
    
    data.forEach(data => {
      todosArray.push(data)
  
    })

    
    const todoList = () => {
      ul.innerText = ""
      // FÖR VARJE TODO I todosArray 
      todosArray.forEach(todo => {
        // console.log(todo)
        /* FÖR VARJE ANVÄNDARE SÅ SKA JAG BYGGA IHOP ETT createElement,
        DÅ MÅSTE VI TA VARJE todo OCH LÄGGA IN DET I createElement FUNKTIONEN */
        const userElement = createTodoElement(todo)
        ul.appendChild(userElement)
      })
    }
    todoList() //KÖR todoList FUNKTIONEN
    
  }
  
  getTodos() //KÖR GET TODOS FUNKTIONEN


  const createTodoElement = (todoData) => {

    const li = document.createElement("li")
    li.id = todoData.id
    li.classList.add("listItem")
    li.classList.add("header")
    // li.innerText = todoData.userId
    
    const p = document.createElement("p")
    // p.innerText = todoData.completed

    const p2 = document.createElement("p")
    p2.innerText = todoData.title
  
    const button = document.createElement("button")
    button.classList.add("btn")
    button.innerText = "delete"


    //MODAL START

    // Create modal elements
const modal = document.createElement('div');
modal.classList.add('modal');

const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');
modalContent.innerText = "Please check the checkbox before proceeding!";

const closeButton = document.createElement('span');
closeButton.innerHTML = '&times;';
closeButton.classList.add('close');

// Add elements to modal
modalContent.appendChild(closeButton);
modal.appendChild(modalContent);

// Add modal to page
document.body.appendChild(modal);

// Show modal
modal.style.display = 'block';

// Close modal on close button click
closeButton.addEventListener('click', function() {
  modal.style.display = 'none';
});


    //MODAL END



    
    button.addEventListener("click", ( ) => {
      // Deletes a Todo
      if (!checkbox.checked) {
        modal.style.display = "block";
        return
        // alert("Please check the checkbox before proceeding.");
      }
        fetch(BASE_URL + todoData.id, {
        method: 'DELETE'
        }) 
        .then(res => {
          console.log(res)
          if(res.ok) {
            li.remove()
            const index = (todosArray.findIndex(todo => todo.id == todoData.id))
            todosArray.splice(index, 1)
            console.log(todosArray)
          }
        })
      
    })

    const checkbox = document.createElement("input")
    if(todoData.completed){
      checkbox.checked = true;
    }
    checkbox.type = "checkbox"
    checkbox.style.width = "30px";
    checkbox.style.height = "30px";
    checkbox.style.cursor = "pointer";

    checkbox.addEventListener("change", () => {

      fetch(BASE_URL + todoData.id, {
        method: "PATCH",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            completed: !todoData.completed
          })
      })
      .then(res => res.json())
      .then(data => {
        console.log(todoData) //så såg det ut, vi clickar på check och skickar då en förfrågan till databasen, jag vill uppdatera den här todon till det den inte är
        console.log(data) //Vi får tillbaka den uppdaterade versionen av todon, databasen svarar med det här
        todoData.completed = data.completed // Okej, jag vill nu uppdatera todoData, vill att vår lokala array ska matcha databasen
        console.log(todoData) // Såhär ser vår data nu ut efter vi uppdaterat den
        if(todoData.completed) {
          checkbox.checked = true;
        }else {
          checkbox.checked = false;
        }
      }) 
    })
   

    li.appendChild(button)
    li.appendChild(p)
    li.appendChild(p2)
    li.appendChild(checkbox)
    
     


    return li
  }




    // FORM VALIDERING
   const input = document.querySelector("input");
   const errormessage = document.querySelector(".errormessage");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "") {
    errormessage.innerText = "Formuläret får inte vara tomt!";
    errormessage.classList.add("errormessage");

    input.addEventListener("click", () => {
      errormessage.innerText = "";
      errormessage.classList.remove("errormessage");
    });
  }

  const newTodo = {
    completed: false ,
    title: document.querySelector("#todo").value,
  }

  if (input.value !== "") {
    fetch(BASE_URL, {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
      'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
      todosArray.push(json)
      const userElement = createTodoElement(json)
      ul.appendChild(userElement)
    });
  }
});





