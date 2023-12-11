import {useMemo, useState} from "react";
import teamData from "../data/team";
import TeamSelect from "../component/TeamSelect";
import RankGraph from "../component/RankGraph";
import Rank from "../data/rank";
import RangeInput from "../component/RangeInput";

let dataFormat = teamData.map(team => {
  return {
    ...team,
    data: [],
    isSelect : false
  }
})
Rank.forEach(rank => {
  dataFormat[rank.team_id].data.push({
    x: rank.year, y: rank.rank
  })
})

export function RankPage() {
  const [startYear, setStartYear] = useState(1982)
  const [endYear, setEndYear] = useState(2023)

  const [rankData, setRankData] = useState(dataFormat)
  const isNoSelect = useMemo(() => {
    return rankData.filter(team => team.isSelect).length === 0
  }, [rankData])

  const handleTesmSelect = (teamId) => {
    setRankData(rankData.map(team => {
      return team.id === teamId ? {...team, isSelect : !team.isSelect} : team
    }))
  }

  return (
    <section className={"page"}>
      <TeamSelect
        teamList={rankData.map(rank => {
          return {...rank, data : null}
        })}
        onTeamSelected={handleTesmSelect}/>
      <RankGraph
        rankData={rankData.map(team => (
          (isNoSelect || team.isSelect) ? team : {...team, data : []}
        ))}
        startYear={startYear}
        endYear={endYear}
        />

      <RangeInput
        max={2023}
        min={1981}
        onStartChange={setStartYear}
        onEndChange={setEndYear}
      />
    </section>
  )
}