import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getSpaceXLaunches = createAsyncThunk(
  'dataSpaceX/getSpaceXLaunches',
  async (limit: unknown) => {
    try {
      const response = await axios.post(`https://spacex-production.up.railway.app/`, {
        headers: {
          'Content-Type': 'application/json'
        },
        query: `
        query launchesQuery($limit: Int) {
          launches(limit: $limit) {
            details
            id
            is_tentative
            launch_date_utc
            mission_id
            mission_name
            rocket {
              rocket_name
              rocket_type
            }
          }
        }
        `,
        variables: {
          limit: limit
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
)
