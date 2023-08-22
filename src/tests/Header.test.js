import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

test('High Temp warning is shown', () => {
  render(<Header temp={35} />);
  const linkElement = screen.getByText(/Caution: High Temperatures/i);
  expect(linkElement).toBeInTheDocument();
});

test('Low Temp warning is shown', () => {
  render(<Header temp={-35} />);
  const linkElement = screen.getByText(/Caution: Low Temperatures/i);
  expect(linkElement).toBeInTheDocument();
});

test('No warning is shown', () => {
  render(<Header temp={10} />);
  const linkElement = screen.queryByText(/Caution/i);
  expect(linkElement).not.toBeInTheDocument();
});
