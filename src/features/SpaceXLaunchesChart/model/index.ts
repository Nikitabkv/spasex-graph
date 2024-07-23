const getLaunchCounts = (launches: Array<{ year: string, count: number }>) => {
  return launches.map((launch: { year: string }, i: number) => {
    const count = launches.slice(0, i + 1).reduce((acc, el) => acc + el.count, 0)
    return {
      color: generateIntermediateColor(0, launches.reduce((acc, el) => acc + el.count, 0), count),
      year: launch.year,
      current: launches[i].count,
      count: count
    }
  })
}

const generateIntermediateColor = (minNumber: number, maxNumber: number, number: number) => {
  const minRGBMatch = 'rgba(106,0,255,1)'.match(/\d+/g);
  const minRGB = minRGBMatch ? minRGBMatch.map(Number) : [0, 0, 0];

  const maxRGBMatch = 'rgba(255,121,121,1)'.match(/\d+/g);
  const maxRGB = maxRGBMatch ? maxRGBMatch.map(Number) : [0, 0, 0];

  const percent = (number - minNumber) / (maxNumber - minNumber);
  const r = minRGB[0] + percent * (maxRGB[0] - minRGB[0]);
  const g = minRGB[1] + percent * (maxRGB[1] - minRGB[1]);
  const b = minRGB[2] + percent * (maxRGB[2] - minRGB[2]);

  return `rgba(${r}, ${g}, ${b}, 1)`;
}

export const getOptions = (launches: Array<{ year: string, count: number }>) => {
  return {
    title: {
      text: 'Запуски ракет SpaceX'
    },
    yAxis: {
      type: 'linear',
      minorTickInterval: 'auto',
      title: {
        text: 'Общее кол-во запусков'
      }
    },
    xAxis: {
      title: {
        text: 'Год'
      },
      categories: launches.map((launch: { year: string }) => launch.year),
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.current}</b><br/>',
    },
    series: [{
      lineWidth: 3,
      name: 'Запуски',
      keys: ['y', 'color', 'current', 'year'],
      data: getLaunchCounts(launches).map((el) => [el.count, el.color, el.current, el.year]),
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 1,
          y2: 0
        },
        stops: [
          [0, 'rgba(106,0,255,1)'],
          [1, 'rgba(255,121,121,1)']
        ]
      }
    }]
  }
}