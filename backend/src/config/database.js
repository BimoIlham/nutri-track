const { PrismaClient } = require('@prisma/client');

// Instance database untuk interaksi dengan PostgreSQL
const prisma = new PrismaClient();

module.exports = prisma;
