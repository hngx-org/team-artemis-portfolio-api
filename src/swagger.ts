import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "Zuri Portfolio End Point Documentation",
      version: "1.0.0",
      description: "API for Zuri Portfolio End Point Documentation",
    },
  },
  apis: ["./src/routes/*.route.ts"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
