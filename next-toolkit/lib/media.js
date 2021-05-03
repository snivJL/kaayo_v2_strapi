export function getStrapiMedia(media) {
  const imageUrl = media.url.startsWith("/")
    ? process.env.STRAPI_URL + media.url
    : media.url;

  return imageUrl;
}
