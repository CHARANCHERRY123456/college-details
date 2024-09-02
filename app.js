import * as dfd from 'danfojs-node';
import express from 'express'
import bodyParser  from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load the CSV file into a DataFrame
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

// Load the CSV file into a DataFrame
let df = {};

async function oorke(req , res){
    df = await dfd.readCSV("the_data_with_rank.csv");
    // df['NAME'].print();
    df['NAME'] = df['NAME'].values.map(String);// Convert the 'NAME' column to an array of strings
}
oorke();

app.get("/" , (req , res)=>{
    res.sendFile(__dirname , "/public./test.html");
});
// Endpoint to search for names

app.get('/search', (req, res) => {
    const query = req.query.name.toUpperCase();
    const filteredNames = df.values.filter(row => row[2].includes(query)).map(row => row[2]);
    const suggestions = {
        "names" : filteredNames
    }
    res.json(suggestions);
});
app.get("/get_id" , (req , res)=>{
    const NAME = req.query.name;
    const sid_row = df.query(df['NAME'].eq(NAME));
    var json_df = dfd.toJSON(sid_row, { format: 'row' });
    res.json(json_df);
});

app.listen(port, () => {
    console.log('Server is running on port ' , port);
});
