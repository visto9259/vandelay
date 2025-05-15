import {SessionStorageAdapter} from "../../cache/index.js";

function TokenService(options = {}) {
  this.clientId = options.clientId;
  this.clientSecret = options.clientSecret;
  this.baseUrl = options.baseUrl;
  this.cache = new SessionStorageAdapter();

  this.getBearerToken = function () {
    return this.cache.get('token', (item) => {
      const formData = new FormData();
      formData.append('grant_type', 'client_credentials');
      return fetch("https://login.microsoftonline.com/bd68c26a-cb93-47ca-88d7-bff52fcdde0c/oauth2/v2.0/token", {
        method: "POST",

        headers: {
          'Content-Type': "application/x-www-form-urlencoded",
          'Accept': 'application/json',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: options.clientId,
          client_secret: options.clientSecret,
          scope: "https://staging.dev.dcbel.energy/.default"
        }),
      }).then((response) => {
        if (response.status === 200) {
          item.setTtl(response.data.expires_in);
          return response.data.access_token;
        } else {
          console.log(response.statusText);
          return response;
        }

      }, (err) => {
        console.log(err);
      })
    }).then(token => {
      console.log("token", token);
      return token;
    });
  }
}

export default TokenService;