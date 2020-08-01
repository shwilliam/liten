import {useState} from 'react'
import {VictoryAxis, VictoryLabel, VictoryLine} from 'victory'

import {LinkView} from '../interfaces'

const getStyles = () => {
  const BLUE_COLOR = '#00a3de'

  return {
    parent: {
      boxSizing: 'border-box',
      display: 'inline',
      padding: 0,
    },
    title: {
      textAnchor: 'start',
      verticalAnchor: 'end',
      fill: '#000000',
      background: '#fff',
      fontFamily: 'inherit',
      fontSize: '18px',
    },

    axisYears: {
      axis: {stroke: 'black', strokeWidth: 1},
      ticks: {
        size: ({tick}: {tick: Date}) => {
          const tickSize = tick.getFullYear() % 5 === 0 ? 10 : 5
          return tickSize
        },
        stroke: 'black',
        strokeWidth: 1,
      },
      tickLabels: {
        fill: 'black',
        fontFamily: 'inherit',
        fontSize: 16,
      },
    },

    axisOne: {
      grid: {
        stroke: ({tick}: {tick: number}) =>
          tick === -10 ? 'transparent' : '#ccdee8',
        strokeWidth: 2,
      },
      axis: {stroke: BLUE_COLOR, strokeWidth: 0},
      ticks: {strokeWidth: 0},
      tickLabels: {
        fill: BLUE_COLOR,
        fontFamily: 'inherit',
        fontSize: 16,
      },
    },
    labelOne: {
      fill: BLUE_COLOR,
      fontFamily: 'inherit',
      fontSize: 12,
      fontStyle: 'italic',
    },
    lineOne: {
      data: {stroke: '#dd6b20', strokeWidth: 2},
    },
    axisOneCustomLabel: {
      fill: BLUE_COLOR,
      fontFamily: 'inherit',
      fontWeight: 300,
      fontSize: 21,
    },

    lineAvg: {
      data: {stroke: BLUE_COLOR, strokeWidth: 2},
    },
  }
}

type Props = {
  views: LinkView[]
}

const ViewChart = ({views}: Props) => {
  let maxViewCount = 10
  let avgViews = 0
  const [dayRange, setDayRange] = useState(7)
  const increaseDayRange = () => setDayRange(days => days + 1)
  const decreaseDayRange = () =>
    setDayRange(days => (days > 4 ? days - 1 : days))

  const today = new Date()
  const daysAgo = (days: number) =>
    new Date(today.getTime() - 1000 * 60 * 60 * 24 * days)
  const startDate = daysAgo(dayRange)

  const viewsByHour = views?.reduce(
    (viewsByHour, view) => {
      const date = new Date(view.createdAt)
      const year = date.getFullYear()
      const month = date.getMonth()
      const day = date.getDate()
      const hour = date.getHours()
      const yearMonthDay = `${year}-${month}-${day}`

      if (!viewsByHour[yearMonthDay])
        return {...viewsByHour, [yearMonthDay]: {[hour]: 1}}
      if (viewsByHour[yearMonthDay][hour])
        return {
          ...viewsByHour,
          [yearMonthDay]: {
            ...viewsByHour[yearMonthDay],
            [hour]: viewsByHour[yearMonthDay][hour] + 1,
          },
        }
      else
        return {
          ...viewsByHour,
          [yearMonthDay]: {...viewsByHour[yearMonthDay], [hour]: 1},
        }
    },
    {} as {
      [date: string]: {
        [hour: string]: number
      }
    },
  )

  const viewsData = Object.entries(viewsByHour).reduce(
    (acc, [yearMonthDay, views]) => {
      const [year, month, day] = yearMonthDay.split('-')
      const hourlyViews = Object.entries(views)

      return [
        ...acc,
        ...hourlyViews.map(([hour, views]) => ({
          x: new Date(Number(year), Number(month), Number(day), Number(hour)),
          y: views,
        })),
      ]
    },
    [] as Array<{
      x: Date
      y: number
    }>,
  )

  const styles = getStyles()

  const ticksAmount = 4
  const tickSize = dayRange / ticksAmount
  const tickValues = [
    startDate,
    ...Array.from({length: ticksAmount}, (_, idx) => daysAgo(idx * tickSize)),
    today,
  ]

  const viewsArr = Object.values(viewsByHour).reduce(
    (acc, val) => [...Object.values(val), ...acc],
    [] as number[],
  )
  maxViewCount = Math.max(...viewsArr) + 2
  avgViews =
    viewsArr.reduce((totalViews, views) => totalViews + views, 0) /
    viewsArr.length

  return (
    <div className="flex flex-col-reverse md:flex-col">
      <div className="text-right py-1 px-2 text-gray-700">
        <button onClick={increaseDayRange} className="p-2 hover:text-gray-900">
          <span className="sr-only">Zoom out</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
        <button onClick={decreaseDayRange} className="p-2 hover:text-gray-900">
          <span className="sr-only">Zoom in</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
      </div>

      <svg
        className="border rounded"
        style={styles.parent as any}
        viewBox="0 0 450 350"
      >
        <rect x="0" y="0" width="10" height="30" fill="#dd6b20" />

        <VictoryLabel
          x={25}
          y={24}
          style={styles.title as any}
          text="Link views"
        />
        <VictoryLabel
          x={25}
          y={55}
          style={styles.labelOne as any}
          text={'View count \n(per hour)'}
        />

        <g transform={'translate(0, 40)'}>
          <VictoryAxis
            scale="time"
            standalone={false}
            style={styles.axisYears as any}
            tickValues={tickValues}
            tickFormat={x => x.getDate()}
          />

          <VictoryAxis
            dependentAxis
            domain={[0, maxViewCount]}
            offsetX={50}
            orientation="left"
            standalone={false}
            style={styles.axisOne as any}
            tickFormat={x => Math.floor(x)}
          />

          <VictoryLine
            data={[
              {x: new Date(1999, 1, 1), y: avgViews},
              {x: today, y: avgViews},
            ]}
            domain={{
              x: [new Date(1999, 1, 1), new Date(2020, 1, 1)],
              y: [0, maxViewCount],
            }}
            scale={{x: 'time', y: 'linear'}}
            standalone={false}
            style={styles.lineAvg as any}
          />

          <VictoryLine
            data={viewsData}
            domain={{
              x: [startDate, today],
              y: [0, maxViewCount],
            }}
            interpolation="monotoneX"
            scale={{x: 'time', y: 'linear'}}
            standalone={false}
            style={styles.lineOne as any}
          />
        </g>
      </svg>
    </div>
  )
}
export default ViewChart
