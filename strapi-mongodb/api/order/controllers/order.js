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
      const { cart, email } = ctx.request.body;
      const order = ctx.request.body;
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
      const emailTemplate = {
        subject: "Welcome <%= order.email %>",
        text: `Welcome on KA.A.YO!
          Your account is now created with: <%= order.email %>.
          Your purchase: 
          1 organic Juju.
          Enjoy your purchase and see you soon!
          Love you!`,
        html: `<h1>Welcome on KA.A.YO!</h1>
        <p>Your account is now created with: <%= order.email %>.<p>
        <p> Your purchase: <p> <h1>1 organic Juju</h1>
        <p> Enjoy your purchase and see you soon!<p>
        <h1>Love you!</h1>`,
      };
      await strapi.plugins["email"].services.email.sendTemplatedEmail(
        {
          to: email,
          // from: is not specified, so it's the defaultFrom that will be used instead
        },
        emailTemplate,
        {
          order,
        }
      );
      entity = await strapi.services.order.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.order });
  },
};
