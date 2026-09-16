import { defineQuery } from "groq";

const imageProjection = /* groq */ `
  image {
    asset->{_id, url},
    alt,
    hotspot,
    crop
  }
`;

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0]{
    clientsToShow,
    insightsToShow,
    caseStudiesToShow,
    galleryToShow
  }
`);

export const HOME_BANNERS_QUERY = defineQuery(/* groq */ `
  *[_type == "homeBanner" && status == "published"] | order(order asc) {
    _id,
    title,
    order,
    image {
      asset->{_id, url, metadata { dimensions { width, height, aspectRatio } }},
      alt,
      hotspot,
      crop
    },
    mobileImage {
      asset->{_id, url, metadata { dimensions { width, height, aspectRatio } }},
      alt,
      hotspot,
      crop
    }
  }
`);

export const GALLERY_QUERY = defineQuery(/* groq */ `
  *[_type == "galleryItem" && status == "published"] | order(featured desc, order asc) {
    _id,
    title,
    note,
    order,
    featured,
    ${imageProjection}
  }
`);

export const CLIENT_STORIES_QUERY = defineQuery(/* groq */ `
  *[_type == "clientStory" && status == "published"] | order(featured desc, order asc) {
    _id,
    title,
    quote,
    role,
    accent,
    order,
    featured
  }
`);

export const INSIGHTS_QUERY = defineQuery(/* groq */ `
  *[_type == "insight" && status == "published"] | order(featured desc, order asc) {
    _id,
    title,
    text,
    href,
    linkedinUrl,
    accent,
    order,
    featured,
    ${imageProjection}
  }
`);

export const CASE_STUDIES_QUERY = defineQuery(/* groq */ `
  *[_type == "caseStudy" && status == "published"] | order(featured desc, order asc) {
    _id,
    title,
    area,
    href,
    accent,
    order,
    featured,
    ${imageProjection}
  }
`);

export const MATERIAL_PRICES_QUERY = defineQuery(/* groq */ `
  *[_type == "materialPrice" && status == "published"] | order(order asc) {
    _id,
    code,
    name,
    sourceUrl
  }
`);
