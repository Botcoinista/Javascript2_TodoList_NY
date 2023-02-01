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
    li.innerText = todoData.userId
    
    const p = document.createElement("p")
    // p.innerText = todoData.completed

    const p2 = document.createElement("p")
    p2.innerText = todoData.title
  
    const button = document.createElement("button")
    button.classList.add("btn")
    button.innerText = "delete"

     li.appendChild(p)
     li.appendChild(p2)
     li.appendChild(button)


    return li
  }

  const removeUser = e => {
  
  if(!e.target.classList.contains("header")) {
    console.log("klickade inte på header")
    return
  }
 
  fetch(BASE_URL + e.target.id, {
    method: 'DELETE'
  })
    .then(res => {
      console.log(res)
      if(res.ok) {
        e.target.remove()
        const index = (todosArray.findIndex(todo => todo.id == e.target.id))
        todosArray.splice(index, 1)
        console.log(todosArray)
      }
    })
}
  

 
  ul.addEventListener("click", removeUser)



const handleSubmit = e => {
  e.preventdefault()
  

}



    // FORM VALIDERING
    const input = document.querySelector("input");
    const errormessage = document.querySelector(".errormessage");
        
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (input.value === "") {
        errormessage.innerText = "Formuläret får inte vara tomt!";
        errormessage.classList.add("errormessage");
      }
      
      input.addEventListener("click", () => {
        errormessage.innerText = "";
        errormessage.classList.remove("errormessage");
      });
    
      const newTodo = {
        completed: false ,
        title: document.querySelector("#todo").value,
      }
      console.log(newTodo)
      
      
    });


  