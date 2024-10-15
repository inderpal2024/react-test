import { render, screen } from '@testing-library/react';
import App from './App';

test('Form should have required input fields and Add Entry button', () => {
  const { getByLabelText, getByText } = render(<App />);

  expect(getByLabelText('Date')).toBeInTheDocument();
  expect(getByLabelText('Description')).toBeInTheDocument();
  expect(getByLabelText('Debit Account')).toBeInTheDocument();
  expect(getByLabelText('Credit Account')).toBeInTheDocument();
  expect(getByLabelText('Debit Amount')).toBeInTheDocument();
  expect(getByLabelText('Credit Amount')).toBeInTheDocument();

  expect(getByText('Add Entry')).toBeInTheDocument();
});
