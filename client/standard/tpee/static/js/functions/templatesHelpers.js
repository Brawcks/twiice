import { Meteor } from 'meteor/meteor';

Template.registerHelper('formatDate', function (date) {
    return moment(date).format('DD-MM-YYYY');
});

Template.registerHelper('formatDateTime', function (date) {
    return moment(date).format('DD-MM-YYYY HH:mm:ss');
});

Template.registerHelper('__', function (date) {
    return _;
});

Template.registerHelper('formatMinutesSince', function (date) {
    let initialdate = moment(date).format('YYYY-MM-DD');
    let start_time = moment(date).format('HH:mm:ss');
    let now = new Date();
    let enddate = moment(now).format('YYYY-MM-DD');
    let end_time = moment(now).format('HH:mm:ss');

    let datetimeA = moment(initialdate + " " + start_time);
    let datetimeB = moment(enddate + " " + end_time);

    diff = datetimeB.diff(datetimeA, "minutes");

    if (diff > 60) {
        var hours = Math.floor(diff/60);
        var minutes = diff%60;
        if (hours > 24) {
            var days = Math.floor(hours/24);
            return days + " days ago";
        }
        return hours + " hours, " + minutes + " minutes ago";
    }

    return datetimeB.diff(datetimeA, "minutes") + ' minutes ago';
});

Template.registerHelper('getCurUsermail', function () {
    var user = Meteor.user();
    if (user && user.emails) {
        return user.emails[0].address;
    } else {
        return false;
    }
});

