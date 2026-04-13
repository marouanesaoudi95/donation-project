import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [myDonations, setMyDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Example of using the requested structure for data fetching
  const fetchMyData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/v1/donations/my/donations', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setMyDonations(data);
      } else {
        console.error('Failed to fetch data:', data.msg);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1>Welcome, {user?.name || 'User'}!</h1>
        <p>Manage your donations and track your impact.</p>
      </div>

      <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div className="stat-card" style={{ background: 'var(--accent-bg)', padding: '20px', borderRadius: '12px', border: '1px solid var(--accent-border)' }}>
          <h4 style={{ margin: 0 }}>My Donations</h4>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--accent)', margin: '10px 0 0' }}>{myDonations.length}</p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>My Recent Activity</h2>
        <Link to="/posts/create" className="btn-primary" style={{ width: 'auto' }}>Create New Donation</Link>
      </div>

      <div className="posts-grid">
        {myDonations.length > 0 ? (
          myDonations.map((item) => (
            <div key={item._id} className="post-card">
              <h3>{item.itemName}</h3>
              <p className="category">{item.category}</p>
              <div className="post-footer">
                <span>Status: {item.status || 'Available'}</span>
                <Link to={`/posts/edit/${item._id}`} className="btn-secondary">Edit</Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-posts" style={{ gridColumn: '1 / -1', padding: '40px', background: 'var(--social-bg)', borderRadius: '12px' }}>
            <p>You haven't posted any donations yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
