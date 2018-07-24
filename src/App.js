// @flow
import * as React from 'react';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import type { Pokemon } from './Pokemon';
import PokeList from './PokeList';
import './styles/App.scss';

type AppState = {
  allPokemons: Array<Pokemon>,
  pokemons: Array<Pokemon>,
  isLoaded: boolean
};

type PokeAPI = {
  results: Array<Pokemon>
};

class App extends React.Component<void, AppState> {
  constructor() {
    super();

    this.state = {
      allPokemons: [],
      pokemons: [],
      isLoaded: false
    };
  }

  fetchPokemons() {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
      .then(pokemons => pokemons.json())
      .then(
        (pokemons: PokeAPI) => {
          pokemons.results.map(
            pokemon =>
              (pokemon.id = parseInt(
                pokemon.url.replace('https://pokeapi.co/api/v2/pokemon/', ''),
                10
              ))
          );
          console.log(pokemons.results);
          this.setState({
            allPokemons: pokemons.results,
            pokemons: pokemons.results,
            isLoaded: true
          });
        },
        () => {
          this.setState({
            isLoaded: true
          });
        }
      );
  }

  componentDidMount() {
    this.fetchPokemons();
  }

  filterList = (event: SyntheticInputEvent<HTMLInputElement>) => {
    let updatedList = this.state.allPokemons;
    updatedList = updatedList.filter(function(pokemon) {
      return pokemon.name.toLowerCase().search(event.currentTarget.value.toLowerCase()) !== -1;
    });
    this.setState({ pokemons: updatedList });
  };

  render() {
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container-fluid">
          <PageHeader>Pokedex</PageHeader>
          <form>
            <div className="input-group">
              <input type="text" placeholder="Search" onChange={this.filterList} />
            </div>
          </form>
          <div>
            <PokeList pokemons={this.state.pokemons} />
          </div>
        </div>
      );
    }
  }
}

export default App;
