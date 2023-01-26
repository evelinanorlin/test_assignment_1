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

// describe för att organisera, i detta fall två tester för en funktion

// ANONYM FUNKTION 1



// ANONYM FUNKTION 2



// FUNKTION 3  function createNewTodo(todoText: string, todos: Todo[])

describe("createNewTodo", () => {

  test ("Should call createHtml", () => {
    //Arrange
    let text = "Buy something";
    let todo: Todo[] = [{
      text: "hello",
      done: true
    }];

    let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();

    //Act
    main.createNewTodo(text, todo);  

    // Assert
    expect(spyOnCreateHtml).toHaveBeenCalled();

    spyOnCreateHtml.mockRestore();
  })

  test ("Should call displayError", () => {
    //Arrange
    let text = "a";
    let todo: Todo[] = [{
      text: "hello",
      done: true
    }];

    let spyOndisplayError = jest.spyOn(main, "displayError").mockReturnValue();

    //Act
    main.createNewTodo(text, todo);  

    // Assert
    expect(spyOndisplayError).toHaveBeenCalled();

    spyOndisplayError.mockRestore();
  })
})

// FUNKTION 4   createHtml(todos: Todo[])
// Skippar local storage för nu, fråga imorgon!

test("should add todo__text--done if true", () => {
  //Arrange
  document.body.innerHTML = `
    <ul id="todos" class="todo"></ul>
  `;

  let todo: Todo[] = [{
    text: "hello",
    done: false
  },
  {
    text:"byebye",
    done: true
    }]

  // Act
  main.createHtml(todo)

  // Assert
  let container = document.getElementById("todos");
  let li1 = container?.firstElementChild;
  let li2 = container?.lastElementChild;

  expect(li1?.classList.contains("todo__text--done")).toBeFalsy();
  expect(li2?.classList.contains("todo__text--done")).toBeTruthy();
})

test("Should add class and innerHtml", () => {
    //Arrange
    document.body.innerHTML = `
    <ul id="todos" class="todo"></ul>
  `;

  let todo: Todo[] = [{
    text: "hello",
    done: false
  },
  {
    text:"byebye",
    done: true
    }];

  // Act
  main.createHtml(todo)

  // Assert
  let container = document.getElementById("todos");
  let li1 = container?.firstElementChild;
  let li2 = container?.lastElementChild;

  expect(li1?.classList.contains("todo__text")).toBeTruthy();
  expect(li2?.classList.contains("todo__text")).toBeTruthy();
  expect(li1?.innerHTML).toBe(todo[0].text);
  expect(li2?.innerHTML).toBe(todo[1].text);

})

test("Should trigger function when li-element is clicked", () => {
  // Arrange
  document.body.innerHTML = `
  <ul id="todos" class="todo"></ul>
`;

let todo: Todo[] = [{
  text: "hello",
  done: false
}];

  let spyOnToggleTodo = jest.spyOn(main, "toggleTodo").mockReturnValue();
  
  // Act
  main.createHtml(todo)

  //let container = document.getElementById("todos");

  let todoClicked: HTMLElement = (document.getElementById("todos")?.firstElementChild as HTMLElement)
  todoClicked.click();

  //Assert

  expect(spyOnToggleTodo).toHaveBeenCalled()

  spyOnToggleTodo.mockRestore();
})




// FUNKTION 5 toggleTodo(todo: Todo

test("Should run two functions", () => {
  // Arrange
  let spyOnChangeTodo = jest.spyOn(functions, "changeTodo").mockReturnValue();
  let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();

  let todo = {
    text: "Hello",
    done: false
  }

  // Act
  main.toggleTodo(todo);

  //Assert
  expect(spyOnChangeTodo).toHaveBeenCalled();
  expect(spyOnCreateHtml).toHaveBeenCalled();

  spyOnChangeTodo.mockRestore();
  spyOnCreateHtml.mockRestore();
})


//FUNKTION 6   displayError(error: string, show: boolean)
// OBS kolla även att innerHtml funkar

describe("displayError", () => {

  test("should add class .show", () => {

    // Arrange
    document.body.innerHTML = `
    <div id="error" class="error"></div>
    `;

    const errorText = "There is an error";
    // Act

    main.displayError(errorText, true)

    //Assert
    let container = document.getElementById("error") as HTMLDivElement;

    expect(container.classList.contains("show")).toBe(true);
    expect(container.innerHTML).toBe("There is an error");

  })

  test("should remove class .show", () => {

    // Arrange
    document.body.innerHTML = `
    <div id="error" class="error"></div>
    `;

    const errorText = "There is an error";

    // Act

    main.displayError(errorText, false)

    //Assert
    let container = document.getElementById("error") as HTMLDivElement;

    expect(container.classList.contains("show")).toBe(false);
  })
})

// FUNKTION 7 clearTodos(todos: Todo[])

  test("should run function removeAllTodos", () => {

    // Arrange
    let spyOnRemoveAllTodos = jest.spyOn(functions, "removeAllTodos").mockReturnValue(); // byt till lämpligare namn
    let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();

    let todo: Todo[] = [{
      text: "hello",
      done: true
    }];

    // Act
    main.clearTodos(todo);

    // Assert
    expect(spyOnRemoveAllTodos).toHaveBeenCalled();
    expect(spyOnCreateHtml).toHaveBeenCalled();

    spyOnRemoveAllTodos.mockRestore();
    spyOnCreateHtml.mockRestore();
  })