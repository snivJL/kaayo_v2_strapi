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
    // let entities;
    // if (ctx.query._q) {
    //   entities = await strapi.services.product.search(ctx.query);
    // } else {
    //   entities = await strapi.query("product").find("");
    // }

    // return entities.map((entity) =>
    //   sanitizeEntity(entity, { model: strapi.models.product })
    // );
    const res = buildQuery({
      model: strapi.models.product,
      filters,
      populate: ["ingredients", "categories", "reviews"],
    });
    console.log("LENGTH", res.length, typeof res, res);
    return res;
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
