// import React, { useEffect } from "react";
// import { Avatar, Button, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from "react-alert";
// import Loader from "../Loader/Loader";
// import { logoutTrader } from "../../Actions/Trader";
// import { getTraderApprovalRequests } from '../../Actions/Trader';
// import { getItemsOnSale, getMyItems, approveSale, declineSale } from '../../Actions/Item'; 

// import {
//   getTraderProfile,
//   // Add any other actions you might need for the trader
// } from "../../Actions/Trader";

// const TraderProfile = () => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const {
//     trader: me,
//     approvalRequests,
//     traderProfile
//   } = useSelector((state) => state.trader);


//   const logoutHandler = () => {
//     dispatch(logoutTrader());
//   };

//   const handleApprove = (itemId, buyerId) => {
//     dispatch(approveSale(itemId, buyerId, traderProfile.trader._id));
//   }


//   const handleDecline = (itemId, buyerId) => {
//     dispatch(declineSale(itemId, buyerId, traderProfile.trader._id));
//   }


// console.log("ACc trader profile", traderProfile)
// console.log("Acc trader profile.trader", traderProfile.trader)
// console.log("Acc itrader profile trader id", traderProfile.trader._id)
// console.log("Acc approval request trader profile", traderProfile.approvalRequests)
//   const {
//     trader,
//     loading: traderLoading,
//     error: traderError,
//   } = useSelector((state) => state.traderProfile);


//   useEffect(() => {
//     dispatch(getTraderProfile(me._id));
//     // Dispatch any additional actions to fetch trader's data
//   }, [dispatch, me._id]);
  
//   //console.log("inside trader profile", trader)
//   useEffect(() => {
//     if (traderError) {
//       alert.error(traderError);
//       dispatch({ type: "clearErrors" });
//     }
//     // Add any additional error handling for trader actions
//   }, [alert, traderError, dispatch]);

//   useEffect(() => {
//     dispatch(getItemsOnSale());
//     dispatch(getMyItems());
    
//     dispatch(getTraderApprovalRequests(traderProfile.trader._id));
//   }, [dispatch, traderProfile.trader]);

//   return traderLoading ? (
//     <Loader />
//   ) : (
//     <div className="traderProfile">
//       {trader && (
//     <div className="traderAccount">
//       <div className="accountleft">
//         <div className="approvalList">
         
//          {approvalRequests.map(request => (
           
//            <div key={request.itemId} className="approvalCard">
//              <div className='approvalDetails'>
//                <h3 className='itemTitle'>Item Name: {request.itemId.caption}</h3>
         
//                <div className="buyerInfo">
//            <span className='buyerName'>Buyer Name: {request.buyerId.name}</span><p></p>
//            </div>
//            <div>
//            <button onClick={() => handleApprove(request.itemId._id, request.buyerId._id)} className="approveBtn">Approve</button>
//            <button onClick={() => handleDecline(request.itemId._id, request.buyerId._id)} className="declineBtn">Decline</button>
//          </div>
            
             
//              </div>
            
//            </div>
//          ))}
//        </div>
//        </div>
         
//        <div className="accountright">
//             {trader && trader.avatar && (
//             <div className="accountright">
//             <Avatar
//             src={trader.avatar.url}
//             sx={{ height: "8vmax", width: "8vmax" }}
//             />
//             <Typography variant="h5">{trader.name}</Typography>
//             </div>
//             )}

//             <div>
//               <Typography variant="h6">Items Posted</Typography>
//               <Typography>{trader.itemsPosted.length}</Typography>
//             </div>

//             <div>
//               <Typography variant="h6">Items Bought</Typography>
//               <Typography>{trader.itemsBought.length}</Typography>
//             </div>

//             <div>
//               <Typography variant="h6">Items Sold</Typography>
//               <Typography>{trader.itemsSold.length}</Typography>
//             </div>

//             <Button variant="contained" onClick={logoutHandler}>Logout</Button>
            
//         </div>
//        </div>
//       )}
//     </div>
//   );
// };

// export default TraderProfile;



import React, { useEffect } from "react";
import { Avatar, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { logoutTrader } from "../../Actions/Trader";
import {
  getTraderProfile,
  // Add any other actions you might need for the trader
} from "../../Actions/Trader";

const TraderProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();


  const logoutHandler = () => {
    dispatch(logoutTrader());
    navigate('/');
    alert.success("Logged out successfully");
  };
  const {
    trader,
    loading: traderLoading,
    error: traderError,
  } = useSelector((state) => state.traderProfile);
  //console.log(trader, "after use selector traderprofile")
  const {
    trader: me
  } = useSelector((state) => state.trader);

  useEffect(() => {
    dispatch(getTraderProfile(me._id));
    // Dispatch any additional actions to fetch trader's data
  }, [dispatch, me._id]);
  //console.log("inside trader profile", trader)
  useEffect(() => {
    if (traderError) {
      alert.error(traderError);
      dispatch({ type: "clearErrors" });
    }
    // Add any additional error handling for trader actions
  }, [alert, traderError, dispatch]);

  return traderLoading ? (
    <Loader />
  ) : (
    <div className="traderProfile">
      {trader && (
        <>
         
          {trader && trader.avatar && (
  <div className="accountright">
    <Avatar
      src={trader.avatar.url}
      sx={{ height: "8vmax", width: "8vmax" }}
    />
    <Typography variant="h5">{trader.name}</Typography>
  </div>
)}

          <div className="accountright">
            <div>
              <Typography variant="h6">Items Posted</Typography>
              <Typography>{trader.itemsPosted.length}</Typography>
            </div>

            <div>
              <Typography variant="h6">Items Bought</Typography>
              <Typography>{trader.itemsBought.length}</Typography>
            </div>

            <div>
              <Typography variant="h6">Items Sold</Typography>
              <Typography>{trader.itemsSold.length}</Typography>
            </div>

            <Button variant="contained" onClick={logoutHandler}>Logout</Button>

            {/* Add any additional trader-specific information here */}
            
          </div>
        </>
      )}
    </div>
  );
};

export default TraderProfile;