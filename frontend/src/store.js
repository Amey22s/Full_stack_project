import { configureStore } from '@reduxjs/toolkit';
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
  newsReducer
} from './Reducers/User';
import { likeReducer, myPostsReducer, userPostsReducer } from './Reducers/Post';


import { messageReducer, allMessagesReducer, myConversationsReducer, newChatReducer } from './Reducers/Message';
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
    message: messageReducer,
    allMessages: allMessagesReducer,
    myConversations: myConversationsReducer,
    newChat: newChatReducer,
    admin:adminReducer,
    news:newsReducer
  },
});

export default store;
