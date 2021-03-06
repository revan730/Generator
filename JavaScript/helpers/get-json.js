'use strict';

const http = require('http');

module.exports = (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let code = res.statusCode;
      if (code !== 200) {
        return reject(new Error(`HTTP status code ${code}`));
      }

      res.on('error', reject);

      let chunks = [];
      res.on('data', chunk => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        let json = Buffer.concat(chunks).toString();
        let object = null;

        try {
          object = JSON.parse(json);
        } catch (error) {
          return reject(error);
        }

        resolve(object);
      });
    });
  });
};
