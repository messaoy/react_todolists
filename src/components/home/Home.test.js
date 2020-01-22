import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = mount(<Home />);
});

describe('Home  tests', () => {
  it('Should exist', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.exists()).toBe(true);
  });

  it('Should have a create to-do list link', () => {
    const button = wrapper.find('#createToDo');
    expect(button).toHaveLength(1);
  });

  it('Should have a show to-do list button', () => {
    const button = wrapper.find('#showToDoList');
    expect(button).toHaveLength(1);
  });

  it('Should have /create/to-do in create to-list link href ', () => {
    const button = wrapper.find('#createToDo');
    expect(button.props().href).toEqual('/create/to-do');
  });

  it('Should have /to-do in show to-do list href ', () => {
    const button = wrapper.find('#showToDoList');
    expect(button.props().href).toEqual('/to-do');
  });
});
