import Player from '../Player';
import axios from 'axios'

const beforePrompt = "<s>user\nStable Diffusion — это инструмент для генерации изображений, который создаёт картинки на основе текстового запроса на английском языке.\nПримеры запросов для Stable Diffusion:\n1. Женщина занимается йогой на пляже: \"High-definition, detailed, woman practicing yoga at dawn on the beach, in a perfect Warrior II pose, wearing form-fitting athletic wear, calm and composed expression, the early morning sun casting a soft glow, tranquil sea in the background.\"\n2. Женщина отдыхает на пляжном лежаке: \"Realistic, high-definition, sharp focus, woman sunbathing on a golden sand beach, wearing a vibrant turquoise bikini, sunglasses atop her head, sun-kissed skin, relaxed posture, reading a book, clear blue sky overhead, gentle waves in the background.\"\n3. Поле неоновых тюльпанов: \"A vast field of neon-colored tulips under a violet sky, with a crystal-blue river meandering through\"\n4. Итальянский учёный-универсал: \"An Italian polymath whose areas of interest included invention, painting, sculpting, architecture, science, music, mathematics, engineering, literature, anatomy, geology, astronomy, botany, writing, history, and cartography, realistic\"\n5. Виноградники на северном полюсе: \"polar region, bunches of grapes hang under the mesmerizing dance of the Aurora Borealis. Each grape reflects the vivid greens and purples, creating a symphony of colors against the icy backdrop , food, fruit, wide view\"\nОтмечу, что придумывание текстового запроса для Stable Diffusion требует креативности и точного описания деталей; простая идея должна быть развёрнута в длинный запрос, содержащий описание сцены, а также теги качества и композиции, которые отделяются запятыми.\nНужно создать аватарку для следующего персонажа:"

const afterprompt = "\nИсходя из этого, напиши мне текстовый запрос для Stable Diffusion, чтобы нарисовать аватарку этого персонажа.</s>\n<s>bot\n\""

export async function sendToLLM(prompt: string): Promise<string>{
  let finalPrompt = beforePrompt+prompt+afterprompt;
  console.log('gonna send the final prompt:')
  console.log(finalPrompt);
  const res = await axios.post('http://localhost:5000/v1/completions', { prompt: finalPrompt, max_tokens: 1024 }).then(res => res.data);
  console.log('got res: ',res,' from LLM.')
  return res;
}

export function generatePersonImagePrompt(player: Player): string {
  let prompt = '';
    //'напиши мне текстовый запрос для Stable Diffusion, чтобы сгенерировать аватарку для следующего персонажа: \n';
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
  if (age > 20 && age % 10 == 1) postfix = 'год';
  if (age > 20 && age % 10 > 1 && age % 10 < 5) postfix = 'года';

  prompt += displayGender + ', ' + age + ' ' + postfix + ', ';
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

  prompt += prefix + ' личный факт - ' + personalCard.scheme.lore + '\n';

  prompt +=
    prefix +
    ' предмет в рюкзаке - ' +
    backpackCard.scheme.title +
    ' (описание: ' +
    backpackCard.scheme.lore +
    ')' +
    '\n';

  prompt +=
    'Учти, что некоторые факты, например, предмет в рюкзаке, не должны быть явно отображены в портрете, но могут влиять на него неявно.';

  return prompt;
}
