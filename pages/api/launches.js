// This is no longer in use as this is implemented in
// getStaticProps()
const launches = require("./resources/launches.json");

export default function handler(_, res) {
  res.status(200).json(launches);
}
