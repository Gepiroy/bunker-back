import card_schemes from '@/app/cards/schemes/default/index';
import World from './World';

function createWorld(): World{
  let world = new World();
  world.card_schemes = card_schemes
  world.person_nations = [
    'Славянин',
    'Немец',
    'Еврей',
    'Араб',
    'Чёрный',
    'Кавказец',
  ];
  return world;
}

const instance = createWorld()

export default instance;