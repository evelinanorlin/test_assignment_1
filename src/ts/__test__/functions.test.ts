/**
 * @jest-environment jsdom
 */

 import * as main from "../main";

 import * as functions from "../functions";
 
 import { Todo } from "../models/Todo";
 
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
 })

 test("todo shold have text and be false", () => {
    // Arrange
    let todo: Todo[] = []
    let todoText = "Do this";
    let firstLength = todo.length;
  
    // Act
    functions.addTodo(todoText, todo)
    // Assert
    expect(todo[todo.length-1].text).toBe("Do this");
    expect(todo[todo.length-1].done).toBeFalsy();
 })

 test("Should return success: true and no error message", () => {
      // Arrange
      let todo: Todo[] = []
      let todoText = "Do this";
      let firstLength = todo.length;
    
      // Act
      let result = functions.addTodo(todoText, todo)

      //Assert
      expect(result.success).toBe(true);
      expect(result.error).toBe("");
 } )

 test("Should not add new todo", () => {

  let todo: Todo[] = []
  let todoText = "D";
  let firstLength = todo.length;

  // Act
  functions.addTodo(todoText, todo)

  // Assert
  expect(todo.length).toBe(firstLength)
 })

 test("Should return success: false and error message", () => {
  // Arrange
  let todo: Todo[] = []
  let todoText = "D";
  let firstLength = todo.length;

  // Act
  let result = functions.addTodo(todoText, todo)

  //Assert
  expect(result.success).toBe(false);
  expect(result.error).toBe("Du måste ange minst tre bokstäver");
} )
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

describe("sortList", () => {
  test("should sort list from a to ö", () => {
    // Arrange
    let todo: Todo[] = [{
      text: "bbb",
      done: false
    },{
      text: "aaa",
      done: false
    }];
    let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();

    // Act
    functions.sortList(todo);

    // Assert
    expect(todo[0].text).toBe("aaa");
    expect(todo[1].text).toBe("bbb");
    expect(spyOnCreateHtml).toBeCalledTimes(1);

    spyOnCreateHtml.mockRestore();
  })
})

