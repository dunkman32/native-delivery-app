import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restourant: {
    id: null,
    imgUrl: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
    long: null,
    lat: null,
  },
};

export const restourantSlice = createSlice({
  name: 'restourant',
  initialState,
  reducers: {
    setRessourant: (state, action) => {
      state.restourant = action.payload
    }
    
  },
});

// Action creators are generated for each case reducer function
export const { setRessourant } = restourantSlice.actions;

export const selectRestourant = (state) => state.restourant.restourant;

export default restourantSlice.reducer;
