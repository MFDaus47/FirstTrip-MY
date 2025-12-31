const axios = require("axios");

class CarpoolingService {
  constructor() {
    this.apiKey = process.env.RAPIDAPI_KEY;
    this.apiHost = process.env.RAPIDAPI_HOST;
    this.baseURL = `https://${this.apiHost}`;
  }

  async checkTripViability(tripData) {
    const options = {
      method: "POST",
      url: `${this.baseURL}/isViable`,
    };
  }
}
