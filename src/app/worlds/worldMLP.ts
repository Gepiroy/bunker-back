import card_schemes from '@/app/cards/schemes/mlp/index';
import World from './World';

function createWorld(): World{
  let world = new World();
  world.card_schemes = card_schemes
  world.person_nations = [
    'Земнопони',
    'Единорог',
    'Пегас',
    'Аликорн',
    'Грифон',
    'Гиппогриф',
    'Чейнджлинг',
    'Як',
    'Кирин',
    'Бэтпони',
    'Кристальный пони',
    'Зебра',
    'Осёл',
    'Олень',
    'Дракон',
    'Алмазный пёс',
  ];
  return world;
}

const instance = createWorld()

export default instance;