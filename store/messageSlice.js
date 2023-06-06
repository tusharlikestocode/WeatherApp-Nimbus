import { createSlice } from "@reduxjs/toolkit"

    
  
const messageSlice = createSlice({
  name: "message",
initialState: {
    temperature: 'hot',
    humidity:'hot',
    wind:'fast',
    location:'none',
    date:'none'
   
   
  },
  reducers: {
    setTemp(state, action) {
      state.temperature = action.payload.temperature,
      state.humidity = action.payload.humidity,
      state.wind = action.payload.wind,
      state.location=action.payload.location,
      state.date=action.payload.date


    }
    
    
   
  }
})

export const { setTemp } = messageSlice.actions
export default messageSlice.reducer