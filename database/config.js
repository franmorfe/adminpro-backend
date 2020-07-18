const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB online');
        
    } catch (error) {

        console.log('error');
        throw new Error('Algo salió mal al intentar conectar a la BD');
        
    }
    
}

module.exports = {
    dbConnection
}
