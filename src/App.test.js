import { render, screen } from '@testing-library/react';
import App from './App';

test('renders providers', () => {
  render(<App />);
  const linkElement = screen.getByText(/Manos libres/i);
  expect(linkElement).toBeInTheDocument();
});
