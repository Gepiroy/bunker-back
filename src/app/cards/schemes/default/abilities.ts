import CardScheme from '@/app/cards/CardScheme';
import CardType from '@/app/cards/CardType';

export default [
  new CardScheme(
    CardType.Ability,
    'Обмен здоровьем',
    'Ты можешь обменяться здоровьем с любым игроком, в том числе с тем, кто его ещё не раскрыл.',
  ),
  new CardScheme(
    CardType.Ability,
    'Возвращение',
    'Ты можешь вернуть одного изгнанного. При следующем голосовании изгоняется на 1 человека больше, а вернувшийся меняет свою личность и профессию.',
  ),
  new CardScheme(
    CardType.Ability,
    'Вскрытие',
    'Заставь любого игрока показать всем его карту выбранного тобой типа.',
  ),
  new CardScheme(
    CardType.Ability,
    'VIP-показ',
    'Заставь любого игрока показать тебе лично две его карточки на его выбор.',
  ),
  new CardScheme(
    CardType.Ability,
    'Рандомное правосудие',
    '(По окончании голосования) вместо голосования двое победивших играют во что-то азартное, проигравший изгоняется.',
  ),
  new CardScheme(
    CardType.Ability,
    'Неактуальные сведения',
    'Ты можешь отменить любой факт (не личный).',
  ),
  new CardScheme(
    CardType.Ability,
    'Перевыборы',
    'Все должны переголосовать заново, выбирая другого игрока.',
  ),
  new CardScheme(
    CardType.Ability,
    'Второй рюкзак',
    'Возьми ещё один рюкзак из колоды и сразу же покажи, что в нём.',
  ),
  new CardScheme(
    CardType.Ability,
    'Обмен рюкзаками',
    'Ты можешь обменяться рюкзаком с любым игроком, в том числе с тем, кто его ещё не раскрыл.',
  ),
  new CardScheme(
    CardType.Ability,
    'Обмен хобби',
    'Ты можешь обменяться хобби с любым игроком, в том числе с тем, кто его ещё не раскрыл.',
  ),
  new CardScheme(
    CardType.Ability,
    'Обмен личными фактами',
    'Ты можешь обменяться личным фактом с любым игроком, в том числе с тем, кто его ещё не раскрыл.',
  ),
  new CardScheme(
    CardType.Ability,
    'МОЁ!!!',
    '(Действие при чужом ходе) присвой себе только что открытую карточку, взамен дав свою. Обе карточки в итоге становятся открытыми.',
  ),
  new CardScheme(
    CardType.Ability,
    'Враг',
    '(Скрывай эту карточку до конца игры) ты проиграешь, если попадёшь в бункер вместе с игроком, делающим ход после тебя.',
  ),
  new CardScheme(
    CardType.Ability,
    'Друг',
    '(Скрывай эту карточку до конца игры) ты проиграешь, если попадёшь в бункер без игрока, делающего ход перед тобой.',
  ),
  new CardScheme(
    CardType.Ability,
    'Срыв голосования',
    '(Во время голосования, до его окончания) ты можешь сорвать голосование. Тогда в следующем число изгнанников будет выше.',
  ),
];