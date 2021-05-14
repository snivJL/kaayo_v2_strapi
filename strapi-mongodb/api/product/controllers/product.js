"use strict";
const {
  convertRestQueryParams,
  buildQuery,
  sanitizeEntity,
} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const filters = convertRestQueryParams(ctx.request.query);
    console.log(filters);

    const totalDocuments = await strapi.query("product").count();
    console.log("count", totalDocuments);

    const totalPages = Math.ceil(totalDocuments / 8);
    console.log("totalpages", totalPages);

    const pageNumber = filters.start / 8 + 1;
    console.log("pageNumber", pageNumber);

    const products = await buildQuery({
      model: strapi.models.product,
      filters,
      populate: ["ingredients", "categories", "reviews"],
    });
    filters.limit = 20;
    filters.start = 0;
    const res = await buildQuery({
      model: strapi.models.product,
      filters,
      populate: ["ingredients", "categories", "reviews"],
    });

    return {
      products,
      totalResults: res.length,
      totalPages,
      totalProducts: totalDocuments,
      pageNumber,
    };
  },
  async search(ctx) {
    const filters = convertRestQueryParams(ctx.request.query);
    console.log(filters);
    console.log("SEARCH");
    return buildQuery({
      model: strapi.models.product,
      filters,
      populate: ["ingredients", "categories", "reviews"],
    });
  },
};
