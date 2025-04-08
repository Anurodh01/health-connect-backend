export const DatabaseConfig = ()=> ({
    database: {
       host: process.env.DB_HOST || 'localhost',
       port: +process.env.DB_PORT || 3306,
       username: process.env.DB_USER || 'root',
       password: process.env.DB_PASS || 'root',
       name: process.env.DB_NAME
    }
});