import app from './app.js';
import { connectToDatabase } from './database/connection.js';

const port = process.env.PORT || 8000;
connectToDatabase()
  .then(() => {
    app.listen(port, () =>
      console.log('Listening on port 8000\nConnected to MongoDB')
    );
  })
  .catch((error) => console.error(error));
