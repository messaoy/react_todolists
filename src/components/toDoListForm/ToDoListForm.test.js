import React from 'react';
import Axios from 'axios';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ToDoListForm from './ToDoListForm';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
jest.mock('axios', () => {
  const data = {
    data: {
      message: 'Created',
    },
  };
  return {
    post: jest.fn().mockReturnValue(Promise.resolve(data)),
  };
});

beforeEach(() => {
  wrapper = mount(<ToDoListForm />);
});

describe('ToDoListForm tests', () => {
  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have a cancel button', () => {
    const button = wrapper.find('#cancelButton');
    expect(button).toHaveLength(1);
  });

  it('Should have a validate button', () => {
    const button = wrapper.find('#validateToDoForm');
    expect(button).toHaveLength(1);
  });

  it('Should have an add task  button', () => {
    const button = wrapper.find('#addTask');
    expect(button).toHaveLength(1);
  });

  it('Should have / in cancel button href ', () => {
    const button = wrapper.find('#cancelButton');
    expect(button.props().href).toEqual('/');
  });

  it('Should change to-do title in state on todoTitle input change', () => {
    const input = wrapper.find('#todoTitle');
    const mockEvent = {
      target: {
        name: 'title',
        value: 'To-Do test',
      },
    };
    input.simulate('change', mockEvent);
    expect(wrapper.state().toDoList.title).toEqual('To-Do test');
  });

  it('Should call handleChangeTitleToDo on todoTitle input change', () => {
    const input = wrapper.find('#todoTitle');
    const instance = wrapper.instance();
    const fn = jest.spyOn(instance, 'handleChangeTitleToDo');
    const mockEvent = {
      target: {
        name: 'title',
        value: 'To-Do test',
      },
    };
    input.simulate('change', mockEvent);
    expect(fn).toHaveBeenCalledTimes(1);
    fn.mockClear();
  });

  it('Should add a new task on addtask button', () => {
    const btn = wrapper.find('#addTask');
    const instance = wrapper.instance();
    const fn = jest.spyOn(instance, 'addTask');

    // Store the value to be able to compare
    const startId = wrapper.state().idTask;
    const startLength = wrapper.state().toDoList.tasks.length;

    // Add a Task
    btn.simulate('click', fn);
    expect(fn).toHaveBeenCalledTimes(1);

    const button = wrapper.find('#deleteTask');
    expect(wrapper.state().idTask).toEqual(startId + 1);
    expect(wrapper.state().toDoList.tasks.length).toEqual(startLength + 1);
    expect(button).toHaveLength(1);
    fn.mockClear();
  });

  it('Should delete a task on deletetask button', () => {
    const btnAdd = wrapper.find('#addTask');
    const instance = wrapper.instance();

    // Add a Task
    const fn = jest.spyOn(instance, 'addTask');
    btnAdd.simulate('click', fn);

    // Store the value to be able to compare
    const startId = wrapper.state().idTask;
    const startLength = wrapper.state().toDoList.tasks.length;

    // Delete the Task
    const btnDelete = wrapper.find('#deleteTask');
    const fn2 = jest.spyOn(instance, 'deleteTask');
    btnDelete.simulate('click', fn2);

    expect(fn2).toHaveBeenCalledTimes(1);
    expect(wrapper.state().idTask).toEqual(startId - 1);
    expect(wrapper.state().toDoList.tasks.length).toEqual(startLength - 1);
    fn.mockClear();
    fn2.mockClear();
  });

  it('Should call axios post with todo info when you click on validate button', () => {
    const button = wrapper.find('#validateToDoForm');
    const state = wrapper.state().toDoList;
    const getSpy = jest.spyOn(Axios, 'post');
    button.simulate('click', {
      preventDefault: () => {},
    });
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('http://localhost:4000/toDoList', state);
    getSpy.mockClear();
  });
});
