import { Router } from 'express';
import { geocode, reverseGeocode, currentWeather, forecastWeather } from '../controllers/weather.controller';

const weatherRoute = (): Router => {
  const router = Router();

  router.get('/geocode', geocode);
  router.get('/geocode/reverse', reverseGeocode);
  router.get('/weather', currentWeather);
  router.get('/weather/forecast', forecastWeather);

  return router;
};

export { weatherRoute };
