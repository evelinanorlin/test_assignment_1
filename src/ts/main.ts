import { addTodo, changeTodo, removeAllTodos } from "./functions";
import { Todo } from "./models/Todo";


// skapar lista med items som stoppas in i listan i appen
let todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

// tar bort alla todos när man trycker på "rensa lista"
document.getElementById("clearTodos")?.addEventListener("click", () => {
  clearTodos(todos);
});

// tar texten i input och kör igång createNewTodo när en trycker på "skapa"-knappen
(document.getElementById("newTodoForm") as HTMLFormElement)?.addEventListener(
  "submit",
  (e: SubmitEvent) => {
    e.preventDefault();

    let todoText: string = (
      document.getElementById("newTodoText") as HTMLInputElement
    ).value;
    console.log("Todos when creating", todos);

    createNewTodo(todoText, todos);
  }
);

// pushar in todon i listan och kör createHtml() om allt stämmer. Måste vara
// 3 bokstäver minst
export function createNewTodo(todoText: string, todos: Todo[]) {
  let result = addTodo(todoText, todos);

  if (result.success) {
    createHtml(todos);
  } else {
    displayError(result.error, true);
  }
}

// Skapar UL med alla todosen i listan.
function createHtml(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));

  let todosContainer: HTMLUListElement = document.getElementById(
    "todos"
  ) as HTMLUListElement;

  todosContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    let li: HTMLLIElement = document.createElement("li");

    if (todos[i].done) {
      li.classList.add("todo__text--done");
    }

    li.classList.add("todo__text");
    li.innerHTML = todos[i].text;
    li.addEventListener("click", () => {
      toggleTodo(todos[i]);
    });

    todosContainer.appendChild(li);
  }
}

// Gör texten överstyken
function toggleTodo(todo: Todo) {
  changeTodo(todo);   // boolean, changes to flse or true
  createHtml(todos); // skapar html av listan, lägger till klassen todo__text--done om den är klickad på
}

// skapar sträng under input om det är för få bokstäver, genom att lägga till eller ta bort klassen show.
// "error-texten" genereras i addTodo()
function displayError(error: string, show: boolean) {
  let errorContainer: HTMLDivElement = document.getElementById(
    "error"
  ) as HTMLDivElement;

  errorContainer.innerHTML = error;

  if (show) {
    errorContainer.classList.add("show");
  } else {
    errorContainer.classList.remove("show");
  }
}


//tar bort alla todos och genererar ny HTML 
function clearTodos(todos: Todo[]) {
  removeAllTodos(todos);
  createHtml(todos);
}

//antar att denna könner vad so ligger lagrat när sidan laddas in
createHtml(todos);
