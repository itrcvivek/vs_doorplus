const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Remove deprecated options
            // useFindAndModify: false,
            // useCreateIndex: true
        });
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDatabase;
