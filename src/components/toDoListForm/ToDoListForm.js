import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import './ToDoList.scss';

class ToDoListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: {
        title: '',
        tasks: [],
      },
      idTask: 1,
      redirectToReferrer: false,
      redirectToReferrerEdit: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    if (match && match.params.id) {
      document.title = 'Edition To Do';
      const url = `http://localhost:4000/toDoList/${parseInt(match.params.id, 10)}`;
      Axios.get(url)
        .then((result) => {
          this.setState((prev) => ({
            ...prev,
            toDoList: result.data,
            idTask: result.data.tasks.length + 1,
          }), () => this.forceUpdate());
        });
    } else {
      document.title = 'Création To Do';
    }
  }

  addTask = () => {
    const { idTask } = this.state;
    this.setState((prevState) => ({
      ...prevState,
      toDoList: {
        ...prevState.toDoList,
        tasks: [...prevState.toDoList.tasks, { title: '', id: idTask }],
      },
      idTask: prevState.idTask + 1,
    }));
  };

  deleteTask = (id) => {
    const { idTask } = this.state;
    const newId = idTask > 1 ? idTask - 1 : 1;
    const cleanTask = [];
    this.setState((prevState) => {
      const tasks = [...prevState.toDoList.tasks];
      tasks.splice(id - 1, 1);
      tasks.forEach((node, index) => {
        cleanTask.push(node);
        cleanTask[index].id = index + 1;
        return true;
      });
      return {
        ...prevState,
        toDoList: {
          ...prevState.toDoList,
          tasks: cleanTask,
        },
        idTask: newId,
      };
    });
  };

  handleChangeTitleToDo = (e) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      toDoList: {
        ...prevState.toDoList,
        title: value,
      },
    }
    ));
  };

  handleChangeTitleTask = (e) => {
    const { id, value } = e.target;
    this.setState((prevState) => {
      const tasks = [...prevState.toDoList.tasks];
      tasks[id - 1].title = value;
      return {
        ...prevState,
        toDoList: {
          ...prevState.toDoList,
          tasks,
        },
      };
    });
  };

  createTodo = (e) => {
    e.preventDefault();
    const url = 'http://localhost:4000/toDoList';
    const { toDoList } = this.state;
    Axios.post(url, toDoList)
      .then(() => this.setState(() => ({ redirectToReferrer: true })));
  };

  updateTodo = (e) => {
    e.preventDefault();
    const { toDoList } = this.state;
    const url = `http://localhost:4000/toDoList/${parseInt(toDoList.id, 10)}`;
    Axios.put(url, toDoList)
      .then(() => this.setState(() => ({ redirectToReferrerEdit: true })));
  };

  render() {
    const {
      toDoList, redirectToReferrer, redirectToReferrerEdit,
    } = this.state;
    console.log(toDoList);
    const { match } = this.props;
    let titleForm;
    let buttonForm;
    if (redirectToReferrer === true) return <Redirect to="/to-do" />;
    if (redirectToReferrerEdit === true) {
      const urlEdit = `/to-do/${toDoList.id}`;
      return <Redirect to={urlEdit} />;
    }
    if (match && match.params.id) {
      titleForm = (
        <h1 className="title is-1 is-spaced">Edition d&lsquo;une To-do</h1>
      );
      buttonForm = (
        <div className="field is-grouped marginTop">
          <div className="control">
            <button className="button is-success" id="validateToDoForm" onClick={this.updateTodo} type="submit">Editer</button>
          </div>
          <div className="control">
            <a href={`/to-do/${toDoList.id}`} id="cancelButton" type="button" className="button is-danger">Annuler</a>
          </div>
        </div>
      );
    } else {
      titleForm = (
        <h1 className="title is-1 is-spaced">Création d&lsquo;une To-do</h1>
      );
      buttonForm = (
        <div className="field is-grouped marginTop">
          <div className="control">
            <button className="button is-success" id="validateToDoForm" onClick={this.createTodo} type="submit">Valider</button>
          </div>
          <div className="control">
            <a href="/" id="cancelButton" type="button" className="button is-danger">Annuler</a>
          </div>
        </div>
      );
    }

    return (
      <article className="div box">
        {titleForm}
        <form noValidate>
          <div className="card">
            <header className="card-header">
              <p className="card-header-title">
                       Nom de la To-Do List
              </p>
            </header>
            <div className="card-content">
              <div className="content">
                <label htmlFor="title" className="label">
                  <input required className="input" name="title" type="text" id="todoTitle" placeholder="Nom de la To-Do" value={toDoList.title} onChange={(e) => this.handleChangeTitleToDo(e)} />
                </label>
              </div>
            </div>
            <footer className="card-footer">
              <button className="button is-success card-footer-item" id="addTask" onClick={() => this.addTask()} type="button">
                <span
                  className="icon is-small"
                >
                  <i className="fas fa-plus" />
                </span>
                &nbsp; &nbsp;Tâche
              </button>
            </footer>
          </div>
          <div className="field">
            <ul>
              {
              toDoList.tasks.map((node) => (
                <li key={node.title}>
                  <div className="card-content">
                    <div className="content">
                      <label htmlFor="title" className="label">
                        <input required className="input" id={node.id} name="title" type="text" placeholder="Nom de la tâche" defaultValue={node.title} onChange={(e) => this.handleChangeTitleTask(e)} />
                      </label>
                    </div>
                    <button className="button is-danger card-footer-item paddingButton" id="deleteTask" onClick={() => this.deleteTask(node.id)} type="button">
                      Supprimer
                    </button>
                  </div>
                </li>
              ))
            }
            </ul>
          </div>
          {buttonForm}
        </form>
      </article>
    );
  }
}

export default ToDoListForm;
