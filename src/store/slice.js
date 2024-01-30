import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
   name: 'toDo',
   initialState: {
      red: false,
      search: false,
      backupPosts: [],
      chosenPost: {},
      actions: [{
         id: 1,
         action: 'Random Action',
         cost: '2000'
      },
      {
         id: 2,
         action: 'Test Action',
         cost: '3000'
      }]
   },
   reducers: {
      addAction(state, action) {
         state.actions.push({
            id: Math.floor(Math.random() * 100),
            action: action.payload.data.action,
            cost: action.payload.data.cost,
         });
      },
      removeAction(state, action) {
         state.actions = state.actions.filter(item => item.id !== action.payload.id);
      },
      editAction(state, action) {
         state.red = !state.red;
         if (state.red) {
            state.chosenPost = state.actions.find(item => item.id === action.payload.id);
         } else {
            state.actions.forEach(item => {
               if (item.id === state.chosenPost.id) {
                  item.action = action.payload.data.action;
                  item.cost = action.payload.data.cost;
               }
            });
            state.chosenPost = {};
         }
      },
      recallEdit(state) {
         state.red = false;
      },
      searchPosts(state, action) {
         if (!state.search) {
            state.backupPosts = [...state.actions];
            state.search = !state.search;
            state.actions = state.actions.filter(item => item.action.includes(action.payload.query));
         } else if (state.search && action.payload.query.length === 0) {
            state.search = !state.search;
            state.actions = [...state.backupPosts];
            state.backupPosts = [];
         } else {
            state.actions = state.backupPosts.filter(item => item.action.includes(action.payload.query));
         }
      }
   }
});

export const { addAction, removeAction, editAction, recallEdit, searchPosts } = slice.actions;
export default slice.reducer;