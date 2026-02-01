import React, { useState } from 'react';

const WeatherApp = () => {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bgClass, setBgClass] = useState('bg-default');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!cityInput) return;

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=6f114610b0a37fd54fb571d914e47670&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        updateBackground(data.main.temp);
      } else {
        setError(data.message || "City not found");
        setBgClass('bg-default');
      }
    } catch (err) {
      setError("Failed to fetch data.",err);
    } finally {
      setLoading(false);
    }
  };

  const updateBackground = (temp) => {
    if (temp < 15) setBgClass('bg-cold');
    else if (temp > 28) setBgClass('bg-warm');
    else setBgClass('bg-default');
  };

  return (
    <div className={`weather-app-container ${bgClass}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-sm-8">
            
            <div className="card glass-card p-4">
              <h2 className="text-center mb-4 font-weight-bold" style={{color: '#1a4a1a'}}>
                Weather Nature
              </h2>
              
              <form onSubmit={handleSearch}>
                <div className="input-group mb-4">
                  <input
                    type="text"
                    className="form-control glass-input"
                    placeholder="Search city..."
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                  />
                  <div className="input-group-append ml-2">
                    <button className="btn glass-btn" type="submit">
                      {loading ? '...' : 'Search'}
                    </button>
                  </div>
                </div>
              </form>

              {error && (
                <div className="glass-alert text-center animate-fade-in">
                  <strong>Oops!</strong> {error}
                </div>
              )}

              {weatherData && !error && (
                <div className="text-center animate-fade-in" style={{color: '#2d3436'}}>
                  <h3 className="mb-0 font-weight-bold">
                    {weatherData.name}, {weatherData.sys.country}
                  </h3>
                  <p className="small text-muted">{new Date().toLocaleDateString()}</p>
                  
                  <div className="my-4">
                    <h1 className="display-1 font-weight-bold">
                      {Math.round(weatherData.main.temp)}°
                    </h1>
                    <p className="lead text-capitalize font-weight-bold">
                      {weatherData.weather[0].description}
                    </p>
                  </div>

                  <div className="row mt-4 pt-3 border-top border-secondary">
                    <div className="col-6 border-right border-secondary">
                      <p className="mb-0 small text-uppercase font-weight-bold">Humidity</p>
                      <h5>{weatherData.main.humidity}%</h5>
                    </div>
                    <div className="col-6">
                      <p className="mb-0 small text-uppercase font-weight-bold">Wind</p>
                      <h5>{weatherData.wind.speed} m/s</h5>
                    </div>
                  </div>
                </div>
              )}

              {!weatherData && !loading && !error && (
                <div className="text-center mt-3 text-muted">
                  <p>Experience the weather.</p>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;