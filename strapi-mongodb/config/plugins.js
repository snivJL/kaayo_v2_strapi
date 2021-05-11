module.exports = ({ env }) => ({
  // ...
  email: {
    provider: "mailgun",
    providerOptions: {
      apiKey: env("MAILGUN_API_KEY"),
      domain: env("MAILGUN_DOMAIN"),
    },
    settings: {
      defaultFrom: "ka.a.yo.handmadesoaps@gmail.com",
      defaultReplyTo: "julien.lejay@gmail.com",
      testAddress: "julien.lejay@gmail.com",
    },
  },
  // ...
});
