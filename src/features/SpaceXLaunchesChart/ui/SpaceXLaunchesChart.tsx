import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts"
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"
import {getOptions} from "../model"
import {getSpaceXLaunches} from "../model/dataAsyncThunk.ts"
import s from './SpaceXLaunchesChart.module.scss'

export const SpaceXLaunchesChart = () => {
  const dispatch = useDispatch()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const launches = useSelector(state => state.spaseXLaunches.launches)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    dispatch(getSpaceXLaunches(300))
  }, []);

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