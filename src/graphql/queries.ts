// graphql/queries.ts
import { gql } from '@apollo/client';

const POKEMON_EVOLUTION_FRAGMENT = gql`
  fragment RecursivePokemonFragment on Pokemon {
    id
    number
    name
    classification
    types
    resistant
    weaknesses
    fleeRate
    maxCP
    maxHP
    image
    evolutions {
      id
      number
      name
      image
    }
  }
`;

export const GET_MULTIPLE_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const GET_POKEMON_DETAIL_BY_NAME = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        ...RecursivePokemonFragment
      }
    }
  }
  ${POKEMON_EVOLUTION_FRAGMENT}
`;
