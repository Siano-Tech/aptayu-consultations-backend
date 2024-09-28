const { customAlphabet } = require('nanoid');
// import nanoid from 'nanoid';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12)
const generateId = () => nanoid(12);

module.exports = { generateId }