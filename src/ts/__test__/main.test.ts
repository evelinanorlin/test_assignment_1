/**
 * @jest-environment jsdom
 */

import * as main from "../main";

import * as functions from "../functions";

import { Todo } from "../models/Todo";

beforeEach(() => {
  document.body.innerHTML = "";
})

describe("sortButtonClicked", () => {
  //Arrange
  document.body.innerHTML = `
  <button id="sort" type="button">Sortera i bokstavsordning</button>`;
  let spyOnSortList = jest.spyOn(functions, "sortList").mockReturnValue();
  main.sortButtonClicked();

  //Act
  document.getElementById("sort")?.click()

  // Assert
  expect(spyOnSortList).toBeCalledTimes(1);

  spyOnSortList.mockRestore();
})

describe("createNewTodo", () => {
  test("should call addTodo", () => {

    // Arrange
    document.body.innerHTML = `
    <div id="error" class="error"></div>
    `;
    let text = "Buy something";
    let todo: Todo[] = [{
      text: "hello",
      done: true
    }];
    let spyOnAddTodo = jest.spyOn(functions, "addTodo");
    let spyOnCretatHtml=jest.spyOn(main, "createHtml").mockReturnValue();

    // Act
    main.createNewTodo(text, todo); 

    // Assert
    expect(spyOnAddTodo).toBeCalledTimes(1);

    spyOnAddTodo.mockRestore();
    spyOnCretatHtml.mockRestore();
  })

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
    expect(spyOnCreateHtml).toBeCalledTimes(1);

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
    expect(spyOndisplayError).toBeCalledTimes(1);

    spyOndisplayError.mockRestore();
  })
})

describe("createHtml", () => {
    test("should sent list to localStorage", () => {
      // Arrange
      document.body.innerHTML = `
      <ul id="todos" class="todo"></ul>
    `;

      let todo: Todo[] = [{
        text: "hello",
        done: false
      }]
      // Act
      main.createHtml(todo)

      // Assert
     let todos = JSON.parse(localStorage.getItem("todos") || "[]");

     expect(todos.length).toBe(1);
    })

    test("should add class todo__text--done if true", () => {

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
    
    test("Should add class todo__text ", () => {

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
    })

    test("Should add innerHtml", () => {

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
      expect(spyOnToggleTodo).toBeCalledTimes(1);
    
      spyOnToggleTodo.mockRestore();
    })

    test("Should append child", () => {

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
      let container = document.getElementById("todos")

      //Act
      expect(container?.firstElementChild?.innerHTML).toBe("hello");
      expect(container?.lastElementChild?.innerHTML).toBe("byebye");
    })
})

describe("toggleTodo", () => {

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
    expect(spyOnChangeTodo).toBeCalledTimes(1);
    expect(spyOnCreateHtml).toBeCalledTimes(1);
  
    spyOnChangeTodo.mockRestore();
    spyOnCreateHtml.mockRestore();
  })
})

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
  })

  test("should display error inner Html", () => {

    // Arrange
    document.body.innerHTML = `
    <div id="error" class="error"></div>
    `;

    const errorText = "There is an error";

    // Act
    main.displayError(errorText, true)

    // Asert
    let container = document.getElementById("error") as HTMLDivElement;

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

describe("clearTodos", () => {
  test("should run function removeAllTodos", () => {
  
    // Arrange
    let spyOnRemoveAllTodos = jest.spyOn(functions, "removeAllTodos").mockReturnValue();
    let spyOnCreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();
    let todo: Todo[] = [{
      text: "hello",
      done: true
    }];
  
    // Act
    main.clearTodos(todo);
  
    // Assert
    expect(spyOnRemoveAllTodos).toBeCalledTimes(1);
    expect(spyOnCreateHtml).toBeCalledTimes(1);
  
    spyOnRemoveAllTodos.mockRestore();
    spyOnCreateHtml.mockRestore();
  })
})
