import request from 'supertest';
import axios from 'axios';
import { weatherRoute } from '../../src/routes/weather.route';
import express from 'express';

jest.mock('axios'); // Mock axios globally

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api', weatherRoute()); // Mount your weather routes under /api/weather


describe('Weather Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset all mocks before each test
  });

  describe('GET /api/geocode', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Reset all mocks before each test
    });

    it('should return geocode data successfully with city and country', async () => {
      const mockResponse = { data: { city: 'New York', country: 'US' } };

      // Mock axios response
      (axios.request as jest.Mock).mockResolvedValue({
        status: 200,
        data: mockResponse
      });

      // Make request to the geocode endpoint
      const response = await request(app)
        .get('/api/geocode')
        .query({ city: 'New York', countryCode: 'US' })
        .set('Accept', 'application/json');

      // Assert response
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual({ data: mockResponse.data });
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        url: expect.stringContaining('geo/1.0/direct'),
        params: expect.objectContaining({ q: 'New York,,US' }),
      }));
    });

    it('should return geocode data successfully with city only', async () => {
      const mockResponse = { data: { city: 'New York' } };

      // Mock axios response
      (axios.request as jest.Mock).mockResolvedValue({
        status: 200,
        data: mockResponse
      });

      // Make request to the geocode endpoint
      const response = await request(app)
        .get('/api/geocode')
        .query({ city: 'New York' })
        .set('Accept', 'application/json');

      // Assert response
      expect(response.status).toBe(200);
      expect(response.body.data).toEqual({ data: mockResponse.data });
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        url: expect.stringContaining('geo/1.0/direct'),
        params: expect.objectContaining({ q: 'New York' }),
      }));
    });

    it('should return 400 if city is missing', async () => {
      const response = await request(app)
        .get('/api/geocode')
        .query({ countryCode: 'US' }) // No city provided
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'City name is required.' });
    });

    it('should return 500 if an error occurs', async () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      (axios.request as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test Error');
      });

      const response = await request(app)
        .get('/api/geocode')
        .query({ city: 'New York' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('Internal Server Error');

      logSpy.mockRestore();
    });
  });

  describe('GET /api/geocode/reverse', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Reset all mocks before each test
    });

    it('should return reverse geocode data', async () => {
      const mockResponse = { data: [{ lat: 40.7128, lon: -74.0060, name: 'New York', country: 'US' }] };

      (axios.request as jest.Mock).mockResolvedValue({
        status: 200,
        data: mockResponse
     });

      const response = await request(app)
        .get('/api/geocode/reverse')
        .query({ lat: 40.7128, lon: -74.0060 })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockResponse);
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        url: expect.stringContaining('geo/1.0/reverse'),
      }));
    });

    it('should return 400 if lat/lon are missing', async () => {
      const response = await request(app)
        .get('/api/geocode/reverse')
        .query({})
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Fields lat and lon are required.' });
    });

    it('should return 500 if an error occurs', async () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      (axios.request as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test Error');
      });

      const response = await request(app)
        .get('/api/geocode/reverse')
        .query({ lat: 40.7128, lon: -74.0060 })
        .set('Accept', 'application/json');

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('Internal Server Error');

      logSpy.mockRestore();
    });

  });

  describe('GET /api/weather', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Reset all mocks before each test
    });
  
    it('should return current weather data with city', async () => {
      const mockResponse1 = [{ lat: 40.7128, lon: -74.0060, name: 'New York', country: 'US', local_names: { fi: 'New York', en: 'New York' } }];
      const mockResponse2 = { data: { weather: 'Sunny', temp: 25 } };

      (axios.request as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: mockResponse1
      });

      (axios.request as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: mockResponse2
      });

      const response = await request(app)
        .get('/api/weather')
        .query({ city: 'New York' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockResponse2);
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        url: expect.stringContaining('data/2.5/weather'),
      }));
    });

    it('should return current weather data with lat/lon', async () => {
      const mockResponse = [{ lat: 40.7128, lon: -74.0060, name: 'New York', country: 'US', local_names: { fi: 'New York', en: 'New York' } }];

      (axios.request as jest.Mock).mockResolvedValue({
        status: 200,
        data: mockResponse
      });

      const response = await request(app)
        .get('/api/weather')
        .query({ lat: 40.7128, lon: -74.0060 })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockResponse);
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        url: expect.stringContaining('data/2.5/weather'),
      }));
    });

    it('should return current weather data with city and lang param', async () => {
      const mockResponse1 = [{ lat: 40.7128, lon: -74.0060, name: 'New York', country: 'US', local_names: { fi: 'New York', en: 'New York' } }];

      (axios.request as jest.Mock).mockResolvedValue({
        status: 200,
        data: mockResponse1
      });

      const response = await request(app)
        .get('/api/weather')
        .query({ city: 'New York', lang: 'fi' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockResponse1);
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        url: expect.stringContaining('data/2.5/weather'),
      }));
    });

    it('should return 400 if city and lat/lon are missing', async () => {
      const response = await request(app)
        .get('/api/weather')
        .query({})
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'City name or lat/lon is required.' });
    });

    it('should return 500 if an error occurs', async () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      (axios.request as jest.Mock).mockImplementation(() => {
        throw new Error('Test Error');
      });

      const response = await request(app)
        .get('/api/weather')
        .query({ lat: 40.7128, lon: -74.0060 })
        .set('Accept', 'application/json');

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('Internal Server Error');

      logSpy.mockRestore();
    });
  });

  describe('GET /api/weather/forecast', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Reset all mocks before each test
    });

    it('should return forecast data', async () => {
      const mockResponse1 = [{ lat: 40.7128, lon: -74.0060, name: 'New York', country: 'US', local_names: { fi: 'New York', en: 'New York' } }];
      const mockResponse2 = { data: { weather: 'Sunny', temp: 25 } };

      (axios.request as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: mockResponse1
      });

      (axios.request as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: mockResponse2
      });

      const response = await request(app)
        .get('/api/weather/forecast')
        .query({ city: 'New York' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockResponse2);
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        url: expect.stringContaining('data/2.5/forecast'),
      }));
    });

    it('should return forecast data with lang param', async () => {
      const mockResponse1 = [{ lat: 40.7128, lon: -74.0060, name: 'New York', country: 'US', local_names: { fi: 'New York', en: 'New York' } }];
      const mockResponse2 = { data: { weather: 'Sunny', temp: 25 } };

      (axios.request as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: mockResponse1
      });

      (axios.request as jest.Mock).mockResolvedValueOnce({
        status: 200,
        data: mockResponse2
      });

      const response = await request(app)
        .get('/api/weather/forecast')
        .query({ city: 'New York', lang: 'fi' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockResponse2);
      expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
        url: expect.stringContaining('data/2.5/forecast'),
      }));
    });

    it('should return 400 if city and lat/lon are missing', async () => {
      const response = await request(app)
        .get('/api/weather/forecast')
        .query({})
        .set('Accept', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'City name or lat/lon is required.' });
    });

    it('should return 500 if an error occurs', async () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

      (axios.request as jest.Mock).mockImplementation(() => {
        throw new Error('Test Error');
      });

      const response = await request(app)
        .get('/api/weather/forecast')
        .query({ city: 'New York' })
        .set('Accept', 'application/json');

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('Internal Server Error');

      logSpy.mockRestore();
    });
  });
});
