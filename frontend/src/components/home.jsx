import React, { useState, useEffect } from 'react';
import Navbar from './navbar.jsx';

const Home = () => {
  const [email, setEmail] = useState(''); // You'll set this based on user authentication logic
  const [query, setQuery] = useState('');
  const [suggestedNames, setSuggestedNames] = useState([]);
  const [data, setData] = useState(null);
  const [batch, setBatch] = useState(''); // Default batch, replace if needed
  const handleSearch = async (name, batch) => {
    try {
      const response = await fetch(`/get_id?name=${encodeURIComponent(name)}&batch=${encodeURIComponent(batch)}`);
      const data = await response.json();
      if (data.success === false) {
        // Handle error scenario
        console.log('Access to user data is restricted');
      } else {
        // Handle success scenario
        console.log('User data:', data);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`/search?name=${encodeURIComponent(query)}&batch=${encodeURIComponent(batch)}`);
      const suggestions = await response.json();
      setSuggestedNames(suggestions.names || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === '') {
      alert('Please enter a name to search.');
      return;
    }
    try {
      const response = await fetch(`/get_id?name=${encodeURIComponent(query)}&batch=${encodeURIComponent(batch)}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (query.trim() !== '') {
      fetchSuggestions(query);
    } else {
      setSuggestedNames([]);
    }
  }, [query]);

  return (
    <div>
        <Navbar onSearch={handleSearch} />
      <div className="body">
        {email === "rr200589@rguktrkv.ac.in" && (
          <div className="admin-view">
            <a href="charan/get_users">Get User</a>
            <a href="charan/get_search_data">Get Search Data</a>
            <a href="charan/get_friends">Get Friends</a>
            <form action="/add_friend" method="post">
              <input type="text" name="email" placeholder="add_friend" />
              <input type="submit" />
            </form>
          </div>
        )}
        <form id="searchForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="searchInput"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name"
            list="suggestedNames"
          />
          <datalist id="suggestedNames">
            {suggestedNames.map((name, index) => (
              <option key={index} value={name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
        <div id="result" className="container">
          {data ? (
            data.success === false ? (
              <p>
                Sorry, you can only see other public users if you are a public user for privacy issues. Try searching
                for other users if they are public.
              </p>
            ) : (
              <div>
                <div className="photo">
                  <img
                    src={data.IMAGE && data.IMAGE[0] ? data.IMAGE[0] : 'default-image.jpg'}
                    alt="User Image"
                    className="img-fluid image"
                  />
                  <h2>{data.NAME && data.NAME[0] ? data.NAME[0] : 'Not Available'}</h2>
                  <p><strong>ID:</strong> {data.ID && data.ID[0] ? data.ID[0] : 'Not Available'}</p>
                  <p><strong>Phone:</strong> {data.PHONE && data.PHONE[0] ? data.PHONE[0] : 'Not Available'}</p>
                  <p><strong>CGPA:</strong> {data.CGPA && data.CGPA[0] ? data.CGPA[0] : 'Not Available'}</p>
                  <p><strong>B_RANK:</strong> {data.RANK && data.RANK[0] ? data.RANK[0] : 'Not Available'}</p>
                  <p><strong>Branch:</strong> {data.BRANCH && data.BRANCH[0] ? data.BRANCH[0] : 'Not Available'}</p>
                  <p><strong>SECTION:</strong> {data.SECTION && data.SECTION[0] ? data.SECTION[0] : 'Not Available'}</p>
                  <p><strong>Date of Birth:</strong> {data.DOB && data.DOB[0] ? data.DOB[0] : 'Not Available'}</p>
                </div>
                <div className="details">
                  <p><strong>Gender:</strong> {data.GENDER && data.GENDER[0] ? data.GENDER[0] : 'Not Available'}</p>
                  <p><strong>Caste:</strong> {data.CASTE && data.CASTE[0] ? data.CASTE[0] : 'Not Available'}</p>
                  <p><strong>District:</strong> {data.DISTRICT && data.DISTRICT[0] ? data.DISTRICT[0] : 'Not Available'}</p>
                  <p><strong>Father:</strong> {data.FATHER && data.FATHER[0] ? data.FATHER[0] : 'Not Available'}</p>
                  <p><strong>Mother:</strong> {data.MOTHER && data.MOTHER[0] ? data.MOTHER[0] : 'Not Available'}</p>
                  <p><strong>Mandal:</strong> {data.MANDAL && data.MANDAL[0] ? data.MANDAL[0] : 'Not Available'}</p>
                  <p><strong>CET HT NO.:</strong> {data['CET HT NO.'] && data['CET HT NO.'][0] ? data['CET HT NO.'][0] : 'Not Available'}</p>
                  <p><strong>School:</strong> {data.SCHOOL && data.SCHOOL[0] ? data.SCHOOL[0] : 'Not Available'}</p>
                  <p><strong>SSC HT:</strong> {data.SSC && data.SSC[0] ? data.SSC[0] : 'Not Available'}</p>
                  <p><strong>Parent PhNo:</strong> {data.PARENT && data.PARENT[0] ? data.PARENT[0] : 'Not Available'}</p>
                  <p><strong>Address:</strong> {data.ADDRESS && data.ADDRESS[0] ? data.ADDRESS[0] : 'Not Available'}</p>
                  <p><strong>e1sem1:</strong> {data.E1SEM1 && data.E1SEM1[0] ? data.E1SEM1[0] : 'Not Available'}</p>
                  <p><strong>e1sem2:</strong> {data.E1SEM2 && data.E1SEM2[0] ? data.E1SEM2[0] : 'Not Available'}</p>
                  <p><strong>e2sem1:</strong> {data.E2SEM1 && data.E2SEM1[0] ? data.E2SEM1[0] : 'Not Available'}</p>
                  <p><strong>e2sem2:</strong> {data.E2SEM2 && data.E2SEM2[0] ? data.E2SEM2[0] : 'Not Available'}</p>
                </div>
              </div>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
