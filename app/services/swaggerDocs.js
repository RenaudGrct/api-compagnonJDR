const expressJSDocSwagger = require("express-jsdoc-swagger");

const options = {
  info: {
    version: "0.1.0",
    title: "Compagnon JDR",
    description: "API du projet d'apothéose Compagnon JDR",
  },
  baseDir: __dirname,

  // security: {
  //   BasicAuth: {
  //     type: "http",
  //     scheme: "basic",
  //   },
  // },
  filesPattern: "../**/*.js",
  // URL de la page de documentation
  swaggerUIPath: process.env.API_DOCUMENTATION_ROUTE,
  // Activation de la documentation à travers une route de l'API
  exposeApiDocs: true,
  apiDocsPath: "/api/docs",
};

/**
 * Swagger middleware factory
 * @param {object} app Express application
 * @returns Express JSDoc Swagger middleware that create web documentation
 */
module.exports = (app) => expressJSDocSwagger(app)(options);