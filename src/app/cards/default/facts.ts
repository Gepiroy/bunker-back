import CardScheme from '@/app/CardScheme';
import CardType from '@/app/CardType';

export default [
  new CardScheme(
    CardType.Fact,
    'Доступное оружие',
    'В вашей стране легально любое оружие.',
  ),
  new CardScheme(CardType.Fact, 'Брак', 'Ты в браке с игроком слева.'),
];
