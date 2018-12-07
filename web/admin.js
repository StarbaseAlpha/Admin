'use strict';

function Admin(api,auth) {

  if (!api) {
    throw('Starbase Channels API Client object is missing.');
  }

  if (!auth) {
    throw('Starbase Authentication object is missing.');
  }

  api.setTokenHandler(auth.getToken);

  return api;

}
