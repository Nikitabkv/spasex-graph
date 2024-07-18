const getLaunchCounts = (launches) => {
  let sortedLaunches = []
  launches.forEach(el => {
    if (el in sortedLaunches) {

    }
  })
  return launches.map((launch: unknown, i: number) => {
    const count = launches.slice(0, i + 1).reduce((acc, el) => acc + el.count, 0)
    return {
      color: generateIntermediateColor(0, launches.reduce((acc, el) => acc + el.count, 0), count),
      year: launch.year,
      current: launches[i].count,
      count: count
    }
  })
}

const generateIntermediateColor = (minNumber, maxNumber, number) => {
  const minRGB = 'rgba(106,0,255,1)'.match(/\d+/g).map(Number);
  const maxRGB = 'rgba(255,121,121,1)'.match(/\d+/g).map(Number);

  const percent = (number - minNumber) / (maxNumber - minNumber);
  const r = minRGB[0] + percent * (maxRGB[0] - minRGB[0]);
  const g = minRGB[1] + percent * (maxRGB[1] - minRGB[1]);
  const b = minRGB[2] + percent * (maxRGB[2] - minRGB[2]);

  return `rgba(${r}, ${g}, ${b}, 1)`;
}

export const getOptions = (launches) => {
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
      categories: launches.map((launch: unknown) => launch.year),
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          this.x + ': ' + this.point.current
      }
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