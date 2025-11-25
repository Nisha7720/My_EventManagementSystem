const cloudinary = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ message: "Image is required!" });
    }

    // Upload the base64 image to Cloudinary
    const cloudinaryRes = await cloudinary.uploader.upload(imageBase64, {
      folder: "test-folder",
    });

    return res.json({
      message: "Image uploaded successfully",
      url: cloudinaryRes.secure_url, // use this in frontend or database
    });
  } catch (error) {
    console.error("Cloudinary Error:", error);
    res
      .status(500)
      .json({ message: "Upload failed when we upload image", error });
  }
};
