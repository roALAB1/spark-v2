const fs = require('fs');

// Read CSV file
const csvContent = fs.readFileSync('/home/ubuntu/test.csv', 'utf-8');

// Simple CSV parser
function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  console.log('Headers:', headers);
  console.log('Total rows:', lines.length - 1);
  console.log('\nFirst 3 rows:');
  
  for (let i = 1; i <= Math.min(3, lines.length - 1); i++) {
    const values = lines[i].split(',');
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx]?.trim() || '';
    });
    console.log(`Row ${i}:`, row);
  }
}

parseCSV(csvContent);
