const QRCode = require('qrcode');

/**
 * Generate a QR code for the given URL.
 * @param {string} url - The URL to encode in the QR code.
 * @returns {Promise<string>} - A promise that resolves with the QR code as a data URL.
 */
const generateQRCode = async (url) => {
  try {
    const qrCode = await QRCode.toDataURL(url);
    return qrCode;
  } catch (error) {
    console.error('Failed to generate QR code:', error);
    throw error;
  }
};

module.exports = { generateQRCode };
