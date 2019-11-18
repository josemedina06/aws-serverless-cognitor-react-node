const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();

const fetch = require('node-fetch');

const adminSecret = process.env.ADMIN_SECRET;
const hgeEndpoint = process.env.HGE_ENDPOINT;

api.get(
  '/no-auth',
  request => {
    return { message: 'Open for All!' };
  },
  { apiKeyRequired: true }
);

api.get(
  '/require-auth',
  request => {
    return { message: "You're past the velvet rope!" };
  },
  { apiKeyRequired: true, authorizationType: 'AWS_IAM' }
);

api.get(
  '/query',
  request => {
    try {
      query = event.body;
      fetch(hgeEndpoint + '/v1/graphql', {
        method: 'GET',
        body: JSON.stringify({ query: query }),
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': adminSecret
        }
      })
        .then(res => res.json())
        .then(json => {
          callback(null, event);
        });
    } catch (e) {
      callback(null, false);
    }
  },
  { apiKeyRequired: true, authorizationType: 'AWS_IAM' }
);

module.exports = api;
