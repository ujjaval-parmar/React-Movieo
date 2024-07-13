import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData: [],
    imageBaseUrl: ""
};


const movieoSlice = createSlice({

    name: 'movieo',
    initialState,

    reducers: {

        setBannerData: (state,action) =>{
            state.bannerData = action.payload;
        },

        setImageBaseUrl: (state, action)=>{
            state.imageBaseUrl = action.payload;
        }

    }

});



export const { setBannerData, setImageBaseUrl } = movieoSlice.actions;

export default movieoSlice.reducer;