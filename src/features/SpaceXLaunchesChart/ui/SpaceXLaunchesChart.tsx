import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import {useEffect} from "react"
import {getOptions} from "../model"
import {getSpaceXLaunches} from "../model/dataAsyncThunk.ts"
import s from './SpaceXLaunchesChart.module.scss'
import {useAppDispatch, useAppSelector} from "../../../app/store/hooks.ts"
import {decrement, increment, loadFromLocalStorage, reset} from "../model/dataSlice.ts";

export const SpaceXLaunchesChart = () => {
  const dispatch = useAppDispatch()
  const launches = useAppSelector(state => state.spaseXLaunches.launches)

  useEffect(() => {
    dispatch(loadFromLocalStorage())
    if (launches) {
      dispatch(getSpaceXLaunches(300))
    }
  }, [])

  const restHandler = () => {
    dispatch(reset())
    dispatch(getSpaceXLaunches(300))
  }

  return (
    <div>
      <div style={{display: 'flex', gap: 10}}>
        <button style={{width: 20}} onClick={() => dispatch(decrement())}>-</button>
        <span>{useAppSelector(state => state.spaseXLaunches.count)}</span>
        <button style={{width: 20}} onClick={() => dispatch(increment())}>+</button>
        <button className={s.reset} onClick={() => restHandler()}>reset</button>
      </div>
      <div className={s.chartWrapper}>
        {
          launches.length !== 0 ? <HighchartsReact highcharts={Highcharts} options={getOptions(launches)}/> :
            <div className={s.noData}/>
        }
      </div>
    </div>
  )
}