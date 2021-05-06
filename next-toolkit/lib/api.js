import axios from "axios";
import Cookie from "js-cookie";

function getStrapiURL(path = "") {
  console.log("path", path);
  return `${
    // process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    "http://localhost:1337"
  }${path}`;
}

// Helper to make GET requests to Strapi
export default class StrapiApi {
  constructor() {}
  async fetchData(path) {
    const requestUrl = getStrapiURL(path);
    console.log(requestUrl);
    const response = await fetch(requestUrl, {
      headers: {
        Authorization: `Bearer ${Cookie.get("jwt")}`,
      },
    });
    const data = await response.json();
    return data;
  }
}
