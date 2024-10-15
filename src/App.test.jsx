import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('Form should have required input fields and Add Entry button', () => {
  const { container, getAllByText, queryByPlaceholderText } = render(<App />);

  expect(container.querySelector('input[name="date"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="description"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="debitAccount"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="creditAccount"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="debitAmount"]')).toBeInTheDocument();
  expect(container.querySelector('input[name="creditAmount"]')).toBeInTheDocument();

  expect(getAllByText('Add Entry')[1]).toBeInTheDocument();
  // console.log(getByLabelText, getByText, queryByPlaceholderText);
});

test('Initial table should have proper headers', () => {
  const { getByText } = render(<App />);

  expect(getByText('Date')).toBeInTheDocument();
  expect(getByText('Description')).toBeInTheDocument();
  expect(getByText('Debit Account')).toBeInTheDocument();
  expect(getByText('Credit Account')).toBeInTheDocument();
  expect(getByText('Debit Amount')).toBeInTheDocument();
  expect(getByText('Credit Amount')).toBeInTheDocument();
});

test('Initial select element should have only "Select Account" option', () => {
  const { getByText } = render(<App />);

  expect(getByText('Select Account')).toBeInTheDocument();
});

test('Generate Ledger button should be disabled initially', () => {
  const { getByText } = render(<App />);

  expect(getByText('Generate Ledger')).toBeDisabled();
});

test('Adding entry updates table with corresponding values', () => {
  const { getByLabelText, getByText, getAllByText, container } = render(<App />);

  // Enter values and click Add Entry
  const dateInput = container.querySelector('input[name="date"]');
  const descriptionInput = container.querySelector('input[name="description"]');
  const debitAccountInput = container.querySelector('input[name="debitAccount"]');
  const creditAccountInput = container.querySelector('input[name="creditAccount"]');
  const debitAmountInput = container.querySelector('input[name="debitAmount"]');
  const creditAmountInput = container.querySelector('input[name="creditAmount"]');
  const addEntryButton = getAllByText('Add Entry')[1];

  const today = new Date().toISOString().slice(0, 10); // Get today's date

  dateInput.setAttribute('value', today);
  descriptionInput.setAttribute('value', 'Test 1');
  debitAccountInput.setAttribute('value', 'A1');
  creditAccountInput.setAttribute('value', 'A2');
  debitAmountInput.setAttribute('value', 250);
  creditAmountInput.setAttribute('value', 250);

  dateInput.dispatchEvent(new KeyboardEvent('change'));
  descriptionInput.dispatchEvent(new KeyboardEvent('change'));
  debitAccountInput.dispatchEvent(new KeyboardEvent('change'));
  creditAccountInput.dispatchEvent(new KeyboardEvent('change'));
  debitAmountInput.dispatchEvent(new KeyboardEvent('change'));
  creditAmountInput.dispatchEvent(new KeyboardEvent('change'));

  addEntryButton.dispatchEvent(new MouseEvent('click'));

  // Check for updated table row
  setTimeout(() => {
    expect(getByText(today)).toBeInTheDocument();
    expect(getByText('Test 1')).toBeInTheDocument();
    expect(getByText('A1')).toBeInTheDocument();
    expect(getByText('A2')).toBeInTheDocument();
    expect(getByText(250)).toBeInTheDocument(); // Both debit and credit amount
  }, 200);
});

test('Adding entry updates select element and enables Generate Ledger button', () => {
  const { getByLabelText, getByText, queryByText } = render(<App />);

  // Enter values and click Add Entry (same as previous test)

  // ... (same code as previous test)

  // Check for updated select element and enabled button
  setTimeout(() => {
    expect(getByText('A1')).toBeInTheDocument();
    expect(getByText('A2')).toBeInTheDocument();
    expect(getByText('Generate Ledger')).toBeEnabled();
  }, 200);
});

test('Generating ledger for an account should display table with filtered data', () => {
  const { getByLabelText, getByText, queryByText, container } = render(<App />);

  // ... (same steps as test 1 to add an entry)

  // Get select element and button
  const accountSelect = container.querySelector('select');
  const generateLedgerButton = getByText('Generate Ledger');

  // Select "A2" account
  accountSelect.setAttribute('value', 'A2');
  accountSelect.dispatchEvent(new KeyboardEvent('change'));

  // Click Generate Ledger button
  generateLedgerButton.dispatchEvent(new MouseEvent('click'));

  // Get ledger table
  const today = new Date().toISOString().slice(0, 10);

  setTimeout(() => {
    const ledgerTable = container.querySelectorAll('table')[1];
  
    // Expect table to have first row
    expect(ledgerTable).toBeTruthy();
  
    expect(ledgerTable.children[0].children[0].children[0].textContent).toBe('Date');
    expect(ledgerTable.children[0].children[0].children[1].textContent).toBe('Description');
    expect(ledgerTable.children[0].children[0].children[2].textContent).toBe('Debit');
    expect(ledgerTable.children[0].children[0].children[3].textContent).toBe('Credit');
  
    expect(ledgerTable.children[1].children[0].children[0].textContent).toBe(today);
    expect(ledgerTable.children[1].children[0].children[1].textContent).toBe('Test 1');
    expect(ledgerTable.children[1].children[0].children[2].textContent).toBe('250');
    expect(ledgerTable.children[1].children[0].children[3].textContent).toBe('');
  }, 200);
});
