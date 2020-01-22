import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

class ToDo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoList: {
        id: 1,
        title: '',
        tasks: [],
      },
    };
  }

  componentDidMount() {
    document.title = 'Ma To-Do';
    const { match } = this.props;
    const url = `http://localhost:4000/toDoList/${parseInt(match.params.id, 10)}`;
    Axios.get(url)
      .then((result) => {
        this.setState({
          toDoList: result.data,
        }, () => this.forceUpdate());
      });
  }

  deleteToDo = () => {
    const { toDoList } = this.state;
    const url = `http://localhost:4000/toDoList/${parseInt(toDoList.id, 10)}`;
    Axios.delete(url, toDoList)
      .then(() => this.setState(() => ({ redirectToReferrer: true })));
  };

  render() {
    const { toDoList } = this.state;
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer === true) {
      return <Redirect to="/to-do" />;
    }
    return (
      <article className="article">
        <section className="section">
          <ul>
            <li key={toDoList.title} className="box">
              <h1 id="toDoTitle" className="title is-4 is-spaced">
                <span>{ toDoList.title }</span>
              </h1>
            </li>
            <li key={toDoList.id} className="box">
              <ul>
                <h1 className="title is-5 is-spaced">Tâches</h1>
                { toDoList.tasks.map((task) => (
                  <li key={task.id} className="box">
                    { task.title }
                  </li>
                ))}
              </ul>

            </li>
          </ul>
        </section>
        <div className="field is-grouped marginTop">
          <div className="control">
            <a href={`/to-do/${toDoList.id}/edit`} id="editToDo" type="button" className="button is-info">Gérer ma To-Do</a>
          </div>
          <div className="control">
            <button type="button" id="deleteToDoList" className="button is-danger" onClick={() => this.deleteToDo()}>Supprimer ma To-Do</button>
          </div>
          <div className="control">
            <a href="/to-do" type="button" id="backToList" className="button is-danger">Revenir à la liste</a>
          </div>
        </div>
      </article>
    );
  }
}

export default ToDo;
