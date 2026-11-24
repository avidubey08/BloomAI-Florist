// frontend/config.js - BloomAI Florist
export const config = {
  businessName: "BloomAI Florist",
  category: "Florist + AI",
  primary: "#2B1A2E",
  secondary: "#FF8FB1",
  font: "Cormorant Garamond",
  apiBaseUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : '' // Relative URL when served together or proxy configured
};
