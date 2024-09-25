  /**
   * @swagger
   * /api/geocode:
   *   get:
   *     summary: Get geocode information by city
   *     parameters:
   *       - in: query
   *         name: city
   *         schema:
   *           type: string
   *         required: true
   *         description: The city name
   *       - in: query
   *         name: countryCode
   *         schema:
   *           type: string
   *         description: The country code (optional)
   *     responses:
   *       200:
   *         description: Successfully retrieved geocode
   *       400:
   *         description: City name is required
   */

  /**
   * @swagger
   * /api/geocode/reverse:
   *   get:
   *     summary: Get reverse geocode information by lat/lon
   *     parameters:
   *       - in: query
   *         name: lat
   *         schema:
   *           type: number
   *         required: true
   *         description: Latitude
   *       - in: query
   *         name: lon
   *         schema:
   *           type: number
   *         required: true
   *         description: Longitude
   *     responses:
   *       200:
   *         description: Successfully retrieved reverse geocode
   *       400:
   *         description: Latitude and longitude are required
   */

  /**
   * @swagger
   * /api/weather:
   *   get:
   *     summary: Get current weather by city or lat/lon
   *     parameters:
   *       - in: query
   *         name: city
   *         schema:
   *           type: string
   *         description: The city name (optional if lat/lon are provided)
   *       - in: query
   *         name: lat
   *         schema:
   *           type: number
   *         description: Latitude (required if city is not provided)
   *       - in: query
   *         name: lon
   *         schema:
   *           type: number
   *         description: Longitude (required if city is not provided)
   *     responses:
   *       200:
   *         description: Successfully retrieved current weather
   *       400:
   *         description: City or lat/lon is required
   */

  /**
   * @swagger
   * /api/weather/forecast:
   *   get:
   *     summary: Get weather forecast by city or lat/lon
   *     parameters:
   *       - in: query
   *         name: city
   *         schema:
   *           type: string
   *         description: The city name (optional if lat/lon are provided)
   *       - in: query
   *         name: lat
   *         schema:
   *           type: number
   *         description: Latitude (required if city is not provided)
   *       - in: query
   *         name: lon
   *         schema:
   *           type: number
   *         description: Longitude (required if city is not provided)
   *     responses:
   *       200:
   *         description: Successfully retrieved weather forecast
   *       400:
   *         description: City or lat/lon is required
   */
