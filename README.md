# Project Week 3 To-do list application (Cont.)
## Introduction
As of now, you have completed Project Week 2 and should now have a React Todo List Application that can add and delete unique tasks. For Project Week 3, we will finish up the front end and make our own unit tests to make sure our App is working properly. We encourage you to take a unique approach to this lab, as there is no one right answer. 
- [Material Design](https://material.io/design/introduction) is a design system that can guide you on what UI decisions to make if you would like to explore best practices, but functionality is the key focus of the lab.
- No back-end is required for this lab, and all data (tasks) should live on the front end.


## Requirements
Feature requirements (Week 3 task is complete when you):
+ Provide the due date for the task
+ Change the color of overdue tasks
+ Make test cases to test your application

Implementation requirements:
+ Use [**DesktopDatePicker**](https://mui.com/x/react-date-pickers/date-picker/)  to store the date that the task should be finished by.
+ Use [**React Testing Library**](https://testing-library.com/docs/react-testing-library/cheatsheet) to create unit tests to test your code.

Instructions:
1. To start this project we need to add a component that allows us to select a due date for our tasks.
    + To add the Date Picker add these imports to `src/component/AddTodo.js` 
 ```
 import { DesktopDatePicker , LocalizationProvider} from '@mui/x-date-pickers';
 import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
 ``` 
    + Next, inside the constructor, when initializing `this.state` add a new variable to store the due date and set it to null (i.e. `due : null,`)
    + Then you need to add this between the TextField and the Button in the render function.
 ```   
 <LocalizationProvider dateAdapter={AdapterDateFns}>         
 <DesktopDatePicker
 id="new-item-date"
 label="Due Date"
 value={/*value*/}
 onChange={/*onChange*/}
 renderInput={(params) => <TextField {...params} />}
 />
 </LocalizationProvider>
 ```
    + Replace `\*value*\` with the new state variable.
    + Create a new handleChange function for the datepicker to set the value of your due date. You are free to name this function. 
        1. (Hint: use handleChange as a template. Don't forget to remove the content and date values. You won't need that here.) 
        2. Note that the value from the date picker will give more than just the date in mm/dd/yyyy. To format the date, we need to set the due date variable to `new Date(event).toLocaleDateString()`
    + Change `\*OnChange*\` to the new handle function that you created.
    + Finally, reset the value of the due date to null in the `onSubmit` function

2. Right now the button works however we are able submit a task with an empty due date. We need to change this so that only task with both a task name and due date create a task. 

    + We need to go to `src/pages/Home.js` and go to the `addTodo` function where we made sure no duplicate tasks were added. (Hint: The date picker will give us three values: A valid date in string form, `"Invalid Date"` or `null`.) Create a check for `"Invalid Date"` or `null` so no task is made.
        1. Recall the psudeo code from week 2
 ```
 if (null or "Invalid Date" in todo list) {
 do nothing and just return
 to break out the function
 } else {
 perform the action to add
 the item to the Todo list }
 ```    

3. At this point, we have a working button that properly creates tasks with due dates; however, the due date value isn't currently being used.

    + We want to display these due dates and highlight any overdue items. We can do this in `src/component/todos.js`
    + Inside the map function above the return function, make a variable called `color` and set it to `"#ffffffff"` or `"white"` (#ffffffff is white's hex color value)
    + Then check if todays date to the due date of the task. If the due date is in the past change then set `color` to a different color. 
        1. (You do not have to keep the original card white, however you MUST make overdue cards a different color. Play around and find colors that you like.) 
        2. Note that your due date value is a string. You will have to use `new Date(/*due date variable*/)` to compare it to the current date 
        3. (Hint: you can get the current date with `new Date()`)  
    + Next, inside the card that you used to display the tasks, set the `background` to `color`. 
        1. (Hint: This is in  `<Card style={{\*Code*\}}>` from last week. If you did not add a style in the card, add it now)
    + Add `data-testid={/*task-name*/}` inside the card as well. Where `task-name` is the variable that holds the task name. 
        1. (Hint: Look in `ListItemText primary={}` for this value)
    + Finally in ListItemText change the value of `secondary={/*Somevalue*/}` with your due date value.


## Running Your Application
Run the below commands to render the application and open it on the browser:
* `npm install` - This command is used to install all the dependencies listed in a project's `package.json` file.
* `NODE_OPTIONS=--openssl-legacy-provider npm start` - Compiles and starts your application. It runs the script defined in the start property of the scripts section in package.json.


## Testing
This week we will be writing some test cases. Below is an example of a unit test that adds a History Test task due 05/30/2023.
```
test('test that App component renders Task', () => {
 render(<App />);
 const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
 const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
 const element = screen.getByRole('button', {name: /Add/i});
 const dueDate = "05/30/2023";
 fireEvent.change(inputTask, { target: { value: "History Test"}});
 fireEvent.change(inputDate, { target: { value: dueDate}});
 fireEvent.click(element);
 const check = screen.getByText(/History Test/i);
 const checkDate = screen.getByText(new RegExp(dueDate, "i"));
 expect(check).toBeInTheDocument();
 expect(checkDate).toBeInTheDocument();
 });

```
+ `render(<App />);` mocks the compentent so that we can do the testing
+ `screen.getByRole('textbox', {name: /Add New Item/i})` Looks for a textbox compentent with the words "Add New Item"
+ `fireEvent.change(inputTask, { target: { value: "History Test"}})` Types the value "History Test" into the text box.
+ `fireEvent.click()` clicks the selected element.
+ `screen.getByText(/History Test/i)` searches for "History Test" on the screen ignoring case using regex. (Note: getBy only looks for one value. If more than one value or no value is present then an error will occur.  If you want to get more then use `getAllBy`). 
+ `expect(check).toBeInTheDocument();` the element should be on the page if it is the test case is passed. Otherwise, the test fails. 
+ If you want to check if a value is equal to something, you can use `expect(value).toBe(value_I_want)`.
+ Note: The elements returned by `getByRole` or `getByText` may not have CSS or styling. If you want to have those values, put a `data-testid` in that component and use `getByTestId` to grab those IDs.
+ If we want to check if a value is 
1. Complete the Following Test Cases in `src/AddTodo.test.js`
    + No duplicate task
    + Submit Task with No Due Date
    + Submit Task with No Task Name
    + Late Tasks have Different Colors
        1. Hint if we wanted to grab the color of the card for "History Test" we can use `const historyCheck = screen.getByTestId(/History Test/i).style.background`
    + Delete Task
        1. Hint: Earlier, we used `screen.getByRole` for getting a Button and a Text Box. How would we get a Checkbox? 
 
 To run these tests run `npm run test`
 ## Pre-session Material
Here is a [**link**](https://ibm.box.com/s/c7caqj7u5fft4bmaugwdive16jfw1s0r) to the pre-session material that was provided to you earlier.
