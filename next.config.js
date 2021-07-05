const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "components")],
  },
  images: {
    domains: ["spacexpatchlist.space", "i.imgur.com"],
  },
};
