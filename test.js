var axios = require('axios');


const key = 'aY50XDf2jTlT21GoQw2uolZWl3IP0PHKv6wFwBbVijcFrhI4rAOiLx5OWI66'
var config = {
  method: 'get',
  url: `https://soccer.sportmonks.com/api/v2.0/leagues/501?api_token=${key}&include=country`,
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
}); 