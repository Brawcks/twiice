import { hello } from './functions/tpeeTopNavbar.js';

Template.tpeeTopNavbar.onCreated(function() {
    console.log(hello());

});