import { Todo } from "./models/Todo";
import { createNewTodo } from "./main";



// ANONYM FUNKTION 1
// förväntad funktion: Alla todos försvimner när en trycker på "rensa lista"


// ANONYM FUNKTION 2
// förväntad funktion: Antingen visas todon i listan, eller så visas ett error.
// körs när en trycker på "Skapa"


// FUNKTION 3  function createNewTodo(todoText: string, todos: Todo[])
// förväntad funktion: kollar om det är fler än 3 bokstäver, antingen pushar in i listan
// eller visar error

test("should throw error if <3 letters", () => {
// Arrange
let todoText = 'Köpa mjölk';
let isDone = false;
//let todos: Todo[] = [new Todo("Promenera hunden", true)];

// Act
let isLongEnough = createNewTodo(todoText, false)

// Assert

})

// FUNKTION 4   createHtml(todos: Todo[])
// förväntad funktion: skapar tom container för att särefter skicka in alla items i listan
// är item klickad är den överstruken, lägger även till eventlistener på alla li för att ev stryka över

// FUNKTION 5 toggleTodo(todo: Todo)
// texten stryks över vid klick, nu html skapas (createHtml)

//FUNKTION 6   displayError(error: string, show: boolean)
// förväntad funktion: visar error-texten genom att lägga till klass

// FUNKTION 7 clearTodos(todos: Todo[])
// förväntad funktion: tar bort alla items i todo-listan. 