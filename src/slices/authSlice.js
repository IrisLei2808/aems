import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    token: "",
    name: "",
    email: "",
    expires: ""
}


export const loginAzure = createAsyncThunk(
    "auth/loginAzure",
    async (values, { rejectWithValue }) => {
        try {
            localStorage.setItem("token", values.token);
            localStorage.setItem("oid", values.id);
            localStorage.setItem("expires", values.expires);
            return {
                id: values.id,
                token: values.token,
                name: values.name,
                email: values.email,
                expires: values.expires.toString()
            };
        }
        catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)


export const logoutAzure = createAsyncThunk(
    "auth/logoutAzure",
    async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('oid');
            localStorage.removeItem('expires');
            console.log('Logout');
            return {
                id: '',
                token: '',
                name: '',
                email: '',
                expires: ''
            };
        }
        catch (error) {
            console.log(error);
            return {
                id: '',
                token: '',
                name: '',
                email: '',
                expires: ''
            };
        }
    }
)

const authSlice = createSlice(
   {
        name: "auth",
        initialState,
        reducers: {
            loadUser(state, action) {
                const token = state.token;
                if (token) {
                    return {
                        ...state,
                        token,
                        name: state.name,
                        email: state.email,
                        id: state.id,
                        expires: state.expires
                    }
                }
            }
        },
        extraReducers: (builder) => {
            builder.addCase(loginAzure.fulfilled, (state, action) => {
                if(action.payload) {
                    var payload = action.payload;
                    return {
                        ...state,
                        id: payload.id,
                        token: payload.token,
                        name: payload.name,
                        email: payload.email,
                        expires: payload.expires
                    }
                }
            });
            builder.addCase(logoutAzure.fulfilled, (state, action) => {
                if(action.payload) {
                    var payload = action.payload;
                    return {
                        id: payload.id,
                        token: payload.token,
                        name: payload.name,
                        email: payload.email,
                        expires: payload.expires
                    }
                }
            })
        }
   }
)

export const { loadUser } = authSlice.actions;
export default authSlice.reducer;