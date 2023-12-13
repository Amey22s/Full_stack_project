import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsOnSale, getMyItems, getApprovalRequests, markInterest, approveSale, declineSale } from '../../Actions/Item'; 
import './Marketplace.css'; 

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

  const handleMarkInterest = (itemId) =>{
    dispatch(markInterest(itemId));
  }
  const handleApprove = (itemId, buyerId) => {
    dispatch(approveSale(itemId, buyerId));
  }

  const handleDecline = (itemId, buyerId) => {
    dispatch(declineSale(itemId, buyerId));
  }
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
              <Button onClick={()=> handleMarkInterest(item._id)}>Mark Interest</Button>
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
              {item.interestedBuyers && (
          <p>Interested Buyers: {item.interestedBuyers.length}</p>
        )}
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
              {item.interestedBuyers.map(buyer =>(
                <div key={buyer._id}>
                  <span>{buyer.name}</span>
                  <button onClick={() => handleApprove(item._id, buyer._id)}>Approve</button>
                <button onClick={() => handleDecline(item._id, buyer._id)}>Decline</button>
                </div>
              ))}
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
