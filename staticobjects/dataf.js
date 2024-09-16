import csv from 'csvtojson';
import path from 'path';

let df = [];

async function loadCSV() {
    df = await csv().fromFile("the_data_with_rank.csv");
}

// Call the CSV loading function and wait for it to complete
await loadCSV();

// Function to get name by email
export function get_name_by_email(email) {
    const row = df.find(item => item['EMAIL'] === email); // Find the row with the matching email
    return row ? row['NAME'] : null; // Return name if found, otherwise return null
}
// Function to get email by name
export function get_email_by_name(name) {
    const row = df.find(item => item['NAME'] === name); // Find the row with the matching name
    return row ? row['EMAIL'] : null; // Return email if found, otherwise return null
}



export default df