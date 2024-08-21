import fs from 'fs';
import { nanoid } from 'nanoid';

// Load the existing JSON data
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Add unique IDs to each mechanic review if not already present
const updatedData = data.map(mechanic => ({
    ...mechanic,
    id: mechanic.id || nanoid(),  // Generate a unique ID if not already present
}));

// Save the updated data back to the JSON file
fs.writeFileSync('data_with_ids.json', JSON.stringify(updatedData, null, 2));

console.log('Updated JSON with unique IDs has been saved to data_with_ids.json');
