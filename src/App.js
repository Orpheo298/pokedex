// @flow
import * as React from "react";
import PageHeader from "react-bootstrap/lib/PageHeader";
import "./styles/App.scss";

type Pokemon = {
  id: number,
  name: string,
  url: string
};

type PokeListProps = {
  pokemons: Array<Pokemon>
};

/**
 * Display a list of Pokemon
 */
class PokeList extends React.Component<PokeListProps> {
  renderPokemon(pokemon) {
    return (
      <div className="thumbnail col-md-1" key={pokemon.id}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemon.id
          }.png`}
          alt={pokemon.name}
        />
        <div className="caption">
          <span>
            <strong>{pokemon.name}</strong>
          </span>
        </div>
      </div>
    );
  }

  render() {
    const pokemonPerRow = 12;

    const rows = [...Array(Math.ceil(this.props.pokemons.length / pokemonPerRow))];
    const pokemonsRows = rows.map((row: Array<Pokemon>, idx) =>
      this.props.pokemons.slice(idx * pokemonPerRow, idx * pokemonPerRow + pokemonPerRow)
    );
    const content = pokemonsRows.map((row, idx) => (
      <div className="row" key={idx}>
        {row.map(pokemon => this.renderPokemon(pokemon))}
      </div>
    ));

    return <div>{content}</div>;
  }
}

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
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then(pokemons => pokemons.json())
      .then(
        (pokemons: PokeAPI) => {
          pokemons.results.map(
            pokemon =>
              (pokemon.id = parseInt(
                pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", ""),
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
      return pokemon.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
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
