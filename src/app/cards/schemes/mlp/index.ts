import apocalypses from './apocalypses';
import backpacks from '../default/backpacks';
import bunker_modificators from '../default/bunker_modificators';
import facts from '../default/facts';
import healths from '../default/healths';
import hobbies from '../default/hobbies';
import personal_facts from '../default/personal_facts';
import professions from '../default/professions';
import CardSchemes from '../CardSchemes';

function createSchemes(): CardSchemes {
  let schemes = new CardSchemes();
  schemes.apocalypses = apocalypses;
  schemes.professions = professions;
  schemes.hobbies = hobbies;
  schemes.healths = healths;
  schemes.backpacks = backpacks;
  schemes.personal_facts = personal_facts;
  schemes.facts = facts;
  schemes.bunker_modificators = bunker_modificators;
  console.log('Using scheme mlp:');
  for (let key of Object.keys(schemes)) {
    console.log('  ' + key + ': ' + schemes[key].length);
  }
  return schemes;
}

const instance = createSchemes();

export default instance;
