import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <>
        <div className="marginTop">
          <a href="/create/to-do" id="createToDo" type="button" className="button is-create">Créer une To-Do</a>
        </div>
        <div className="marginTop">
          <a href="/to-do" id="showToDoList" type="button" className="button is-info">Voir mes To-Do</a>
        </div>
      </>
    );
  }
}

export default Home;
