import axios from 'axios';

// Add action to create a new item
export const createItem = (caption, price, image) => async (dispatch) => {
  try {
    dispatch({ type: 'CreateItemRequest' });

    const { data } = await axios.post('/api/marketplace/create', {
      caption,
      price,
      image,
    });

    dispatch({ type: 'CreateItemSuccess', payload: data.item });
  } catch (error) {
    dispatch({
      type: 'CreateItemFailure',
      payload: error.response.data.message,
    });
  }
};

// Action to fetch items on sale
export const getItemsOnSale = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/marketplace/onSale'); // Update with your API endpoint
    dispatch({ type: 'GET_ITEMS_ON_SALE_SUCCESS', payload: data.items });
  } catch (error) {
    dispatch({ type: 'GET_ITEMS_ON_SALE_FAILURE', payload: error.message });
  }
};

// Action to fetch items posted by the trader
export const getMyItems = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/marketplace/myItems'); // Update with your API endpoint
    dispatch({ type: 'GET_MY_ITEMS_SUCCESS', payload: data.items });
  } catch (error) {
    dispatch({ type: 'GET_MY_ITEMS_FAILURE', payload: error.message });
  }
};

// Action to fetch approval requests
export const getApprovalRequests = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/marketplace/approvalRequests'); // Update with your API endpoint
    dispatch({ type: 'GET_APPROVAL_REQUESTS_SUCCESS', payload: data.requests });
  } catch (error) {
    dispatch({ type: 'GET_APPROVAL_REQUESTS_FAILURE', payload: error.message });
  }
};
