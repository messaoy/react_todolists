import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Axios from 'axios';
import ToDo from './ToDo';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
const toDo = {
  data: {
    id: 1,
    title: 'Ma Todo',
    tasks: [
      {
        id: 1,
        title: 'Faire le ménage !',
      },
      {
        id: 2,
        title: 'Faire à manger !',
      },
    ],
  },
};

jest.mock('axios', () => {
  const data = {
    data: {
      id: 1,
      title: 'Ma Todo',
      tasks: [
        {
          id: 1,
          title: 'Faire le ménage !',
        },
        {
          id: 2,
          title: 'Faire à manger !',
        },
      ],
    },
  };
  return {
    get: jest.fn().mockReturnValue(Promise.resolve(data)),
    delete: jest.fn().mockReturnValue(Promise.resolve('Deleted')),
  };
});
beforeEach(() => {
  wrapper = mount(<ToDo
    match={{
      params: { id: 1 }, isExact: true, path: '/to-do/1', url: 'http://localhost:3000/to-do/1',
    }}
  />);
});

describe('Todo tests', () => {
  it('Should call axios get to seek to do list info on component mount', () => {
    const getSpy = jest.spyOn(Axios, 'get');
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('http://localhost:4000/toDoList/1');
    getSpy.mockClear();
  });

  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have a go back to list link', () => {
    const button = wrapper.find('#backToList');
    expect(button).toHaveLength(1);
  });

  it('Should have /to-do in back to list href ', () => {
    const button = wrapper.find('#backToList');
    expect(button.props().href).toEqual('/to-do');
  });

  it('Should have a delete to do button', () => {
    const button = wrapper.find('#deleteToDoList');
    expect(button).toHaveLength(1);
  });

  it('Should have an edit to do link', () => {
    const button = wrapper.find('#editToDo');
    expect(button).toHaveLength(1);
  });

  it('Should have /to-do/1/edit in back to list href ', () => {
    const button = wrapper.find('#editToDo');
    expect(button.props().href).toEqual('/to-do/1/edit');
  });

  it('Should call deleteToDo  on delete button click', () => {
    const btn = wrapper.find('#deleteToDoList');
    const instance = wrapper.instance();
    const fn = jest.spyOn(instance, 'deleteToDo');

    btn.simulate('click', fn);

    expect(fn).toHaveBeenCalledTimes(1);
    fn.mockClear();
  });

  it('Should have right To do title in state', () => {
    const list = toDo.data;
    expect(wrapper.state().toDoList.title).toEqual(list.title);
  });

  it('Should have right number of task in state', () => {
    const list = toDo.data;
    expect(wrapper.state().toDoList.tasks.length).toEqual(list.tasks.length);
  });

  it('Should have right number of task in state', () => {
    const list = toDo.data;
    expect(wrapper.state().toDoList.tasks).toEqual(list.tasks);
  });
});
