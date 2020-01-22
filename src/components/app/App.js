import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ToDoListForm from '../toDoListForm/ToDoListForm';
import List from '../toDoListView/List';
import ToDo from '../toDoListView/ToDo';
import Home from '../home/Home';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <header />
        <main className="container fluid menuButton">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              key="create-todo"
              path="/create/to-do"
              component={ToDoListForm}
            />
            <Route
              key="list-todo"
              exact
              path="/to-do"
              component={List}
            />
            <Route
              key="view-todo"
              exact
              path="/to-do/:id"
              component={ToDo}
            />
            <Route
              key="edit-todo"
              exact
              path="/to-do/:id/edit"
              component={ToDoListForm}
            />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
