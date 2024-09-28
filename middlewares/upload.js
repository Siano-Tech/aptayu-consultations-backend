const multer = require('multer');

// Define storage strategy for multer (in-memory, we don't store files on the server)
const storage = multer.memoryStorage();

// Set up multer middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Limit file size to 100MB
  },
  fileFilter: (req, file, cb) => {
    // Accept only image and video file types
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed!'), false);
    }
  },
});

module.exports = upload;
