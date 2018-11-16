import { Meteor } from 'meteor/meteor';
// import '../client/standard/crm/collections/crm.js';


Meteor.startup(() => {
  // code to run on server at startup
  import '../collections/main.js'
});

import './standard/main.js';
import './z-customer/main.js';
