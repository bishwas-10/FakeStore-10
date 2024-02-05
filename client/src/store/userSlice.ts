import { createSlice } from "@reduxjs/toolkit";


export interface SignResultProps {
    username: string;
    email: string;
    _id?: string;
  }
  
export interface UserProps{
 currentUser:SignResultProps |null;
 loading:boolean;
 error:string | null;
 signedUpError:string |null,
 isSignedIn:boolean;
}
const initialState:UserProps={
    currentUser: null,
    loading: false,
    error: null,
    signedUpError:null,
    isSignedIn:false,
}

const authSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state) => {
            state.loading = true;
          },
          signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            state.isSignedIn= true;
          },
          signInFailure: (state,action) => {
            state.currentUser= null;
            state.loading = false;
            state.error = action.payload;
          },
          
          signOut:(state)=>{
            state.currentUser= null;
            state.loading = false;
            state.error = null;
            state.isSignedIn= false;
          },
          setIsSignedIn:(state,action)=>{
            state.isSignedIn= action.payload;
          }

    }
})

export const{
 
signInStart,
signInFailure,
signInSuccess,
signOut,
setIsSignedIn
}= authSlice.actions;
export default authSlice.reducer;