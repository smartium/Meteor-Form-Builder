FlowRouter.route('/', {
  name: 'Main',
  action() {
    BlazeLayout.render('App_body', {main: 'home'});
  }
});