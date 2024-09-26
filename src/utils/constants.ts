import dotenv from 'dotenv';
dotenv.config();

export const API_KEY = process.env.WEATHER_API_KEY;
export const BASE_URI = process.env.WEATHER_API_BASE_URI;
export const ICON_BASE_URI = process.env.WEATHER_ICON_BASE_URI;
const DEFAULT_UNIT = process.env.DEFAULT_UNIT || 'metric';
const DEFAULT_LANG = process.env.DEFAULT_LANG || 'en';
export const DEFAULT_OPTS = { units: DEFAULT_UNIT, lang: DEFAULT_LANG };
