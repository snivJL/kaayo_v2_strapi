"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  count(params) {
    console.log("service", params);
    return strapi.query("product").count(params);
  },
};
