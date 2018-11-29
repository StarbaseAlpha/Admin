'use strict';

const getUser = (req, kit, params) => {
  return kit.auth.verifyToken({"accessToken":req.token||null}).then(token=>{return token.user;}).catch(err=>{return null;});
};

const isAdminUser = async (req,kit,params) => {
  let user = await getUser(req,kit,params);
  if (kit.isAdminUser && typeof kit.isAdminUser === 'function') {
    return kit.isAdminUser(req,kit,params);
  } else {
    return user && user.username === kit.adminUser;
  }
};

const allRules = {
  "put":isAdminUser,
  "get":isAdminUser,
  "del":isAdminUser,
  "list":isAdminUser
};

const allMethods = {
  "put":(req,kit,params) => {
    return kit.db.path(req.path).put(req.data);
  },
  "get":(req,kit,params) => {
    return kit.db.path(req.path).get();
  },
  "del":(req,kit,params) => {
    return kit.db.path(req.path).del();
  },
  "list":(req,kit,params) => {
    return kit.db.path(req.path).list(req.data);
  }
};

const Rules = [

  // This is the root path
  {
    "path":"/",
    "rules":allRules,
    "methods":allMethods
  },

  {
    "path":"/:channel1",
    "rules":allRules,
    "methods":allMethods
  },

  {
    "path":"/:channel1/:channel2",
    "rules":allRules,
    "methods":allMethods
  },

  {
    "path":"/:channel1/:channel2/:channel3",
    "rules":allRules,
    "methods":allMethods
  },

  {
    "path":"/:channel1/:channel2/:channel3/:channel4",
    "rules":allRules,
    "methods":allMethods
  },

  {
    "path":"/:channel1/:channel2/:channel3/:channel4/:channel5",
    "rules":allRules,
    "methods":allMethods
  },

  {
    "path":"/:channel1/:channel2/:channel3/:channel4/:channel5/:channel6",
    "rules":allRules,
    "methods":allMethods
  },

  {
    "path":"/:channel1/:channel2/:channel3/:channel4/:channel5/:channel6/:channel7",
    "rules":allRules,
    "methods":allMethods
  },

  {
    "path":"/:channel1/:channel2/:channel3/:channel4/:channel5/:channel6/:channel7/:channel8",
    "rules":allRules,
    "methods":allMethods
  },

  {
    "path":"/:channel1/:channel2/:channel3/:channel4/:channel5/:channel6/:channel7/:channel8/:channel9",
    "rules":allRules,
    "methods":allMethods
  },

  // An example of how params could be defined at this deep level
  {
    "path":"/:apps/:appID/:users/:userID/:posts/:postID/:comments/commentID/:replies/:replyID",
    "rules":allRules,
    "methods":allMethods
  },

];

module.exports = Rules;
