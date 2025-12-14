import { describe, it, expect } from 'vitest';
import { parseCSV, analyzeColumn } from '../csvParser';

describe('CSV Parser', () => {
  it('should parse simple CSV correctly', () => {
    const csv = `Name,Email,Age
John Doe,john@example.com,30
Jane Smith,jane@example.com,25`;

    const result = parseCSV(csv);

    expect(result.columns).toEqual(['Name', 'Email', 'Age']);
    expect(result.rowCount).toBe(2);
    expect(result.rows[0]).toEqual({
      Name: 'John Doe',
      Email: 'john@example.com',
      Age: '30'
    });
  });

  it('should handle quoted values with commas', () => {
    const csv = `Name,Address
"Doe, John","123 Main St, Apt 4"
Jane Smith,456 Oak Ave`;

    const result = parseCSV(csv);

    expect(result.rows[0].Name).toBe('Doe, John');
    expect(result.rows[0].Address).toBe('123 Main St, Apt 4');
  });

  it('should handle empty values', () => {
    const csv = `Name,Email,Phone
John,,555-1234
,jane@example.com,`;

    const result = parseCSV(csv);

    expect(result.rows[0]).toEqual({
      Name: 'John',
      Email: '',
      Phone: '555-1234'
    });
    expect(result.rows[1]).toEqual({
      Name: '',
      Email: 'jane@example.com',
      Phone: ''
    });
  });

  it('should analyze column data completeness', () => {
    const rows = [
      { Email: 'john@example.com' },
      { Email: 'jane@example.com' },
      { Email: '' },
      { Email: 'bob@example.com' }
    ];

    const analysis = analyzeColumn('Email', rows);

    expect(analysis.name).toBe('Email');
    expect(analysis.nonEmptyCount).toBe(3);
    expect(analysis.completeness).toBe(75); // 3 out of 4
    expect(analysis.samples).toEqual([
      'john@example.com',
      'jane@example.com',
      'bob@example.com'
    ]);
  });

  it('should handle 100% complete columns', () => {
    const rows = [
      { Name: 'John' },
      { Name: 'Jane' },
      { Name: 'Bob' }
    ];

    const analysis = analyzeColumn('Name', rows);

    expect(analysis.completeness).toBe(100);
  });

  it('should handle 0% complete columns', () => {
    const rows = [
      { Phone: '' },
      { Phone: '' },
      { Phone: '' }
    ];

    const analysis = analyzeColumn('Phone', rows);

    expect(analysis.completeness).toBe(0);
    expect(analysis.samples).toEqual([]);
  });
});
