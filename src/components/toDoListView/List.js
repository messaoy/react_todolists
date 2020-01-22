import React from 'react';
import Axios from 'axios';
import './List.scss';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDoLists: [],
    };
  }

  componentDidMount() {
    document.title = 'Liste des To-Do';
    const url = 'http://localhost:4000/toDoList';
    Axios.get(url)
      .then((result) => {
        this.setState({
          toDoLists: result.data,
        }, () => this.forceUpdate());
      });
  }

  render() {
    const { toDoLists } = this.state;
    return (
      <article className="article">
        <section className="section">
          <ul>
            <h1 className="title is-4 is-spaced">Liste des To-do</h1>
            { toDoLists.map((todo) => (
              <li key={todo.id} className="box">
                <a id={`${todo.title}-${todo.id}`} href={`/to-do/${todo.id}`}>
                  <span>{ todo.title }</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <div className="displayButton marginTop">
          <div className="control">
            <a href="/" type="button" id="backHome" className="button is-danger">Revenir à l&lsquo;accueil</a>
          </div>
        </div>
      </article>
    );
  }
}

export default List;
