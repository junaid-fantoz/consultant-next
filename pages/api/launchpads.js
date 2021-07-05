const launchePads = require("./resources/launchpads.json");

export default function handler(_, res) {
  res.status(200).json(launchePads);
}
