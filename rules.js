'use strict';

const getUser = (body, kit, params) => {
  return kit.auth.verifyToken(body.token||"").then(token=>{return token.user;}).catch(err=>{return null;});
};

const isAdminUser = async (body,kit,params) => {
  let user = await getUser(body,kit,params);
  if (kit.isAdminUser && typeof kit.isAdminUser === 'function') {
    return kit.isAdminUser(body,kit,params);
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
  "put":(body,kit,params) => {
    return kit.db.path(body.path).put(body.data);
  },
  "get":(body,kit,params) => {
    return kit.db.path(body.path).get(body.data);
  },
  "del":(body,kit,params) => {
    return kit.db.path(body.path).del();
  },
  "list":(body,kit,params) => {
    return kit.db.path(body.path).list(body.data);
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
