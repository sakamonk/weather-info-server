interface WeatherQueryParameters {
  city: string,
  lat: number,
  lon: number,
  lang: string,
  unit: string
};

interface WeatherItem {
  weather: [{ icon: string }];
};

interface WeatherIconUrls {
  day: string,
  night: string
};

interface iconUrls {
  day: string[],
  night: string[]
};

export { WeatherQueryParameters, WeatherItem, WeatherIconUrls, iconUrls };
