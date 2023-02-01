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
    button.addEventListener("click", ( )=>{
      fetch(BASE_URL + todoData.id, {
        method: 'DELETE'
      })
        .then(res => {
          // console.log(res)
          if(res.ok) {
            li.remove()
            const index = (todosArray.findIndex(todo => todo.id == todoData.id))
            todosArray.splice(index, 1)
            // console.log(todosArray)
          }
        })
    } )

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
    // const label = document.createElement("label");
    // label.innerHTML = "ready";


    li.appendChild(button)
    li.appendChild(p)
    li.appendChild(p2)
    li.appendChild(checkbox)
    // li.appendChild(label)
     


    return li
  }

//   const removeUser = e => {
  
//   if(!e.target.classList.contains("header")) {
//     console.log("Du klickade inte på headern")
//     return
//   }
 
//   fetch(BASE_URL + e.target.id, {
//     method: 'DELETE'
//   })
//     .then(res => {
//       // console.log(res)
//       if(res.ok) {
//         e.target.remove()
//         const index = (todosArray.findIndex(todo => todo.id == e.target.id))
//         todosArray.splice(index, 1)
//         // console.log(todosArray)
//       }
//     })
// }
  

 
  // ul.addEventListener("click", removeUser)



    // FORM VALIDERING
    const input = document.querySelector("input");
    const errormessage = document.querySelector(".errormessage");
        
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (input.value === "") {
        errormessage.innerText = "Formuläret får inte vara tomt!";
        errormessage.classList.add("errormessage");
        return
      }
      
      input.addEventListener("click", () => {
        errormessage.innerText = "";
        errormessage.classList.remove("errormessage");
        return
      });
    
      const newTodo = {
        completed: false ,
        title: document.querySelector("#todo").value,
      }
      // console.log(newTodo)
      
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


    })