var prepareView, publicRoutes, saveRedirectUrl, signInProhibited, signInRequired;

Router.configure({
  layoutTemplate: "masterLayout",
  loadingTemplate: "loading",
  notFoundTemplate: "notFound",
  routeControllerNameConverter: "camelCase",
  onBeforeAction: function() {
    if (Config.username && Meteor.userId() && !Meteor.user().username) {
      this.redirect('/setUserName');
    }
    return this.next();
  }
});

Router.map(function() {
  this.route("home", {
    path: "/",
    layoutTemplate: "homeLayout"
  });
  this.route("dashboard", {
    path: "/dashboard",
    waitOn:function(){
      Meteor.subscribe('projects', Meteor.userId());
    },
    onBeforeAction: function() {
      var url;
      url = Session.get('redirectToAfterSignIn');
      if (url) {
        Session.set('redirectToAfterSignIn', null);
        Router.go(url);
      }
      return this.next();
    },
    data: {
      'projects': function(){
        return Projects.find();
      }
    },
  });
  this.route("lists", {
    path: "/lists",
    layoutTemplate:'masterLayout',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      Meteor.subscribe('prospects');
    },
    data:{
      'propects':function(){
        return Prospects.find({});
      }
    },
    onAfterAction: function() {
      SEO.set({
        title: 'Customers | ' + SEO.settings.title
      });
    }
  });
  this.route("masterlist", {
    path: "/masterlist",
    layoutTemplate:'masterLayout',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      Meteor.subscribe('prospects');
    },
    data:{
      'propects':function(){
        return Prospects.find({});
      }
    },
    onAfterAction: function() {
      SEO.set({
        title: 'Customers | ' + SEO.settings.title
      });
    }
  });
  this.route("profile", {
    path: "/profile",
    waitOn: function() {
      return Meteor.subscribe('profilePictures');
    }
  });
  this.route("account", {
    path: "/account",
    onStop: function() {
      return Alert.clear();
    }
  });
  return this.route("setUserName", {
    path: "/setUserName",
    onBeforeAction: function() {
      if (!Config.username || (Meteor.userId() && Meteor.user().username)) {
        this.redirect('/dashboard');
      }
      return this.next();
    }
  });

  this.route('roles', {
    path: '/roles',
    layoutTemplate:'mainLayout',
    loginRequired: 'entrySignIn',
    waitOn:function(){
      return Meteor.subscribe('directory');
    }
  });
  this.route('projectView',{
    path:'/projects/:id',
    layoutTemplate:'masterLayout',
    loginRequired:'entrySignIn',
    waitOn:function(){
      return Meteor.subscribe('projects');
    },
    data:function(){
      Session.set('active_project',this.params.id);
      return Projects.findOne({_id:this.params.id});
    },
    onAfterAction:function(){
      SEO.set({
        title:'Project View | ' + SEO.settings.title
      })
    }
  });
  this.route('profile', {
    path: '/profile',
    layoutTemplate:'nosidebar',
    data: function() {
      return Meteor.user();
    }
  });

  this.route('notFound', {
    path: '*',
    where: 'server',
    action: function() {
      this.response.statusCode = 404;
      this.response.end(Handlebars.templates['404']());
    }
  });
});

Router.waitOn(function() {
  Meteor.subscribe('user');
  return Meteor.subscribe('userPicture');
});

prepareView = function() {
  var $bd;
  window.scrollTo(0, 0);
  $('body').removeClass('sidebar-active');
  $('.modal-backdrop').removeClass('in');
  $bd = $('.modal-backdrop');
  setTimeout(function() {
    return $bd.remove();
  }, 300);
  return $('body').attr('style', '');
};


Router.onAfterAction(prepareView);

signInRequired = function() {
  AccountsEntry.signInRequired(this);
  if (this.next) {
    return this.next();
  }
};

saveRedirectUrl = function() {
  if (!Meteor.loggingIn()) {
    if (!Meteor.user()) {
      Session.set('redirectToAfterSignIn', this.url);
    }
  }
  return this.next();
};

publicRoutes = _.union(Config.publicRoutes, ['entrySignIn', 'entrySignUp', 'entryForgotPassword']);

Router.onBeforeAction(saveRedirectUrl, {
  except: _.union(publicRoutes, ['entrySignOut'])
});

Router.onBeforeAction(signInRequired, {
  except: publicRoutes
});

signInProhibited = function() {
  if (Meteor.user()) {
    return Router.go('dashboard');
  } else {
    if (this.next) {
      return this.next();
    }
  }
};

Router.onBeforeAction(signInProhibited, {
  only: ['entrySignUp', 'entrySignUp', 'entryForgotPassword']
});
