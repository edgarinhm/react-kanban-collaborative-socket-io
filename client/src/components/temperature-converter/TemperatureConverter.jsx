import { useState } from "react";

function CelsiusInput(props) {
  const { celsius, handleChangeCelsius } = props;

  return (
    <div>
      <label>Celsius: </label>
      <input
        type="number"
        value={celsius}
        onChange={(e) => handleChangeCelsius(e.target.value)}
      />
    </div>
  );
}

function FahrenheitInput(props) {
  const { fahrenheit } = props;

  return (
    <div>
      <label>Fahrenheit: </label>
      <input type="text" value={fahrenheit} disabled />
    </div>
  );
}

function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0);

  const handleChangeCelsius = (newCelsius) => {
    setCelsius(parseFloat(newCelsius));
  };

  const fahrenheit = celsius * (9 / 5) + 32;

  return (
    <div>
      <CelsiusInput
        celsius={celsius}
        handleChangeCelsius={handleChangeCelsius}
      />
      <FahrenheitInput fahrenheit={fahrenheit.toFixed(2)} />
    </div>
  );
}

export default TemperatureConverter;
