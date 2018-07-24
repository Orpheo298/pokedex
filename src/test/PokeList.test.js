import React from 'react';
import ReactDOM from 'react-dom';
import PokeList from '../PokeList';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<PokeList />', () => {
  const pokemons = [
    { url: 'https://pokeapi.co/api/v2/pokemon/1/', name: 'bulbasaur', id: 1 },
    { url: 'https://pokeapi.co/api/v2/pokemon/2/', name: 'ivysaur', id: 2 },
    { url: 'https://pokeapi.co/api/v2/pokemon/3/', name: 'venusaur', id: 3 },
    { url: 'https://pokeapi.co/api/v2/pokemon/4/', name: 'charmander', id: 4 },
    { url: 'https://pokeapi.co/api/v2/pokemon/5/', name: 'charmeleon', id: 5 },
    { url: 'https://pokeapi.co/api/v2/pokemon/6/', name: 'charizard', id: 6 },
    { url: 'https://pokeapi.co/api/v2/pokemon/7/', name: 'squirtle', id: 7 },
    { url: 'https://pokeapi.co/api/v2/pokemon/8/', name: 'wartortle', id: 8 },
    { url: 'https://pokeapi.co/api/v2/pokemon/9/', name: 'blastoise', id: 9 },
    { url: 'https://pokeapi.co/api/v2/pokemon/10/', name: 'caterpie', id: 10 },
    { url: 'https://pokeapi.co/api/v2/pokemon/11/', name: 'metapod', id: 11 },
    { url: 'https://pokeapi.co/api/v2/pokemon/12/', name: 'butterfree', id: 12 },
    { url: 'https://pokeapi.co/api/v2/pokemon/13/', name: 'weedle', id: 13 },
    { url: 'https://pokeapi.co/api/v2/pokemon/14/', name: 'kakuna', id: 14 },
    { url: 'https://pokeapi.co/api/v2/pokemon/15/', name: 'beedrill', id: 15 },
    { url: 'https://pokeapi.co/api/v2/pokemon/16/', name: 'pidgey', id: 16 },
    { url: 'https://pokeapi.co/api/v2/pokemon/17/', name: 'pidgeotto', id: 17 },
    { url: 'https://pokeapi.co/api/v2/pokemon/18/', name: 'pidgeot', id: 18 }
  ];

  it('should render PokeList', () => {
    const wrapper = shallow(<PokeList pokemons={pokemons} />);
    console.log(wrapper.debug());
    expect(wrapper.find('ThumbnailPokemon')).to.have.length(18);
    expect(wrapper.find('.row')).to.have.length(2);
  });
});
