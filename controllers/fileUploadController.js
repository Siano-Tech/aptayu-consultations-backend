const { bucket } = require('../config/firebase');
const { format } = require('util');

/**
 * Upload file to Firebase Storage
 */
exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: 'No file uploaded',
      error: 'Please upload a file.'
    });
  }

  try {
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on('error', (err) => {
      return res.status(500).json({
        message: 'Unable to upload the file.',
        error: err.message,
      });
    });

    blobStream.on('finish', async () => {
      const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
      
      // Return the public URL for the uploaded file
      res.status(200).json({
        message: 'File uploaded successfully',
        data: { fileUrl: publicUrl },
      });
    });

    // Write the file buffer to Firebase Storage
    blobStream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({
      message: 'Error uploading file',
      error: error.message,
    });
  }
};
