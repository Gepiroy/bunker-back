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
  let schemes = new CardSchemes()
  schemes.apocalypses = apocalypses;
  schemes.professions = professions;
  schemes.hobbies = hobbies;
  schemes.healths = healths;
  schemes.backpacks = backpacks;
  schemes.personal_facts = personal_facts;
  schemes.facts = facts;
  schemes.bunker_modificators = bunker_modificators;
  console.log("Using scheme:");
  for(let key of Object.keys(schemes)){
    console.log('  '+key+": "+schemes[key].length)
  }
  return schemes;
};

const instance = createSchemes()

export default instance