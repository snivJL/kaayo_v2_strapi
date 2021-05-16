"use strict";
const {
  convertRestQueryParams,
  buildQuery,
  sanitizeEntity,
} = require("strapi-utils");

const qs = require("qs");

module.exports = {
  async find(ctx) {
    // const temp = convertRestQueryParams(ctx.request.query);
    // console.log("convertRestQueryParams:", temp);
    const filters = qs.parse(ctx.request.query);
    console.log("qs.parse:", filters);
    // if (filters["categories.name_contains"]) {
    //   newObj = {
    //     ...filters,
    //     "categories.name_contains": filters["categories.name_contains"].reduce(
    //       (acc, p) => {
    //         console.log("in map", p, p.split("_")[0]);
    //         return [...acc, p.split("_")[0]];
    //       },
    //       []
    //     ),
    //   };
    // }
    const totalDocuments = await strapi.query("product").count(filters);
    console.log("count", totalDocuments);

    // const pageNumber = filters.start / 8 + 1;
    const pageNumber = 1;
    console.log("pageNumber", pageNumber);

    const products = await strapi.query("product").find(filters);
    console.log(("TOTAL RESULTS", products.length));
    const totalResults = totalDocuments;
    const totalPages = Math.ceil(totalDocuments / filters._limit);
    console.log("totalpages", totalPages);
    return {
      products,
      totalResults,
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
