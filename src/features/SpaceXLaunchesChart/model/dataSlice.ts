import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { getSpaceXLaunches } from "./dataAsyncThunk.ts"

interface Launch {
  year: string;
  count: number;
}

export interface SpaceXDataState {
  launches: Launch[];
  isLoading: boolean;
}

const initialState: SpaceXDataState = {
  launches: [],
  isLoading: false
}

export const dataSlice = createSlice({
  name: 'spaceXData',
  initialState,
  reducers: {
    setLaunches(state, action) {
      state.launches = action.payload
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<SpaceXDataState>) => {
    builder
      .addCase(getSpaceXLaunches.fulfilled, (state, action) => {
        state.isLoading = false
        const data: Launch[] = []

        action.payload.data.launches.forEach((el: { launch_date_utc: string }) => {
          const obj = data.find(obj => obj.year === el.launch_date_utc.slice(0, 4))

          if (obj) {
            obj.count += 1
          } else {
            data.push({ year: el.launch_date_utc.slice(0, 4), count: 1 })
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

export const { setLaunches } = dataSlice.actions