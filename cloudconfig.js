// require('dotenv').config();
require('dotenv').config({ path: './.env' });
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// require('dotenv').config();
// console.log("Cloudinary Config:", process.env.key_name, process.env.Api_key, process.env.Api_secret); // Debugging


cloudinary.config({
    cloud_name:process.env.key_name,
    api_key:process.env.Api_key,
    api_secret:process.env.Api_secret,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploaded_image',
      allowedFormats: ['png', 'jpg', 'jpeg','JPG','PNG'], // Fixed format array issue
    },
});

module.exports={cloudinary,storage};