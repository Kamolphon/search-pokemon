// types/pokemon.ts

export interface PokemonDimension {
  minimum: string;
  maximum: string;
}

export interface Attack {
  name: string;
  type: string;
  damage: number;
}

export interface PokemonAttack {
  fast: Attack[];
  special: Attack[];
}

export interface PokemonEvolutionRequirement {
  amount: number;
  name: string;
}

export interface PokemonCardData {
  id: string;
  number: string;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
}

export interface PokemonEvolutionDisplayData {
  id: string;
  number: string;
  name: string;
  image: string;
}

export interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: PokemonDimension;
  height: PokemonDimension;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
  attacks: PokemonAttack;
  evolutions?: PokemonEvolutionDisplayData[]; 
  evolutionRequirements?: PokemonEvolutionRequirement; 
}
