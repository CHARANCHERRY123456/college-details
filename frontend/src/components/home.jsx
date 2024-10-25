import React, { useState } from 'react';

const Home = () => {
  // State for search input and search results (simulating 20 fields of data)
  const [searchInput, setSearchInput] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  // Simulated search data, typically this would be fetched from a backend
  const mockData = [
    {
      name: 'John Doe',
      age: 29,
      email: 'johndoe@example.com',
      address: '1234 React St',
      phone: '123-456-7890',
      company: 'React Corp',
      jobTitle: 'Developer',
      city: 'New York',
      country: 'USA',
      website: 'https://johndoe.com',
      linkedin: 'https://linkedin.com/in/johndoe',
      github: 'https://github.com/johndoe',
      twitter: '@johndoe',
      education: 'B.Sc. Computer Science',
      skills: 'JavaScript, React, Node.js',
      experience: '5 years',
      certifications: 'React Certified Developer',
      languages: 'English, Spanish',
      hobbies: 'Coding, Gaming',
      bio: 'A passionate developer focused on building React applications.'
    },
    // You can add more users here
  ];

  // Handle search functionality
  const handleSearch = () => {
    // Simulating a backend search by finding a match in mockData
    const result = mockData.find(user => user.name.toLowerCase().includes(searchInput.toLowerCase()));
    setUserDetails(result || null); // Set result or null if no match found
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>User Search</h1>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by name..."
        style={{
          padding: '10px',
          width: '100%',
          marginBottom: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '10px 20px',
          backgroundColor: '#61dafb',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>

      {userDetails ? (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
          lineHeight: '1.6',
        }}>
            <div className="details-grid">
            {userDetails && Object.keys(userDetails).map((UserKey)=>{
                return (
                    UserKey != 'key' && ( <p key={UserKey}> <b>{UserKey}</b> : {userDetails[UserKey]} </p>)
                )
            })}
            </div>
        </div>
      ) : (
        <p>No user found. Please search by name.</p>
      )}
    </div>
  );
};

export default Home;
