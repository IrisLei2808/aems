import { createSlice } from "@reduxjs/toolkit";
const initialState = false;


const loadingSlice = createSlice(
    {
         name: "loading",
         initialState,
         reducers: {
            triggerLoading(state, action )  {
                return action.payload;
            }
         }
    }
 );

 export const { triggerLoading } = loadingSlice.actions;
 export default loadingSlice.reducer;