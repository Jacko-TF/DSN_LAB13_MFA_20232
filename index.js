const app = require('./app');
const config = require('./src/config/config');

const port = config.port;


const connectToDatabase = require('./src/database/dbController');

connectToDatabase()

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
