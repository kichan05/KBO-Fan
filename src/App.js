import './App.css';

import rank from "./data/rank"
import {ResponsiveLine} from '@nivo/line'
import {useCallback, useEffect, useState} from "react";

function RankGraph() {
  const [selectTeam, setSelectTeam] = useState(null)

  let d = []
  rank.forEach((value) => {
    if (selectTeam == null || value.id === selectTeam) {
      d.push(value)
    } else {
      const v = {...value}
      v.data = []
      d.push(v)
    }
  })

  return (
    <>
      <ResponsiveLine
        isInteractive
        useMesh
        data={d}
        colors={d.map((value) => {return value.color})}
        margin={{top : 50, right : 100, bottom : 50, left : 50}}
        xScale={{
          type : "linear",
          min : 1981,
          max : 2023,
        }}
        yScale={{
          type: 'linear',
          min: 1,
          max: 10,
          reverse: true
        }}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ],
            onClick : (datum) => {
              if(selectTeam === datum.id)
                setSelectTeam(null)
              else
                setSelectTeam(datum.id)
            }
          }
        ]}

      />
    </>
  )
}

let btnRenderCount = 0

function CountUpBtn({onClick, count}) {
  console.log("버튼 랜더링", btnRenderCount++)
  return (
    <button onClick={onClick}>{count.num}</button>
  )
}

function UserCallTest() {
  const [count, setCount] = useState({num: 0})

  const incressment = useCallback(() => {
    setCount({num: count.num + 1})
  }, [count])

  return (
    <div>
      <h1>{count.num}</h1>
      <CountUpBtn onClick={incressment} count={count}/>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <RankGraph/>
      {/*<UserCallTest/>*/}
    </div>
  );
}

export default App;
