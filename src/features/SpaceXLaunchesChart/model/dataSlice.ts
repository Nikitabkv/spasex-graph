import { createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { getSpaceXLaunches } from "./dataAsyncThunk.ts"

interface Launch {
  year: string;
  count: number;
}

export interface SpaceXDataState {
  launches: Launch[];
  isLoading: boolean;
  count: number,
}

const initialState: SpaceXDataState = {
  launches: [],
  isLoading: false,
  count: 0,
}

export const dataSlice = createSlice({
  name: 'spaceXData',
  initialState,
  reducers: {
    increment(state) {
      state.count++
      localStorage.setItem('count', JSON.stringify(state.count))
    },
    decrement(state) {
      state.count--;
      localStorage.setItem('count', JSON.stringify(state.count))
    },
    reset(state) {
      state.count = 0
      localStorage.setItem('count', JSON.stringify(state.count))
      state.launches = []
      localStorage.setItem('launches', JSON.stringify([]))
    },
    loadFromLocalStorage(state) {
      const storedValueCount = localStorage.getItem('count');
      const storedValueLaunches = localStorage.getItem('launches');
      if (storedValueCount) {
        state.count = JSON.parse(storedValueCount);
      }
      if (storedValueLaunches) {
        state.launches = JSON.parse(storedValueLaunches);
      }
    },
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
        localStorage.setItem('launches', JSON.stringify(state.launches))
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

export const { increment, decrement, reset, loadFromLocalStorage } = dataSlice.actions
