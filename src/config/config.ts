export default {
    jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',

    DB: {
        URI: process.env.MONGODB_URI || 'mongodb+srv://admin:1234567890@cluster0.bgkv4c6.mongodb.net/?retryWrites=true&w=majority',
        USER: process.env.MONGODB_USER,
        PASSWORD:process.env.MONGODB_PASSWORD
    }
}