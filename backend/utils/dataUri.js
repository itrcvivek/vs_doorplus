const DataUriParser = require("datauri/parser.js");
const path = require("path");


const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString()
  console.log(extName,"yftftyfty");
  console.log(file.originalname,"kjjnnjnj")
  return parser.format(extName, file.buffer);

};

module.exports = getDataUri;
