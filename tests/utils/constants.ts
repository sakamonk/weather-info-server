import { API_KEY, BASE_URI, DEFAULT_OPTS } from '../../src/utils/constants';

describe('Environment variable fallbacks', () => {
  beforeEach(() => {
    jest.resetModules(); // Clear cache
    jest.clearAllMocks(); // Reset all mocks before each test
  });

  it('should fallback to default values if environment variables are not set', () => {
    // Arrange
    jest.doMock('dotenv', () => ({
      config: jest.fn()
    }));

    // Assert
    expect(API_KEY).toBeUndefined();
    expect(BASE_URI).toBeUndefined();
    expect(DEFAULT_OPTS).toEqual({
      units: 'metric',
      lang: 'en'
    });
  });
});
