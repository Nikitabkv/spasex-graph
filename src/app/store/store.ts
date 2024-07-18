import {configureStore} from '@reduxjs/toolkit'
import {dataSlice} from "../../features/SpaceXLaunchesChart/model/dataSlice.ts"

export const store = configureStore({
  reducer: {
    spaseXLaunches: dataSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
