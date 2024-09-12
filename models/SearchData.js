import mongoose from 'mongoose';

const SearchDataSchema = new mongoose.Schema({
  person: { type: String, required: true },
  searched_for: [String]
});

const SearchData = mongoose.model("SearchData", SearchDataSchema);
export default SearchData;
