const swaggerJSDoc = require('swagger-jsdoc');

const createSwaggerSpec = (serverUrl) => {
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'BaselinePmtool',
        version: '1.0.0',
        description: 'API documentation',
      },
      servers: [
        {
          url: serverUrl,
          description: 'Baseline It Developemnt',
        },
      ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
  };

  return swaggerJSDoc(options);
};

module.exports = createSwaggerSpec;
