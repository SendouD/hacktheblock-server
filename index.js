require('dotenv').config();
const app = require('./server');
const dbConnection = require('./config/dbconfig');
const startServer = async () => {
    const port = process.env.PORT || 5000;
    try {
        await dbConnection(process.env.MONGO_URI);
        app.listen(3001, () => {
            console.log(`Server is listening on ${port}`);
        });

    } catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}

startServer();