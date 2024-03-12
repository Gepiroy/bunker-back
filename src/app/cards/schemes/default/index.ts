import apocalypses from "./apocalypses";
import backpacks from "./backpacks";
import bunker_modificators from "./bunker_modificators";
import facts from "./facts";
import healths from "./healths";
import hobbies from "./hobbies";
import personal_facts from "./personal_facts";
import professions from "./professions";
import CardSchemes from "../CardSchemes";

function createSchemes(): CardSchemes {
  console.log('Эта хрень запустится только один раз, да?')
  let schemes = new CardSchemes()
  schemes.apocalypses = apocalypses;
  schemes.professions = professions;
  schemes.hobbies = hobbies;
  schemes.healths = healths;
  schemes.backpacks = backpacks;
  schemes.personal_facts = personal_facts;
  schemes.facts = facts;
  schemes.bunker_modificators = bunker_modificators;
  return schemes;
};

const instance = createSchemes()

export default instance