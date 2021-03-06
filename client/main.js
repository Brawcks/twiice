import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// LOAD HTML DATA TEMPLATES
import './main.html';

// LOAD JS FILES

// LOAD LIBRARIES
import '../lib/router/main.js'; // General file, importing all routes

// LOAD COLLECTIONS
import '../collections/main.js'; // General file, importing all collections

// LOAD STANDARD MODULES (USE ALPHABETICAL ORDER)
import './standard/main.js'; // General module

// LOAD CUSTOMER MODULES (USE ALPHABETICAL ORDER)
import './z-customer/main.js'; // General module

// LAST LOADER (PUT HERE EVERYTHING THAT NEEDS TO BE LOADED AT THE END)
import '../lib/i18n/main.js';

