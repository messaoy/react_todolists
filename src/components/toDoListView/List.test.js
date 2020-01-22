import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Axios from 'axios';
import List from './List';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

const toDo = {
  data: [
    {
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
  ],
};

jest.mock('axios', () => {
  const data = {
    data: [
      {
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
    ],
  };
  return {
    get: jest.fn().mockReturnValue(Promise.resolve(data)),
  };
});
beforeEach(() => {
  wrapper = mount(<List />);
});

describe('List tests', () => {
  it('Should call axios get to seek to do lists on component mount', () => {
    const getSpy = jest.spyOn(Axios, 'get');
    expect(getSpy).toHaveBeenCalledTimes(1);
    expect(getSpy).toHaveBeenCalledWith('http://localhost:4000/toDoList');
    getSpy.mockClear();
  });

  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have a go to home button', () => {
    const button = wrapper.find('#backHome');
    expect(button).toHaveLength(1);
  });

  it('Should have / in back home button href ', () => {
    const button = wrapper.find('#backHome');
    expect(button.props().href).toEqual('/');
  });

  it('Should have right To do title in state', () => {
    const list = toDo.data[0];
    expect(wrapper.state().toDoLists[0].title).toEqual(list.title);
  });

  it('Should have right number of task in state', () => {
    const list = toDo.data[0];
    expect(wrapper.state().toDoLists[0].tasks.length).toEqual(list.tasks.length);
  });

  it('Should have right number of task in state', () => {
    const list = toDo.data[0];
    expect(wrapper.state().toDoLists[0].tasks).toEqual(list.tasks);
  });
});
