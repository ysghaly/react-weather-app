import { render, screen } from '@testing-library/react';
import Form from '../components/Form';

test('Refresh Button labeled correctly', () => {
  render(<Form />);
  const linkElement = screen.getByText(/Refresh/i);
  expect(linkElement).toBeInTheDocument();
});
