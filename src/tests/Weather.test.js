import { render, screen } from '@testing-library/react';
import Weather from '../components/Weather';

test('Weather shows weather description', () => {
  render(<Weather data={["02d","weather_desc","current_temp","feels_like","humidity","time"]}/>);
  const linkElement = screen.getByText(/Weather: weather_desc/i);
  expect(linkElement).toBeInTheDocument();
});
test('Weather shows current temperature', () => {
  render(<Weather data={["02d","weather_desc","current_temp","feels_like","humidity","time"]}/>);
  const linkElement = screen.getByText(/The current temperature is: current_temp/i);
  expect(linkElement).toBeInTheDocument();
});
test('Weather shows feels like', () => {
  render(<Weather data={["02d","weather_desc","current_temp","feels_like","humidity","time"]}/>);
  const linkElement = screen.getByText(/Feels like: feels_like/i);
  expect(linkElement).toBeInTheDocument();
});
test('Weather shows humidity', () => {
  render(<Weather data={["02d","weather_desc","current_temp","feels_like","humidity","time"]}/>);
  const linkElement = screen.getByText(/The current humidity is: humidity/i);
  expect(linkElement).toBeInTheDocument();
});