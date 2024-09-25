import request from 'supertest';
import { Express } from 'express-serve-static-core';
import { weatherRoute } from '../../src/routes/weather.route';
import express from 'express';

jest.mock('../../src/controllers/weather.controller', () => ({
  geocode: jest.fn((req, res) => res.status(200).json({ data: { lat: 62.26, lon: 25.7 } })),
  reverseGeocode: jest.fn((req, res) => res.status(200).json({ data: { name: 'Jyväskylä' } })),
  currentWeather: jest.fn((req, res) => res.status(200).json({ data: { coord: { lat: 62.26, lon: 25.7 }, weather: [] }})),
  forecastWeather: jest.fn((req, res) => res.status(200).json({ data: { message: 0, cnt: 40, list: [] }})),
}));


let app: Express;

beforeAll(() => {
  app = express();
  app.use(express.json()); // For parsing JSON request body
  app.use('/api/', weatherRoute()); // Register the weather routes
});

describe('Weather Routes', () => {

  describe('GET /api/geocode', () => {
    it('should return geocode data', async () => {
      const res = await request(app).get('/api/geocode');

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({ lat: 62.26, lon: 25.7 });
    });
  });

  describe('GET /api/geocode/reverse', () => {
    it('should return reverse geocode data', async () => {
      const res = await request(app).get('/api/geocode/reverse');

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({ name: 'Jyväskylä' });
    });
  });

  describe('GET /api/weather', () => {
    it('should return current weather data', async () => {
      const res = await request(app).get('/api/weather');

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({ coord: { lat: 62.26, lon: 25.7 }, weather: [] });
    });
  });


  describe('GET /api/weather/forecast', () => {
    it('should return forecast weather data', async () => {
      const res = await request(app).get('/api/weather/forecast');

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual({ message: 0, cnt: 40, list: [] });
    });
  });
});
