const cloudinary = require("cloudinary").v2;
//this is cloudinary where we have used
cloudinary.config({
  cloud_name: "dbyvxsiho",
  api_key: "866567297287672",
  api_secret: "tJB1TLBy7fkWA7Ydzw775875TgM",
});

cloudinary.api
  .ping()
  .then(() => console.log("Cloudinary credentials are correct"))
  .catch((err) => console.error("Error:", err));

module.exports = cloudinary;
