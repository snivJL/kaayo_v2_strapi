"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  find: (ctx) => {
    return strapi.query("category").find(ctx.query, [
      {
        path: "products",
        populate: {
          path: "reviews",
        },
        populate: {
          path: "ingredients",
        },
        populate: {
          path: "categories",
        },
      },
    ]);
  },
};
