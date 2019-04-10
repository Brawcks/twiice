// LOAD THE MAIN MODULE
import './tpee/main.js';
import './users/main.js';

// LOAD ALL STANDARD MODULES HERE (SHOULD BE A FUNCTION DEPENDING ON SETTINGS.JSON)
// var ModulesLoader = Meteor.settings.public.modules.standard;

// $.each(ModulesLoader, function(index, value) {
//     // console.log(value.technical_name);
//     console.log('./'+value.technical_name+'/main.js');
//     console.log(index);

//     // La syntaxe ne semble pas bonne ... Je ne sais pas si c'est possible en JS
    
// }); 

import './crm/main.js';
import './project/main.js';
import './partners/main.js';