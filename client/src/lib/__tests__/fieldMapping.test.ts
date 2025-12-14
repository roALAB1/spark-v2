import { describe, it, expect } from 'vitest';
import { detectFields, validateMappings } from '../fieldMapping';

describe('Field Detection', () => {
  it('should detect email fields', () => {
    const columns = ['Email', 'PERSONAL_EMAILS', 'BUSINESS_EMAIL'];
    const rows = [
      {
        Email: 'john@example.com',
        PERSONAL_EMAILS: 'john.personal@gmail.com',
        BUSINESS_EMAIL: 'john@company.com'
      }
    ];

    const mappings = detectFields(columns, rows);

    expect(mappings[0].mappedField).toBe('EMAIL');
    expect(mappings[0].isAutoMapped).toBe(true);
    expect(mappings[1].mappedField).toBe('PERSONAL_EMAIL');
    expect(mappings[2].mappedField).toBe('BUSINESS_EMAIL');
  });

  it('should detect name fields', () => {
    const columns = ['FIRST_NAME', 'LAST_NAME', 'first name', 'lastname'];
    const rows = [
      {
        FIRST_NAME: 'John',
        LAST_NAME: 'Doe',
        'first name': 'Jane',
        'lastname': 'Smith'
      }
    ];

    const mappings = detectFields(columns, rows);

    expect(mappings[0].mappedField).toBe('FIRST_NAME');
    expect(mappings[1].mappedField).toBe('LAST_NAME');
    expect(mappings[2].mappedField).toBe('FIRST_NAME');
    expect(mappings[3].mappedField).toBe('LAST_NAME');
  });

  it('should detect company fields', () => {
    const columns = ['COMPANY_NAME', 'COMPANY_DOMAIN', 'Company'];
    const rows = [
      {
        COMPANY_NAME: 'Acme Corp',
        COMPANY_DOMAIN: 'acme.com',
        Company: 'Tech Inc'
      }
    ];

    const mappings = detectFields(columns, rows);

    expect(mappings[0].mappedField).toBe('COMPANY_NAME');
    expect(mappings[1].mappedField).toBe('COMPANY_DOMAIN');
    expect(mappings[2].mappedField).toBe('COMPANY_NAME');
  });

  it('should detect LinkedIn URL', () => {
    const columns = ['LINKEDIN_URL', 'linkedin'];
    const rows = [
      {
        LINKEDIN_URL: 'https://linkedin.com/in/johndoe',
        linkedin: 'https://linkedin.com/in/janesmith'
      }
    ];

    const mappings = detectFields(columns, rows);

    expect(mappings[0].mappedField).toBe('LINKEDIN_URL');
    expect(mappings[1].mappedField).toBe('LINKEDIN_URL');
  });

  it('should detect address fields', () => {
    const columns = ['PERSONAL_ADDRESS', 'PERSONAL_CITY', 'PERSONAL_STATE', 'PERSONAL_ZIP'];
    const rows = [
      {
        PERSONAL_ADDRESS: '123 Main St',
        PERSONAL_CITY: 'New York',
        PERSONAL_STATE: 'NY',
        PERSONAL_ZIP: '10001'
      }
    ];

    const mappings = detectFields(columns, rows);

    expect(mappings[0].mappedField).toBe('PERSONAL_ADDRESS');
    expect(mappings[1].mappedField).toBe('PERSONAL_CITY');
    expect(mappings[2].mappedField).toBe('PERSONAL_STATE');
    expect(mappings[3].mappedField).toBe('PERSONAL_ZIP');
  });

  it('should calculate data completeness correctly', () => {
    const columns = ['Email'];
    const rows = [
      { Email: 'john@example.com' },
      { Email: 'jane@example.com' },
      { Email: '' },
      { Email: 'bob@example.com' }
    ];

    const mappings = detectFields(columns, rows);

    expect(mappings[0].completeness).toBe(75); // 3 out of 4
  });

  it('should not auto-map unknown columns', () => {
    const columns = ['RandomColumn', 'UnknownField'];
    const rows = [
      { RandomColumn: 'value1', UnknownField: 'value2' }
    ];

    const mappings = detectFields(columns, rows);

    expect(mappings[0].mappedField).toBeNull();
    expect(mappings[0].isAutoMapped).toBe(false);
    expect(mappings[1].mappedField).toBeNull();
    expect(mappings[1].isAutoMapped).toBe(false);
  });
});

describe('Mapping Validation', () => {
  it('should validate that at least one field is mapped', () => {
    const mappings = [
      {
        csvColumn: 'Email',
        mappedField: 'EMAIL',
        confidence: 90,
        completeness: 100,
        samples: [],
        isAutoMapped: true
      }
    ];

    const validation = validateMappings(mappings);

    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  it('should fail if no fields are mapped', () => {
    const mappings = [
      {
        csvColumn: 'Unknown',
        mappedField: null,
        confidence: 0,
        completeness: 100,
        samples: [],
        isAutoMapped: false
      }
    ];

    const validation = validateMappings(mappings);

    expect(validation.isValid).toBe(false);
    expect(validation.errors).toContain('At least one field must be mapped');
  });

  it('should ignore DO_NOT_IMPORT fields in validation', () => {
    const mappings = [
      {
        csvColumn: 'Column1',
        mappedField: 'DO_NOT_IMPORT',
        confidence: 100,
        completeness: 100,
        samples: [],
        isAutoMapped: false
      }
    ];

    const validation = validateMappings(mappings);

    expect(validation.isValid).toBe(false);
  });

  it('should pass if at least one field is mapped (ignoring DO_NOT_IMPORT)', () => {
    const mappings = [
      {
        csvColumn: 'Email',
        mappedField: 'EMAIL',
        confidence: 90,
        completeness: 100,
        samples: [],
        isAutoMapped: true
      },
      {
        csvColumn: 'Ignore',
        mappedField: 'DO_NOT_IMPORT',
        confidence: 100,
        completeness: 100,
        samples: [],
        isAutoMapped: false
      }
    ];

    const validation = validateMappings(mappings);

    expect(validation.isValid).toBe(true);
  });
});
