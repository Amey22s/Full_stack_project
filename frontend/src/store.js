import { configureStore } from '@reduxjs/toolkit';
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
} from './Reducers/User';
import { likeReducer, myPostsReducer, userPostsReducer } from './Reducers/Post';

import { adminReducer } from './Reducers/Admin';

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
    admin:adminReducer
  },
});

export default store;
