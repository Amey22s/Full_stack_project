import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsOnSale, getMyItems, getApprovalRequests } from '../../Actions/Item'; // Make sure these actions are defined
import './Marketplace.css'; // Your CSS for styling

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('itemsOnSale');
  const dispatch = useDispatch();
  const { itemsOnSale, myItems, approvalRequests, loading, error } = useSelector(state => state.item);

  useEffect(() => {
    dispatch(getItemsOnSale());
    dispatch(getMyItems());
    dispatch(getApprovalRequests());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="marketplace">
      <div className="tabs">
        <button onClick={() => setActiveTab('itemsOnSale')}>Items on Sale</button>
        <button onClick={() => setActiveTab('myItems')}>My Items</button>
        <button onClick={() => setActiveTab('approvalRequests')}>Approval Requests</button>
      </div>

      {activeTab === 'itemsOnSale' && (
        <div className="itemsList">
          {itemsOnSale.map(item => (
            <div key={item._id} className="item">
              <img src={item.image.url} alt={item.caption} />
              <h3>{item.caption}</h3>
              <p>Price: ${item.price}</p>
              {/* Add more item details and actions here */}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'myItems' && (
        <div className="itemsList">
          {myItems.map(item => (
            <div key={item._id} className="item">
              <img src={item.image.url} alt={item.caption} />
              <h3>{item.caption}</h3>
              <p>Price: ${item.price}</p>
              {/* Add more item details and actions here */}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'approvalRequests' && (
        <div className="itemsList">
          {approvalRequests.map(item => (
            <div key={item._id} className="item">
              <img src={item.image.url} alt={item.caption} />
              <h3>{item.caption}</h3>
              <p>Interested Buyers: {item.interestedBuyers.length}</p>
              {/* Implement functionality to approve sale */}
              {/* For each interested buyer, you can add a button or link to approve the sale */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
