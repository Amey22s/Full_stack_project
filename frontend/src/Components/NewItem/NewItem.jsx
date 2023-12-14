import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';

import './NewItem.css'; // Similar to NewPost.css
import { createItem } from '../../Actions/Item'; // Replace with your action to create an item

const NewItem = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [price, setPrice] = useState('');

  const { loading, error, message } = useSelector((state) => state.item); // Replace with your relevant state
  const dispatch = useDispatch();
  const alert = useAlert();
const navigate=useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createItem(caption, price, image));
    navigate("/marketplace", { state: { activeTab: "myItems", activeSubTab: "selling" } }); 

  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: 'clearErrors' }); // Adjust based on your action structure
    }

    if (message) {
      alert.success(message);
      dispatch({ type: 'clearMessage' }); // Adjust based on your action structure
    }
  }, [dispatch, error, message, alert]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={submitHandler}>
        <Typography variant="h3">Post New Item</Typography>

        {image && <img src={image} alt="Item" />}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Button disabled={loading} type="submit">
          Post Item
        </Button>
      </form>
    </div>
  );
};

export default NewItem;
