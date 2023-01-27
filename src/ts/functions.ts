import { IAddResponse } from "./models/IAddResult";
import { Todo } from "./models/Todo";
import { createHtml } from "./main";

export function addTodo(todoText: string, todos: Todo[]): IAddResponse {
  if (todoText.length > 2) {
    let newTodo = new Todo(todoText, false);
    todos.push(newTodo);
    return { success: true, error: "" };
  } else {
    return { success: false, error: "Du måste ange minst tre bokstäver" };
  }
}

export function changeTodo(todo: Todo) {
  todo.done = !todo.done;
}

export function removeAllTodos(todos: Todo[]) {
  todos.splice(0, todos.length);
}

export function sortList(todos: Todo[]){
  todos.sort((a, b) => a.text > b.text ? 1 : a.text < b.text ? -1 : 0);

  createHtml(todos);
}