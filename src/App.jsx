import React, { useState, useEffect } from 'react';

function App() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    date: '',
    description: '',
    debitAccount: '',
    creditAccount: '',
    debitAmount: 0,
    creditAmount: 0,
  });
  const [ledgerAccount, setLedgerAccount] = useState('');
  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const handleEntryChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleAmountChange = (e) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: parseFloat(e.target.value) || 0,
    }); // Handle potential NaN
  };

  const addEntry = () => {
    if (
      newEntry.debitAccount &&
      newEntry.creditAccount &&
      newEntry.debitAmount &&
      newEntry.creditAmount &&
      newEntry.debitAmount === newEntry.creditAmount &&
      newEntry.date &&
      newEntry.description
    ) {
      // Basic validation

      setEntries([...entries, newEntry]);
      setNewEntry({
        date: '',
        description: '',
        debitAccount: '',
        creditAccount: '',
        debitAmount: 0,
        creditAmount: 0,
      }); // Clear the form

      // Update the list of accounts
      if (!accounts.includes(newEntry.debitAccount)) {
        setAccounts([...accounts, newEntry.debitAccount]);
      }
      if (!accounts.includes(newEntry.creditAccount)) {
        setAccounts([...accounts, newEntry.creditAccount]);
      }
    } else {
      alert(
        'Please fill out all fields correctly. Debit and Credit amounts must be equal and non-zero.'
      );
    }
  };

  const generateLedger = () => {
    const ledger = entries.filter(
      (entry) =>
        entry.debitAccount === ledgerAccount ||
        entry.creditAccount === ledgerAccount
    );
    setLedgerEntries(ledger);
  };

  return (
    <div className="container">
      <h1>Accounting App</h1>
      <h2>Add Entry</h2>
      <div className="form">
        <input
          type="date"
          name="date"
          value={newEntry.date}
          onChange={handleEntryChange}
          placeholder="Date"
          required
        />
        <input
          type="text"
          name="description"
          value={newEntry.description}
          onChange={handleEntryChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="debitAccount"
          value={newEntry.debitAccount}
          onChange={handleEntryChange}
          placeholder="Debit Account"
          required
        />
        <input
          type="text"
          name="creditAccount"
          value={newEntry.creditAccount}
          onChange={handleEntryChange}
          placeholder="Credit Account"
          required
        />
        <input
          type="number"
          name="debitAmount"
          value={newEntry.debitAmount}
          onChange={handleAmountChange}
          placeholder="Debit Amount"
          required
        />
        <input
          type="number"
          name="creditAmount"
          value={newEntry.creditAmount}
          onChange={handleAmountChange}
          placeholder="Credit Amount"
          required
        />
        <button onClick={addEntry}>Add Entry</button>
      </div>
      <h2>Account Book</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Debit Account</th>
            <th>Credit Account</th>
            <th>Debit Amount</th>
            <th>Credit Amount</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.description}</td>
              <td>{entry.debitAccount}</td>
              <td>{entry.creditAccount}</td>
              <td>{entry.debitAmount}</td>
              <td>{entry.creditAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Ledger</h2>
      <select
        value={ledgerAccount}
        onChange={(e) => setLedgerAccount(e.target.value)}
      >
        <option value="">Select Account</option>
        {accounts.map((account) => (
          <option key={account} value={account}>
            {account}
          </option>
        ))}
      </select>
      <button onClick={generateLedger} disabled={!ledgerAccount}>
        Generate Ledger
      </button>{' '}
      {/* Disable if no account is selected */}
      {ledgerEntries.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Debit</th>
              <th>Credit</th>
            </tr>
          </thead>

          <tbody>
            {ledgerEntries.map((entry, index) => (
              <tr key={index}>
                <td>{entry.date}</td>
                <td>{entry.description}</td>
                <td>
                  {entry.debitAccount === ledgerAccount
                    ? entry.debitAmount
                    : ''}
                </td>
                <td>
                  {entry.creditAccount === ledgerAccount
                    ? entry.creditAmount
                    : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
