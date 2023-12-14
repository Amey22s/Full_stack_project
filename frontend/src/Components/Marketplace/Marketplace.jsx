import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsOnSale, getMyItems, markInterest, approveSale, declineSale } from '../../Actions/Item'; 
import { getTraderApprovalRequests } from '../../Actions/Trader';
import './Marketplace.css'; 
import { useAlert } from 'react-alert';

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState('itemsOnSale');
const [activeSubTab, setActiveSubTab] = useState('selling');
  const dispatch = useDispatch();
  const { itemsOnSale, myItems, message:itemMessage, loading:itemLoading, error:itemError } = useSelector(state => state.item);
  const traderProfile = useSelector(state => state.trader);
  const {approvalRequests, loading:traderLoading, error: traderError} = useSelector(state => state.trader);
  const alert=useAlert();
console.log("trader profile", traderProfile)
console.log("trader profile.trader", traderProfile.trader)
console.log("itrader profile trader id", traderProfile.trader._id)
console.log("approval request trader profile", traderProfile.approvalRequests)

  // Check if itemsBought is defined and is an array
  const itemsBought = traderProfile.trader && Array.isArray(traderProfile.trader.itemsBought)
  ? traderProfile.trader.itemsBought
  : [];
    console.log("ITEMS BOUGHT", itemsBought)
    console.log("Items bought", itemsBought)
  useEffect(() => {
    dispatch(getItemsOnSale());
    dispatch(getMyItems());
    
    dispatch(getTraderApprovalRequests(traderProfile.trader._id));
  }, [dispatch, traderProfile.trader]);
console.log(approvalRequests, "APPROVAL")
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  useEffect(() => {
    if (itemError) {
      alert.error(itemError);
      dispatch({ type: "clearItemErrors" }); // Replace with your actual action to clear item errors
    }
    if (itemMessage) {
      alert.success(itemMessage);
      dispatch({ type: "clearItemMessages" }); // Replace with your action to clear messages
    }
  }, [dispatch, itemError, alert, itemMessage]);
  
  useEffect(() => {
    if (traderError) {
      alert.error(traderError);
      dispatch({ type: "clearTraderErrors" }); // Replace with your actual action to clear trader errors
    }
  }, [dispatch, traderError, alert]);
  
  // Rest of your component rendering
  

  const handleMarkInterest = (itemId) =>{
    dispatch(markInterest(itemId));
  }
  const handleApprove = (itemId, buyerId) => {
    dispatch(approveSale(itemId, buyerId, traderProfile.trader._id));
  }

  const handleDecline = (itemId, buyerId) => {
    dispatch(declineSale(itemId, buyerId, traderProfile.trader._id));
  }
  console.log(approvalRequests, "approval request before rendie==ering")

  return (
    <div className="marketplace">
      <div className="tabs">
        <button onClick={() => setActiveTab('itemsOnSale')}>Items on Sale</button>
        <button onClick={() => setActiveTab('myItems')}>My Items</button>
        <button onClick={() => setActiveTab('approvalRequests')}>Approval Requests</button>
      </div>

      {activeTab === 'itemsOnSale' && (
        <div className="itemsList">
          {itemsOnSale.filter(item => item.status === 'available').map(item => (
            <div key={item._id} className="itemCard">
              <img src={item.image.url} alt={item.caption} />
              <div className='itemDetails'>
              <h3>{item.caption}</h3>
              <p>Price: ${item.price}</p>
              <Button onClick={()=> handleMarkInterest(item._id)}>Mark Interest</Button>
              
              </div>
              {/* Add more item details and actions here */}
            </div>
          ))}
        </div>
      )}

{activeTab === 'myItems' && (
  <div>
    <div className="tabs">
      <button onClick={() => setActiveSubTab('selling')}>Selling</button>
      <button onClick={() => setActiveSubTab('bought')}>Bought</button>
    </div>

    <div className="itemsList">
      {activeSubTab === 'selling' && myItems.map(item => (
        <div key={item._id} className="itemCard">
          <div className="itemImage">
            <img src={item.image.url} alt={item.caption} />
          </div>
          <div className="itemDetails">
            <h3>{item.caption}</h3>
            <p>Price: ${item.price}</p>
            <p>Status: {item.status}</p>
            {item.status === 'available' && item.interestedBuyers && (
          <p>Interested Buyers: {item.interestedBuyers.length}</p>
        )}
        {item.status === 'pending' &&  (
          // Render the name of the buyer. You need to fetch the buyer's details based on item.soldTo
          <p>Sale in progress</p>
        )}
         {item.status === 'sold' && item.soldTo && (
          // Render the name of the buyer. You need to fetch the buyer's details based on item.soldTo
          <p>Sold to: {item.soldTo.name}</p>
        )}

            {/* Add more item details and actions here */}
          </div>
        </div>
      ))}
      {activeSubTab === 'bought' && itemsBought.map(item => (
        <div key={item._id} className="itemCard">
          <div className="itemImage">
            <img src={item.image.url} alt={item.caption} />
          </div>
          <div className="itemDetails">
            <h3>{item.caption}</h3>
            <p>Price: ${item.price}</p>
            {/* Add more details if needed */}
          </div>
        </div>
      ))}
    </div>
  </div>
)}


      {activeTab === 'approvalRequests' && (
        <div className="approvalList">
         
          {approvalRequests.map(request => (
            
            <div key={request.itemId} className="approvalCard">
              <div className='approvalDetails'>
                <h3 className='itemTitle'>Item Name: {request.itemId.caption}</h3>
          
                <div className="buyerInfo">
            <span className='buyerName'>Buyer Name: {request.buyerId.name}</span><p></p>
            </div>
            <div>
            <button onClick={() => handleApprove(request.itemId._id, request.buyerId._id)} className="approveBtn">Approve</button>
            <button onClick={() => handleDecline(request.itemId._id, request.buyerId._id)} className="declineBtn">Decline</button>
          </div>
             
              
              </div>
              
              
              
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
