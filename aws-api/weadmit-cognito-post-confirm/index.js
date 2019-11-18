const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18"
});

const fetch = require("node-fetch");

const hgeAdminSecret = process.env.HGE_ADMIN_SECRET;
const hgeEndpoint = process.env.HGE_ENDPOINT;

const query = `
mutation insertUser (
  $sub: uuid!,
  $userName: String!,
  $email: String!,
  $phone: String!,
  $userType: String!,
  $firstName: String!,
  $lastName: String!,
  
){
  insert_users(objects: [{
    user_cognito_sub: $sub,
    user_cognito_username: $userName,
    user_first_name: $firstName,
    user_last_name: $lastName,
    user_email: $email,
    user_phone: $phone,
    user_type: $userType
  }]) {
    returning {
      user_id
      user_email
      user_type
      user_cognito_sub
      user_status
      user_first_name
      user_last_name
    }
  }
}
`;

// const params = {
//   username,
//   password,
//   attributes: {
//     email: email,
//     phone_number: phoneNumber,
//     'custom:usertype': userType || 'user',
//     'custom:lastName': lastName || '',
//     'custom:firstName': firstName || '',
//   }

exports.handler = async (event, context, callback) => {
  console.log(JSON.stringify(event));

  try {
    const user = event.request.userAttributes;
    const qv = {
      sub: user.sub,
      userName: event.userName,
      email: user.email,
      phone: user.phone_number,
      firstName: user["custom:firstName"],
      lastName: user["custom:lastName"],
      userType: user["custom:usertype"]
    };

    const body = JSON.stringify({ query: query, variables: qv });
    console.log("Body", body);

    const result = await fetch(hgeEndpoint + "/v1/graphql", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": hgeAdminSecret
      }
    });

    const { errors, data } = await result.json();

    if (errors) {
      console.log(JSON.stringify(errors));

      throw new Error(errors);
    } else {
      console.log(data);
    }
    callback(null, event);
  } catch (err) {
    console.log(err);
    callback(err);
  }
};
