import React from 'react';

// Helper function to calculate days remaining
const calculateDaysRemaining = (endDate) => {
  const today = new Date();
  const expirationDate = new Date(endDate);
  const timeDiff = expirationDate - today;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};

const SubscriptionCard = ({ subscriptionEndDate }) => {
  const daysRemaining = calculateDaysRemaining(subscriptionEndDate);


  
  
  return (
    <div style={styles.card}>
      <h2>Subscription Status</h2>
      <p>Status: <strong>{daysRemaining > 0 ? 'Active' : 'Expired'}</strong></p>
      <p>Days Remaining: <strong>{daysRemaining > 0 ? daysRemaining : 0}</strong></p>
    </div>
  );
};

const styles = {
  card: {
    position: 'absolute',
    top: '100px', // Adjust as needed
    right: '20px', // Adjust as needed
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '300px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow for a floating effect
    zIndex: 1000, // Ensure it's above other content
  },
};

export default SubscriptionCard;
