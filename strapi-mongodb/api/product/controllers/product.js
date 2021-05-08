"use strict";
const { convertRestQueryParams, buildQuery } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const filters = convertRestQueryParams(ctx.request.query);
    return buildQuery({
      model: strapi.models.product,
      filters,
      populate: ["ingredients", "categories", "reviews"],
    });
  },
};
