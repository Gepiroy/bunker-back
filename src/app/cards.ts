import CardScheme from './CardScheme';
import CardType from './CardType';

const cards = {
  random(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  },
  apocalypses: [
    new CardScheme(
      CardType.Apocalypse,
      'Кровавая диктатура',
      'После военного переворота к власти пришёл тиран, закрывший границы и бла бла бла...',
    ),
    new CardScheme(
      CardType.Apocalypse,
      'Петя в стране возможностей',
      'Всё началось с робота Пети...',
    ),
  ],
  professions: [
    new CardScheme(
      CardType.Profession,
      'Психиатр',
      'Много лет ты лечил больных наголову.',
    ),
    new CardScheme(
      CardType.Profession,
      'Политик',
      'Долгие годы ты убеждал людей.',
    ),
  ],
  hobbies: [
    new CardScheme(
      CardType.Hobby,
      'Путешествия',
      'Ты любишь исследовать просторы вдали от дома.',
    ),
    new CardScheme(
      CardType.Hobby,
      'Разделка животных',
      'Любой дохлый голубь становится твоим развлечением.',
    ),
  ],
  healths: [
    new CardScheme(
      CardType.Health,
      'СПИД',
      'У тебя синдром приобретённого иммунодефицита. Это не лечится.',
    ),
    new CardScheme(
      CardType.Health,
      'Шизофрения',
      'Ты слышишь голоса, которых нет, видишь то, чего нет, и в целом, прекрасно общаешься без людей.',
    ),
  ],
  backpacks: [
    new CardScheme(CardType.Backpack, 'Слиток золота', '2.5кг слиток золота.'),
    new CardScheme(
      CardType.Backpack,
      'Годовой запас изоленты',
      '2 килограмма мотков изоленты самых разных цветов.',
    ),
  ],
  personal_facts: [
    new CardScheme(
      CardType.PersonalFact,
      'Приближённый',
      'Ты лично общался с виновным в апокалипсисе.',
    ),
    new CardScheme(
      CardType.PersonalFact,
      'Робинзон',
      'После авиакрушения ты в одиночку прожил целый месяц.',
    ),
  ],
  facts: [
    new CardScheme(
      CardType.Fact,
      'Доступное оружие',
      'В вашей стране легально любое оружие.',
    ),
    new CardScheme(CardType.Fact, 'Брак', 'Ты в браке с игроком слева.'),
  ],
  bunker_modificators: [
    new CardScheme(
      CardType.BunkerModificator,
      'Сопли',
      'Потолок бункера держится на соплях.',
    ),
    new CardScheme(
      CardType.BunkerModificator,
      'Бомжи',
      'До апокалипсиса в бункере поселились бомжи. Все припасы прожраны, два гниющих бомжа валяются в окружении бутылок водки. К сожалению, пустых.',
    ),
  ],
  person_genders: ['Мужчина', 'Женщина'],
  person_orientations: [
    'Гетеросексуал',
    'Гомосексуал',
    'Бисексуал',
    'Асексуал',
  ],
  person_nations: [
    'Неприметный',
    'Немец',
    'Еврей',
    'Араб',
    'Чёрный',
    'Кавказец',
  ],
};

export default cards;
