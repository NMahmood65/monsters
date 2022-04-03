import logo from './logo.svg';

import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component'

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('constructorDidMount')
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((Response)=> Response.json())
    .then((users) =>
      this.setState(
        () => {
          return {monsters: users};
        },
        () => {
          console.log(this.state);
        }
      ) 
    );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(
      ()=>{
          return{searchField};
          }
    );
  }

  render() {
    console.log('render')
    const { monsters, searchField} = this.state;
    const { onSearchChange} =this;

    const filteredMonsters = monsters.filter((monster) => {
      return  monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <SearchBox
          className='monsters-search-box'
          onChangeHandler={onSearchChange} 
          placeholder='Search Monsters'
        />
        <CardList monsters={filteredMonsters}/>
      </div>
    );  
  }
}

export default App;
