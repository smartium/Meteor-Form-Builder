import { Meteor } from 'meteor/meteor';
import '../imports/both/lib/collections';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'saveFormTemplate'(data) {
    Forms.insert({
      createdAt: new Date(),
      epoch: new Date().valueOf(),
      code: Random.id([5]),
      data: data
    })
  }
})