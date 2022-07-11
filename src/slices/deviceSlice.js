import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {BaseApiUrlV1} from '../environment';
import axios from 'axios';

const initialState = {
    items: [],
    status: null
}

export const deviceFetch = createAsyncThunk(
    "device/deviceFetch",
    async () => {
        try {
            let apiUrl = `${BaseApiUrlV1}/device`;
            const response = await axios.get(apiUrl);
            return response.data.resData;
        }
        catch (error) {
            console.log(error);
        }
    }
)

const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
    },
    extraReducers: {
        [deviceFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [deviceFetch.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
        [deviceFetch.rejected]: (state, action) => {
            state.status = "rejected";
        },
        [deviceFetch.pending]: (state, action) => {
            state.status = "pending";
        },
        [deviceFetch.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = "success";
        },
    }
});

export default deviceSlice.reducer