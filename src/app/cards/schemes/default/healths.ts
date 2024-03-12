import CardScheme from '@/app/CardScheme';
import CardType from '@/app/CardType';

export default [
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
];
