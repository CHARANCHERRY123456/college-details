import fs from 'fs';
import Papa from 'papaparse';
import * as dfd from 'danfojs-node';
// Function to read the CSV file and create a DataFrame
function createDataFrameFromCSV(filePath) {
    const csvFile = fs.readFileSync(filePath, 'utf8');

    // Parse the CSV data
    const parsedData = Papa.parse(csvFile, {
        header: true, // Automatically set the first row as the header
        skipEmptyLines: true, // Skip empty lines
    });

    // Convert the parsed data into a DataFrame
    const df = new dfd.DataFrame(parsedData.data);

    return df;
}

// Example usage
const filePath = './your-file.csv'; // Replace with your CSV file path
// const df = createDataFrameFromCSV(filePath);

var json_data = [
    { A: 0.4612, B: 4.28283, C: -1.509, D: -1.1352 },
    { A: 0.5112, B: -0.22863, C: -3.39059, D: 1.1632 },
    { A: 0.6911, B: -0.82863, C: -1.5059, D: 2.1352 },
    { A: 0.4692, B: -1.28863, C: 4.5059, D: 4.1632 }
]

var df = new dfd.DataFrame(json_data)
// df.print()

df.ctypes.print()

