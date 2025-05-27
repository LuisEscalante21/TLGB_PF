import dotenv from "dotenv";

//Ejecutamos la libreria para acceder al .env
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI || "mongodb+srv://luiescalante2022:4ShsmpTP@cluster1b.mnnuv.mongodb.net/TLGB?retryWrites=true&w=majority&appName=Cluster1B", 
    },
    server: {
        port: process.env.PORT || "4000",
    },
    JWT:{
        secret: process.env.JWT_SECRET || "clavesecreta123",
        expiresIn: process.env.JWT_EXPIRES || "30d", 
    },
    emailAdmin:{
        email: process.env.ADMIN_EMAIL || "admin@gmail.com",
        password: process.env.ADMIN_PASSWORD || "admin123",
    },
    email:{
        email_user: process.env.EMAIL_USER || "luiescalante2022@gmail.com",
        email_password: process.env.EMAIL_PASS || "wjdh mvwh wqwv ktyw",
    },
    cloudinary: {
        cloudinary_name: process.env.CLOUDINARY_NAME,
        cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
        cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
        cloudinary_api_environment: process.env.CLOUDINARY_API_ENVIRONMENT,
    },
}