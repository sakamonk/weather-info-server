import { API_KEY, BASE_URI, DEFAULT_OPTS } from '../utils/constants';

import { Request, Response } from 'express';
import axios from 'axios';

interface WeatherQueryParameters {
  city: string,
  lat: number,
  lon: number,
  lang: string
};

const fetchCoordinates = async function(city: string, lat?: number, lon?: number, countryCode?: string) {
  let gc_lat = -1;
  let gc_lon = -1;

  if (lat && lon) {
    gc_lat = lat;
    gc_lon = lon;

    return { gc_lat, gc_lon, cityNames: [] };
  }

  try {
    const { gc_lat, gc_lon, cityNames } = await parseGeoCode(city, countryCode);
    return { gc_lat, gc_lon, cityNames };
  } catch (err) {
    console.log('fetchCoordinates geocode error:', err);
    return {};
  }
};

const parseGeoCode = async function(city: string, countryCode?: string, lang?: string) {
  let gc_lat = -1;
  let gc_lon = -1;

  if (!lang) {
    lang = DEFAULT_OPTS.lang;
  }

  const geocode = await directGeocode(city, countryCode);

  gc_lat = geocode.data[0].lat;
  gc_lon = geocode.data[0].lon;

  type CityName = { name: string, country: string };
  const cityNames: CityName[] = [];

  geocode.data.forEach((item: JSON) => {
    const name = item['local_names']['lang'] || item['name'];
    cityNames.push({ name: name, country: item['country'] });
  });

  return { gc_lat, gc_lon, cityNames };
}

const directGeocode = async function(city: string, countryCode?: string) {
  let query = city
  if (countryCode) {
    query += `,,${countryCode}`
  } 

  const options = {
    method: 'GET',
    url: `${BASE_URI}geo/1.0/direct?appid=${API_KEY}`,
    params: Object.assign(DEFAULT_OPTS, { q: query })
  };

  return await axios.request(options);
}

const geocode = async (req: Request, res: Response) => {
  const { city, countryCode } = req.query;

  if (!city) {
    return res.status(400).json({ message: 'City name is required.' });
  }

  try {
    const response = await directGeocode(city as string, countryCode as string);
    return res.status(response.status).json({ data: response.data });
  } catch (err) {
    console.log('geocode error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const reverseGeocode = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ message: 'Fields lat and lon are required.' });
  }

  const options = {
    method: 'GET',
    url: `${BASE_URI}geo/1.0/reverse?appid=${API_KEY}`,
    params: Object.assign(DEFAULT_OPTS, { lat: lat, lon: lon })
  };

  try {
    const response = await axios.request(options);
    if (response.status === 200) {
      return res.status(response.status).json({ data: response.data });
    } else {
      return res.status(response.data.cod).json({ message: response.data.message });
    }
  } catch (err) {
    console.log('Reverse geocode error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const currentWeather = async (req: Request<unknown, unknown, unknown, WeatherQueryParameters>, res: Response) => {
  const { city, lat, lon, lang } = req.query;

  if (!city && (!lat || !lon)) {
    return res.status(400).json({ message: 'City name or lat/lon is required.' });
  }

  const { gc_lat, gc_lon, cityNames } = await fetchCoordinates(city, lat, lon, lang);

  const query_params = {
    lat: gc_lat,
    lon: gc_lon
  };

  if (lang) {
    query_params['lang'] = lang;
  }

  const params = Object.assign(DEFAULT_OPTS, query_params);

  const options = {
    method: 'GET',
    url: `${BASE_URI}data/2.5/weather?appid=${API_KEY}`,
    params: params
  };

  try {
    const response = await axios.request(options);
    return res.status(response.status).json({ data: response.data, cities: cityNames });
  } catch (err) {
    console.log('currentWeather error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const forecastWeather = async (req: Request<unknown, unknown, unknown, WeatherQueryParameters>, res: Response) => {
  const { city, lat, lon, lang } = req.query;

  if (!city && !lat && !lon) {
    return res.status(400).json({ message: 'City name or lat/lon is required.' });
  }

  const { gc_lat, gc_lon, cityNames } = await fetchCoordinates(city, lat, lon, lang);

  const query_params = {
    lat: gc_lat,
    lon: gc_lon
  };

  if (lang) {
    query_params['lang'] = lang;
  }

  const params = Object.assign(DEFAULT_OPTS, query_params);

  const options = {
    method: 'GET',
    url: `${BASE_URI}data/2.5/forecast?appid=${API_KEY}`,
    params: params
  };

  try {
    const response = await axios.request(options);
    return res.status(response.status).json({ data: response.data, cities: cityNames });
  } catch (err) {
    console.log('forecastWeather error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { geocode, reverseGeocode, currentWeather, forecastWeather };
