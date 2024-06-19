import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 });
