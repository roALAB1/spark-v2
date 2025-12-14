/**
 * CSV Parser Utility
 * Parses CSV files and analyzes column data for enrichment mapping
 */

export interface ParsedCSV {
  columns: string[];                    // Column headers
  rows: Record<string, string>[];      // Array of row objects
  rowCount: number;                    // Total number of rows
}

export interface ColumnData {
  name: string;                        // Column header
  values: string[];                    // All values in this column
  nonEmptyCount: number;               // Count of non-empty values
  completeness: number;                // Percentage (0-100)
  samples: string[];                   // First 4 non-empty values
}

/**
 * Parse CSV text into structured data
 */
export function parseCSV(text: string): ParsedCSV {
  const lines = text.trim().split('\n');
  
  if (lines.length === 0) {
    throw new Error('CSV file is empty');
  }
  
  // Parse headers
  const headers = parseCSVLine(lines[0]);
  
  if (headers.length === 0) {
    throw new Error('CSV file has no columns');
  }
  
  // Parse rows
  const rows: Record<string, string>[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue; // Skip empty lines
    
    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || '';
    });
    
    rows.push(row);
  }
  
  return {
    columns: headers,
    rows,
    rowCount: rows.length
  };
}

/**
 * Parse a single CSV line, handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add last field
  result.push(current.trim());
  
  return result;
}

/**
 * Analyze a single column's data
 */
export function analyzeColumn(
  columnName: string,
  rows: Record<string, string>[]
): ColumnData {
  const values = rows.map(row => row[columnName] || '');
  const nonEmptyValues = values.filter(v => v.trim() !== '');
  
  return {
    name: columnName,
    values,
    nonEmptyCount: nonEmptyValues.length,
    completeness: rows.length > 0 
      ? Math.round((nonEmptyValues.length / rows.length) * 100)
      : 0,
    samples: nonEmptyValues.slice(0, 4)
  };
}

/**
 * Analyze all columns in parsed CSV
 */
export function analyzeAllColumns(parsed: ParsedCSV): ColumnData[] {
  return parsed.columns.map(column => analyzeColumn(column, parsed.rows));
}
