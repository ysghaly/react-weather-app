import { render, screen } from '@testing-library/react';
import Location from '../components/Location';

test('Location shows current time', () => {
  render(<Location data={["city", "state", "country", "time"]} />);
  const linkElement = screen.getByText(/Current time: time/i);
  expect(linkElement).toBeInTheDocument();
});

test('Location shows city, state and country', () => {
  render(<Location data={["city", "state", "country", "time"]} />);
  const linkElement = screen.getByText(/city, state, country/i);
  expect(linkElement).toBeInTheDocument();
});
