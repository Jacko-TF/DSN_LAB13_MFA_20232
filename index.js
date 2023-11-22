const app = require('./app');
const config = require('./src/config/config');

const port = config.port;

require('./src/database/dbController');

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
