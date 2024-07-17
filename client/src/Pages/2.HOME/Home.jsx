import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';  // Import the CSS file for card styling

const Home = () => {
  const [selectedDb, setSelectedDb] = useState(null);
  const [formData, setFormData] = useState({
    MYSQL_HOST: '',
    MYSQL_USER: '',
    MYSQL_PASSWORD: '',
    MYSQL_DATABASE: '',
    MYSQL_PORT: '',
    MONGO_CONNECTION_STRING: ''
  });
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/get-connections', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setConnections([...data.sqlConnections, ...data.mongoConnections]);
        } else {
          alert('Failed to fetch connections');
        }
      } catch (error) {
        alert('Error fetching connections');
      }
    };

    fetchConnections();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    let apiEndpoint = '';
    let data = {};

    if (selectedDb === 'mysql') {
      apiEndpoint = 'http://localhost:4000/api/sql-connection';
      data = {
        MYSQL_HOST: formData.MYSQL_HOST,
        MYSQL_USER: formData.MYSQL_USER,
        MYSQL_PASSWORD: formData.MYSQL_PASSWORD,
        MYSQL_DATABASE: formData.MYSQL_DATABASE,
        MYSQL_PORT: formData.MYSQL_PORT
      };
    } else if (selectedDb === 'mongodb') {
      apiEndpoint = 'http://localhost:4000/api/mongo-connection';
      data = {
        connectionString: formData.MONGO_CONNECTION_STRING
      };
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (response.ok) {
        navigate('/chat');
      } else {
        alert('Error');
      }
    } catch (error) {
      alert('Error');
    }
  };

  const handleCardClick = async (connection) => {
    let apiEndpoint = '';
    let data = {};

    if (connection.host) {
      // MySQL Connection
      apiEndpoint = 'http://localhost:4000/api/sql-connection';
      data = {
        MYSQL_HOST: connection.host,
        MYSQL_USER: connection.user,
        MYSQL_PASSWORD: connection.password,
        MYSQL_DATABASE: connection.database,
        MYSQL_PORT: connection.port
      };
    } else if (connection.connectionString) {
      // MongoDB Connection
      apiEndpoint = 'http://localhost:4000/api/mongo-connection';
      data = {
        connectionString: connection.connectionString
      };
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (response.ok) {
        navigate('/chat');
      } else {
        alert('Error establishing connection');
      }
    } catch (error) {
      alert('Error');
    }
  };

  return (
    <div>
      <h1>Select Database</h1>
      <div>
        <button onClick={() => setSelectedDb('mysql')}>MySQL</button>
        <button onClick={() => setSelectedDb('mongodb')}>MongoDB</button>
      </div>

      {selectedDb === 'mysql' && (
        <div>
          <h2>MySQL Connection</h2>
          <form>
            <div>
              <label>MYSQL_HOST:</label>
              <input
                type="text"
                name="MYSQL_HOST"
                value={formData.MYSQL_HOST}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>MYSQL_USER:</label>
              <input
                type="text"
                name="MYSQL_USER"
                value={formData.MYSQL_USER}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>MYSQL_PASSWORD:</label>
              <input
                type="password"
                name="MYSQL_PASSWORD"
                value={formData.MYSQL_PASSWORD}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>MYSQL_DATABASE:</label>
              <input
                type="text"
                name="MYSQL_DATABASE"
                value={formData.MYSQL_DATABASE}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>MYSQL_PORT:</label>
              <input
                type="text"
                name="MYSQL_PORT"
                value={formData.MYSQL_PORT}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      )}

      {selectedDb === 'mongodb' && (
        <div>
          <h2>MongoDB Connection</h2>
          <form>
            <div>
              <label>Connection String:</label>
              <input
                type="text"
                name="MONGO_CONNECTION_STRING"
                value={formData.MONGO_CONNECTION_STRING}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      )}

      {selectedDb && (
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}

      <h2>Connections</h2>
      <div className="card-container">
        {connections.map((connection, index) => (
          <div
            className="card"
            key={index}
            onClick={() => handleCardClick(connection)}
            style={{ cursor: 'pointer' }}
          >
            <h3>{connection.host ? 'MySQL' : 'MongoDB'}</h3>
            {connection.host && (
              <>
                <p>Host: {connection.host}</p>
                <p>User: {connection.user}</p>
                <p>Password: {connection.password}</p>
                <p>Database: {connection.database}</p>
                <p>Port: {connection.port}</p>
              </>
            )}
            {connection.connectionString && (
              <p>Connection String: {connection.connectionString}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
