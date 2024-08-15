import * as dfd from 'danfojs-node';

// Load the CSV file into a DataFrame
async function oorke(){
    var df = await dfd.readCSV("the_data.csv");
    df.print()

}
oorke();
