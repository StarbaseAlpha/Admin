'use strict';

const path = require('path');
const theRules = require('@starbase/therules');

const Rules = require(__dirname + path.sep + '..' + path.sep + 'rules');

function Admin(db, auth, options = {}) {

  if (!options || typeof options !== 'object') {
    options = {};
  }

  if (!db) {
    throw('Starbase Channels Database object is missing.');
  }

  if (!auth) {
    throw('Starbase Authentication object is missing.');
  }

  let customRules = null;
  if (options.customRules && typeof options.customRules === 'object') {
    customRules = options.customRules;
  }

  let customKit = null;
  if (options.customKit && typeof options.customKit === 'object') {
    customKit = options.customKit;
  }

  let isAdminUser = null;
  if (options.isAdminUser && typeof options.isAdminUser === 'function') {
    isAdminUser = options.isAdminUser;
  }

  let adminUser = 'admin';
  if (options.adminUser && typeof options.adminUser === 'string') {
    adminUser = options.adminUser;
  }

  const kit = {
    "db": db,
    "auth": auth,
    "customKit": customKit,
    "isAdminUser": isAdminUser,
    "adminUser":adminUser
  };

  let admin = {};

  admin.db = db;

  admin.isAdmin = (user) => {
    return !isAdminUser && user && user.username && user.username === adminUser;
  };

  admin.express = () => {
    return (req,res) => {
      theRules((customRules||Rules), req.body, kit).then(result=>{
        res.json(result);
      }).catch(err => {
        res.status(err.code||400).json(err);
      });
    };
  };

  return admin;

}

module.exports = Admin;
