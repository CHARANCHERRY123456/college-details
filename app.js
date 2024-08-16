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
    df = await dfd.readCSV("the_data.csv");
    // df['name'].print();
    df['name'] = df['name'].values.map(String);// Convert the 'name' column to an array of strings
    // console.log(df['name']);
}
oorke();

app.get("/" , (req , res)=>{
    res.sendFile(__dirname , "/public./index/html");
});
// Endpoint to search for names

app.get('/search', (req, res) => {
    const query = req.query.name.toUpperCase();
    const filteredNames = df.values.filter(row => row[1].includes(query)).map(row => row[1]);
    const suggestions = {
        "names" : filteredNames
    }
    res.json(suggestions);
});
app.get("/get_id" , (req , res)=>{
    console.log("Emtered");
    const name = req.query.name;
    const sid_row = df.query(df['name'].eq(name));
    var json_df = dfd.toJSON(sid_row, { format: 'row' });
    console.log(json_df);
    res.json(json_df)
})

app.listen(3000, () => {
    console.log('Server is running on port ' , port);
});
