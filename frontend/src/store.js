import { configureStore } from '@reduxjs/toolkit';
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
} from './Reducers/User';
import { likeReducer, myPostsReducer, userPostsReducer } from './Reducers/Post';

import { traderReducer } from './Reducers/Trader';
import { itemReducer } from './Reducers/Item';

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
    trader: traderReducer,
    item: itemReducer,
  },
});

export default store;
