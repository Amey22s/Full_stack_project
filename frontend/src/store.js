import { configureStore } from '@reduxjs/toolkit';
import {
  allUsersReducer,
  postOfFollowingReducer,
  userProfileReducer,
  userReducer,
  newsReducer,
} from './Reducers/User';
import { likeReducer, myPostsReducer, userPostsReducer } from './Reducers/Post';

import { traderReducer } from './Reducers/Trader';
import { itemReducer } from './Reducers/Item';

import {
  messageReducer,
  allMessagesReducer,
  myConversationsReducer,
  newChatReducer,
} from './Reducers/Message';
import { adminReducer, allUsersForAdminReducer } from './Reducers/Admin';

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

    message: messageReducer,
    allMessages: allMessagesReducer,
    myConversations: myConversationsReducer,
    newChat: newChatReducer,
    admin: adminReducer,
    allUsersForAdmin: allUsersForAdminReducer,
    news: newsReducer,
  },
});

export default store;
