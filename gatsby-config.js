require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
const config = require("./package.json");

const { title, description, author, repository, homepage } = config;

const siteMetadata = {
  companyName: title,
  companyUrl: repository.url,
  authorName: author.name,
  authorUrl: author.url,
  siteUrl: homepage,
  siteDescription: description,
};

module.exports = {
  siteMetadata,
  plugins: [
    "gatsby-plugin-emotion",
    "gatsby-plugin-postcss",
    "gatsby-plugin-resolve-src",
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://cms.mxc.org:443`,
        queryLimit: 1000, // Default to 100
        contentTypes: [`mapper-faq`],
        loginData: {
          identifier: `${process.env.STRAPI_USER}`,
          password: `${process.env.STRAPI_PASSWORD}`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    "gatsby-plugin-react-leaflet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: siteMetadata.companyName,
        short_name: siteMetadata.companyName,
        start_url: "/",
        icon: "src/assets/images/favicon.png",
      },
    },
    {
      resolve: `gatsby-source-mxc-supernode`,
      options: {
        supernode: [
          "https://eusn.matchx.io",
          "https://lora.hunanhuaweikeji.com",
          "https://mxcxy.com",
          "https://rosa-iot.org",
          "https://k-supernode.com",
          "https://ussn.matchx.io",
          "https://duiot.net",
	  "https://wanshipool.com"
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        path: `${__dirname}/locales`,
        languages: [`en`, `hans`, `hant`, `ko`],
        defaultLanguage: `en`,

        // you can pass any i18next options
        // pass following options to allow message content as a key
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: false,
          nsSeparator: false,
        },
      },
    },
  ],
};
