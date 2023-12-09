import {ResponsiveLine} from "@nivo/line";
import TeamData from "./../data/team"
import "./RankGraph.css"

function RankGraph({rankData, selectedTeam}) {
  let data = TeamData.map(team => {
    return {
      id: team.team_name,
      color: team.color1,
      teamId: team.team_id,
      data: []
    }
  })

  rankData.forEach(rank => {
    if (selectedTeam.length === 0 || selectedTeam.includes(rank.team_id)) {
      data[rank.team_id].data.push({
        x: rank.year, y: rank.rank
      })
    }
  })

  return (
    <div className="rank-graph">
      <ResponsiveLine
        margin={{top: 50, right: 100, bottom: 50, left: 50}}
        isInteractive
        useMesh
        data={data}
        colors={data.map((value) => {
          return value.color
        })}

        enablePoints={false}
        enableGridX={false}
        curve={"catmullRom"}

        pointLabel="y"
        enableSlices={"x"}

        lineWidth={2}
        xScale={{
          type: "linear",
          min: 1981,
          max: 2023,
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

export default RankGraph