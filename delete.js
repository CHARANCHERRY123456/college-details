import * as dfd from 'danfojs-node';


// Sample DataFrame
const data = {
    name: ["charan", "cherry", "raga", "query"],
    age: [18, 19, 20, 30]
};

const df = new dfd.DataFrame(data);

// The substring to search for
const substring = "ra";

// Filter the DataFrame to find names containing the substring
const filteredNames = df.values.filter(row => row[0].includes(substring)).map(row => row[0]);
console.log(filteredNames);

