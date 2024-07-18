//@ts-nocheck
import {createSlice} from "@reduxjs/toolkit"
import {getSpaceXLaunches} from "./dataAsyncThunk.ts"

export const dataSlice = createSlice({
  name: 'spaceXData',
  initialState: {
    launches: [],
    isLoading: false
  },
  reducers: {
    setLaunches(state, action) {
      state.launches = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSpaceXLaunches.fulfilled, (state, action) => {
        state.isLoading = false
        const data = []

        action.payload.data.launches.forEach((el: unknown) => {
          const obj = data.find(obj => obj.year === el.launch_date_utc.slice(0, 4))

          if (obj) {
            obj.count += 1
          } else {
            data.push({year: el.launch_date_utc.slice(0, 4), count: 1})
          }
        })

        state.launches = data
      })
      .addCase(getSpaceXLaunches.pending, (state) => {
        state.isLoading = true
        console.log('pending')
      })
      .addCase(getSpaceXLaunches.rejected, (state) => {
        state.isLoading = false
        console.log('rejected')
      })
  }
})

export const {
  setLaunches
} = dataSlice.actions