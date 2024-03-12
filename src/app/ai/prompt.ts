import Player from '../Player';

export function generatePersonImagePrompt(player: Player): string {
  let prompt =
    'Напиши текстовый запрос, который сгенерирует аватарку для следующего персонажа: \n';
  let bioCard = player.cards.find((card) => card.scheme.type == 0);
  let professionCard = player.cards.find((card) => card.scheme.type == 1);
  let hobbyCard = player.cards.find((card) => card.scheme.type == 2);
  let healthCard = player.cards.find((card) => card.scheme.type == 3);
  let backpackCard = player.cards.find((card) => card.scheme.type == 4);
  let personalCard = player.cards.find((card) => card.scheme.type == 5);

  let gender = bioCard.extra.gender;
  let age = bioCard.extra.age;
  let nation = bioCard.extra.nationality;

  let displayGender =
    age <= 20
      ? gender === 'male'
        ? 'Парень'
        : 'Девушка'
      : age <= 60
        ? gender === 'male'
          ? 'Мужчина'
          : 'Женщина'
        : gender === 'male'
          ? 'Дед'
          : 'Бабуля';
  let postfix = 'лет';
  if (age > 20 && age % 10 == 1) postfix = 'года';

  prompt += displayGender + ' ' + age + ' ' + postfix + ', ';
  prompt += nation + '\n';

  let prefix = gender == 'male' ? 'его' : 'её';

  prompt +=
    prefix +
    ' профессия/деятельность - ' +
    professionCard.scheme.title +
    ' (описание: ' +
    professionCard.scheme.lore +
    ')' +
    '\n';

  prompt +=
    prefix +
    ' хобби - ' +
    hobbyCard.scheme.title +
    ' (описание: ' +
    hobbyCard.scheme.lore +
    ')' +
    '\n';

  prompt +=
    prefix +
    ' здоровье - ' +
    healthCard.scheme.title +
    ' (описание: ' +
    healthCard.scheme.lore +
    ')' +
    '\n';

  prompt +=
    prefix +
    ' личный факт - ' +
    personalCard.scheme.lore +
    '\n';

  prompt +=
    prefix +
    ' предмет в рюкзаке - ' +
    backpackCard.scheme.title +
    ' (описание: ' +
    backpackCard.scheme.lore +
    ')' +
    '\n';

  prompt += 'Учти, что некоторые факты, например, предмет в рюкзаке, не должны быть явно отображены в портрете, но могут влиять на его лицо неявно.'

  return prompt;
}
