import CardScheme from '@/app/cards/CardScheme';
import CardType from '@/app/cards/CardType';

export default [
  new CardScheme(
    CardType.Fact,
    'Доступное оружие',
    'В вашей стране легально любое оружие.',
  ),
  new CardScheme(CardType.Fact, 'Брак', 'Ты в браке с игроком слева.'),
];
