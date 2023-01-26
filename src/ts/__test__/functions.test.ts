/**
 * @jest-environment jsdom
 */

 import * as main from "../main";

 import * as functions from "../functions";
 
 import { Todo } from "../models/Todo";
 
 // Tömmer DOM innan varje funktion
 beforeEach(() => {
   document.body.innerHTML = "";
 })

 describe("addTodo", () => {

 test("Should add new todo", () => {
  // Arrange
  let todo: Todo[] = []
  let todoText = "Do this";
  let firstLength = todo.length;

  // Act
  functions.addTodo(todoText, todo)

  // Assert
  expect(todo.length).toBe(firstLength+1)
  expect(todo[todo.length-1].text).toBe("Do this");
 })

 test("Should not add new todo", () => {

  let todo: Todo[] = []
  let todoText = "D";
  let firstLength = todo.length;

  // Act
  functions.addTodo(todoText, todo)

  // Assert
  expect(todo.length).toBe(firstLength)
 })
})

describe("changeTodo", () => {
 test("Should change boolean to the other boolean", () => {
      // Arrange
      let todo: Todo = {
        text: "hello",
        done: true
      };

      // Act
      functions.changeTodo(todo);

      // Assert
      expect(todo.done).toBeFalsy()
  })
})

describe("removeAllTodos", () => {
 test("should empty Todo[]", () => {
  // Arrange
   let todo: Todo[] = [{
     text: "hello",
     done: true
   }];

   // Act
   functions.removeAllTodos(todo)

   // Assert
   expect(todo.length).toBe(0);
 })

})

