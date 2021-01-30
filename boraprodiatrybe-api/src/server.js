const app = require('./api');
const environments = require('./configs/environments');

app.listen(environments.PORT || 3000);
