"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  productId: async (ctx) => {
    const { id } = ctx.params;
    const { _limit, _start } = ctx.query;
    console.log(ctx.query);
    const limit = parseInt(_limit) || 5;
    const start = parseInt(_start) || 0;
    const reviews = await strapi
      .query("review")
      .find({ _limit: limit, _start: start, product: { _id: id } });
    const total = await strapi.query("review").count({ product: { _id: id } });
    return reviews ? { reviews, total } : [];
  },
};
