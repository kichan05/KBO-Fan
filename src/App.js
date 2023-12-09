import './style/App.css';
import teamData from "./data/team.js"
import {useMemo, useState} from "react";
import TeamSelect from "./component/TeamSelect";
import RankGraph from "./component/RankGraph"
import Rank from "./data/rank";
import YearSelect from "./component/YearSelect";

function App() {
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
    <div className="App">
      <TeamSelect
        teamList={teamList}
        onTeamSelected={handleTesmSelect}/>
      {/*<TeamRank selectedTeam={selectedTeam}/>*/}

      <RankGraph
        rankData={Rank}
        selectedTeam={selectedTeam}/>
      <YearSelect/>
    </div>
  );
}

export default App;
