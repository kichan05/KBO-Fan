import './App.css';

import rank from "./data/rank"
import {ResponsiveLine} from '@nivo/line'
import {useEffect, useState} from "react";

function RankGraph() {
  const [parentWidth, setParentWidth] = useState(window.innerWidth)
  const [startYear, setStartYear] = useState(0)
  const [endYear, setEndYear] = useState(parentWidth)
  const [selectTeam, setSelectTeam] = useState(null)
  const [isStartMove, setIsStartMove] = useState(false)
  const [isEndMove, setIsEndMove] = useState(false)

  // let d = []
  // rank.forEach((value) => {
  //   if (selectTeam == null || value.id === selectTeam) {
  //     d.push(value)
  //   } else {
  //     const v = {...value}
  //     v.data = []
  //     d.push(v)
  //   }
  // })


  useEffect(() => {
    const handelMouseMove = (e) => {
      if (isStartMove) {
        if (!e.buttons) {
          setIsStartMove(false)
          return
        }

        setStartYear(Math.max(startYear + e.movementX, 0))
        if(startYear + 40 > endYear - 40){
          setStartYear(endYear - 80)
          setIsStartMove(false)
          return
        }
      }

      if (isEndMove) {
        if (!e.buttons) {
          setIsEndMove(false)
          return
        }

        setEndYear(Math.min(endYear + e.movementX, parentWidth))
        if(endYear - 40 < startYear + 40){
          setEndYear(startYear + 80)
          setIsEndMove(false)
          return
        }
      }
    }
    document.addEventListener("mousemove", handelMouseMove)

    return () => {
      document.removeEventListener("mousemove", handelMouseMove)
    }
  })

  return (
    <>
      <div className="year-selector-wrap" onResize={(e) => {
        setParentWidth(e.currentTarget.clientWidth)
      }}>
        <div className="year-start arrow"
             style={{left: startYear, width: 40}}
             onMouseDown={() => {
               setIsStartMove(true)
             }}
             onMouseUp={() => {
               setIsStartMove(false)
             }}
        ></div>
        <div className="year-end arrow"
             style={{left: endYear - 40, width: 40}}
             onMouseDown={() => {
               setIsEndMove(true)
             }}
             onMouseUp={() => {
               setIsEndMove(false)
             }}
        ></div>
        <div className="year-bar"
             style={{
               left: startYear,
               width: endYear - startYear
             }}
        ></div>
      </div>
      {/*{isStartMove ? <span>참</span> : <span>거짓</span>}, {isEndMove ? <span>참</span> : <span>거짓</span>}*/}

      {/*<ResponsiveLine*/}
      {/*  isInteractive*/}
      {/*  useMesh*/}
      {/*  data={d}*/}
      {/*  colors={d.map((value) => {return value.color})}*/}
      {/*  margin={{top : 50, right : 100, bottom : 50, left : 50}}*/}
      {/*  xScale={{*/}
      {/*    type : "linear",*/}
      {/*    min : startYear,*/}
      {/*    max : endYear,*/}
      {/*  }}*/}
      {/*  yScale={{*/}
      {/*    type: 'linear',*/}
      {/*    min: 1,*/}
      {/*    max: 10,*/}
      {/*    reverse: true*/}
      {/*  }}*/}
      {/*  legends={[*/}
      {/*    {*/}
      {/*      anchor: 'bottom-right',*/}
      {/*      direction: 'column',*/}
      {/*      justify: false,*/}
      {/*      translateX: 100,*/}
      {/*      translateY: 0,*/}
      {/*      itemsSpacing: 0,*/}
      {/*      itemDirection: 'left-to-right',*/}
      {/*      itemWidth: 80,*/}
      {/*      itemHeight: 20,*/}
      {/*      itemOpacity: 0.75,*/}
      {/*      symbolSize: 12,*/}
      {/*      symbolShape: 'circle',*/}
      {/*      symbolBorderColor: 'rgba(0, 0, 0, .5)',*/}
      {/*      effects: [*/}
      {/*        {*/}
      {/*          on: 'hover',*/}
      {/*          style: {*/}
      {/*            itemBackground: 'rgba(0, 0, 0, .03)',*/}
      {/*            itemOpacity: 1*/}
      {/*          }*/}
      {/*        }*/}
      {/*      ],*/}
      {/*      onClick : (datum) => {*/}
      {/*        if(selectTeam === datum.id)*/}
      {/*          setSelectTeam(null)*/}
      {/*        else*/}
      {/*          setSelectTeam(datum.id)*/}
      {/*      }*/}
      {/*    }*/}
      {/*  ]}*/}

      {/*/>*/}
    </>
  )
}

function App() {
  return (
    <div className="App">
      <RankGraph/>
    </div>
  );
}

export default App;
