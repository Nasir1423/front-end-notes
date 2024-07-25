import React, { Component } from 'react'
import { connect } from 'react-redux'
import { nanoid } from 'nanoid'
import { createAddPersonAction } from "../../store/actions/Person"
import "./index.css"

class PersonUI extends Component {
  addPerson = () => {
    const name = this.nameInput.value.trim();
    const age = this.ageInput.value.trim();
    if (!name || !age) return alert("empty input");
    const personObj = { id: nanoid(), name, age };
    this.props.addPerson(personObj);
    this.nameInput.value = "";
    this.ageInput.value = "";
  }

  render() {
    const { persons, count } = this.props;
    return (
      <>
        <h1>Person Component <span style={{ color: "skyblue" }}>Count Above is {count}</span></h1>
        <input type="text" placeholder='enter your name here' ref={currentNode => this.nameInput = currentNode} />
        <input type="text" placeholder='enter your age here' ref={currentNode => this.ageInput = currentNode} />
        <button onClick={this.addPerson}>add person</button>
        <ul>
          {persons.map(person => <li key={person.id}>{person.name}-{person.age}</li>)}
        </ul>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return { persons: state.persons, count: state.count }
}

const mapDispatchToProps = {
  addPerson: createAddPersonAction
}

const PersonContainer = connect(mapStateToProps, mapDispatchToProps)(PersonUI);

export default PersonContainer;