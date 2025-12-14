import { describe, it, expect } from 'vitest';
import { arrayToCSV, generateEnrichmentFilename } from './csv';

describe('CSV Utilities', () => {
  describe('arrayToCSV', () => {
    it('should convert array of objects to CSV string', () => {
      const data = [
        { name: 'John Doe', email: 'john@example.com', company: 'Acme Inc' },
        { name: 'Jane Smith', email: 'jane@example.com', company: 'Tech Corp' },
      ];

      const csv = arrayToCSV(data);
      const lines = csv.split('\n');

      expect(lines[0]).toBe('name,email,company');
      expect(lines[1]).toBe('John Doe,john@example.com,Acme Inc');
      expect(lines[2]).toBe('Jane Smith,jane@example.com,Tech Corp');
    });

    it('should handle values with commas by wrapping in quotes', () => {
      const data = [
        { name: 'John Doe', title: 'CEO, Founder' },
      ];

      const csv = arrayToCSV(data);
      const lines = csv.split('\n');

      expect(lines[1]).toBe('John Doe,"CEO, Founder"');
    });

    it('should handle values with quotes by escaping them', () => {
      const data = [
        { name: 'John "Johnny" Doe', title: 'CEO' },
      ];

      const csv = arrayToCSV(data);
      const lines = csv.split('\n');

      expect(lines[1]).toBe('"John ""Johnny"" Doe",CEO');
    });

    it('should handle null and undefined values', () => {
      const data = [
        { name: 'John Doe', email: null, phone: undefined },
      ];

      const csv = arrayToCSV(data);
      const lines = csv.split('\n');

      expect(lines[1]).toBe('John Doe,,');
    });

    it('should return empty string for empty array', () => {
      const csv = arrayToCSV([]);
      expect(csv).toBe('');
    });

    it('should handle newlines in values', () => {
      const data = [
        { name: 'John Doe', notes: 'Line 1\nLine 2' },
      ];

      const csv = arrayToCSV(data);
      
      // Newlines inside quoted values are preserved in CSV
      expect(csv).toContain('John Doe,"Line 1\nLine 2"');
    });
  });

  describe('generateEnrichmentFilename', () => {
    it('should generate filename with sanitized name and date', () => {
      const filename = generateEnrichmentFilename('Q4 Lead Enrichment');
      
      expect(filename).toMatch(/^enrichment_q4_lead_enrichment_\d{4}-\d{2}-\d{2}\.csv$/);
    });

    it('should sanitize special characters', () => {
      const filename = generateEnrichmentFilename('Test@#$%^&*()Enrichment');
      
      // Special characters are replaced with underscores
      expect(filename).toMatch(/^enrichment_test_+enrichment_\d{4}-\d{2}-\d{2}\.csv$/);
    });

    it('should handle spaces', () => {
      const filename = generateEnrichmentFilename('My Test Enrichment');
      
      expect(filename).toMatch(/^enrichment_my_test_enrichment_\d{4}-\d{2}-\d{2}\.csv$/);
    });
  });
});
