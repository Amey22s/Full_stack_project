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
