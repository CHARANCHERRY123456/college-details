import * as dfd from 'danfojs-node';

let data = {
    "A": ["Ng", "Yu", "Mo", "Ng"],
    "B": [34, 4, 5, 6],
    "C": [20, 20, 30, 40]
}
let df = new dfd.DataFrame(data)
df.print()
let query_df = df.query(df["B"].gt(5));
query_df.print() //after query

