'use strict';

function Admin(api,auth) {

  if (!api) {
    throw('Starbase Channels API Client object is missing.');
  }

  if (!auth) {
    throw('Starbase Authentication object is missing.');
  }

  const admin = async (req) => {

    let {path,method,data} = req;
    let token = null;

    if (req.token) {
      token = req.token;
    } else {
      token = await auth.getToken().catch(err=>{return null;});
    }

    api.setToken(token);
    return api.path(path)[method](data);

  };

  return admin;

}
