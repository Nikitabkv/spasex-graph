import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import {useEffect} from "react"
import {getOptions} from "../model"
import {getSpaceXLaunches} from "../model/dataAsyncThunk.ts"
import s from './SpaceXLaunchesChart.module.scss'
import {useAppDispatch, useAppSelector} from "../../../app/store/hooks.ts"

export const SpaceXLaunchesChart = () => {
  const dispatch = useAppDispatch()
  const launches = useAppSelector(state => state.spaseXLaunches.launches)

  useEffect(() => {
    dispatch(getSpaceXLaunches(300))
  }, [])

  return (
    <div>
      <div className={s.chartWrapper}>
        {
          launches.length !== 0 ? <HighchartsReact highcharts={Highcharts} options={getOptions(launches)}/> :
            <div className={s.noData}/>
        }
      </div>
    </div>
  )
}