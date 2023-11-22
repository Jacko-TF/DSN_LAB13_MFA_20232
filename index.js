const app = require('./app');
const config = require('./src/config/config');

const port = config.port;


const connectToDatabase = require('./src/database/dbController');

connectToDatabase()
  .then(() => {
    // Aquí puedes comenzar a trabajar con la base de datos
    console.log('Haciendo operaciones en la base de datos...');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });
  
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
