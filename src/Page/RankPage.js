import {useMemo, useState} from "react";
import teamData from "../data/team";
import TeamSelect from "../component/TeamSelect";
import RankGraph from "../component/RankGraph";
import Rank from "../data/rank";
import RangeInput from "../component/RangeInput";

export function RankPage() {
  const [startYear, setStartYear] = useState(1981)
  const [endYear, setEndYear] = useState(2023)

  const [teamList, setTeamList] = useState(teamData.map(team => {
    return {...team, isSelect: false}
  }).sort((a, b) => a.order_index - b.order_index))

  const selectedTeam = useMemo(() => {
    return teamList.filter(t => t.isSelect).map(t => t.team_id)
  }, [teamList])

  const handleTesmSelect = (teamId) => {
    setTeamList(teamList.map(team => {
      return team.team_id === teamId ?
        {...team, isSelect: !team.isSelect} : team
    }))
  }
  return (
    <section className={"page"}>
      <TeamSelect
        teamList={teamList}
        onTeamSelected={handleTesmSelect}/>

      <RankGraph
        rankData={Rank}
        selectedTeam={selectedTeam}
        />

      <RangeInput
        max={2023}
        min={1981}
        onChange={(start, end) => {
          console.log(start, end)
        }}
      />
    </section>
  )
}