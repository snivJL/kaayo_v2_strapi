"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.order.create(data, { files });
    } else {
      const { cart } = ctx.request.body;
      const totalPrice = cart.reduce((acc, r) => {
        return (acc += r.product.price * Number(r.qty));
      }, 0);
      ctx.request.body.totalPrice = totalPrice;
      ctx.request.body.cart = cart.reduce(
        (acc, p) => [
          ...acc,
          {
            name: p.product.name,
            qty: p.qty,
            price: p.product.price,
            image: p.product.images[0].name,
          },
        ],
        []
      );

      console.log("BODY", ctx.request.body, cart);
      await cart.map((item) =>
        strapi
          .query("product")
          .update(
            { id: item.product.id },
            { $inc: { countInStock: -item.qty } }
          )
      );
      // const product =

      entity = await strapi.services.order.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.order });
  },
};
