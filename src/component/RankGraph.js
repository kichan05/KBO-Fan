import {ResponsiveLine} from "@nivo/line";
import TeamData from "./../data/team"
import "./RankGraph.css"
import rank from "../data/rank";

function RankGraph({rankData, startYear, endYear}) {
  return (
    <div className="rank-graph">
      <ResponsiveLine
        margin={{top: 50, right: 100, bottom: 50, left: 50}}
        data={
          rankData.map(team => (
            {...team, id : team.name}
          ))
        }
        colors={rankData.map((value) => {
          return value.color1
        })}
        animate={false}

        enableGridX={false}
        curve={"catmullRom"}

        pointLabel={"x"}
        enableSlices={"x"}

        tooltip={({point}) => {
          return (
            <div
              style={{
                background: 'white',
                padding: '9px 12px',
                border: '1px solid #ccc',
              }}
            >
              <div>x: {point.x}</div>
              <div>y: {point.y}</div>
            </div>
          )
        }}

        lineWidth={2}
        xScale={{
          type: "linear",
          min: startYear,
          max: endYear,
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
          }
        ]}
      />
    </div>
  )
}

RankGraph.defaultProps = {
  startYear : 1982, endYear : 2023
}

export default RankGraph