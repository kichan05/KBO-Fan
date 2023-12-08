import './App.css';
import teamData from "./data/team.js"
import {useState} from "react";
import TeamSelect from "./component/TeamSelect";
import {traverseTwoPhase} from "react-dom/test-utils";

function App() {
  const [teamList, setTeamList] = useState(teamData.map(team => {
    return {...team, isSelect: false}
  }))

  const handleTesmSelect = (teamId) => {
    setTeamList(teamList.map(team => {
      return team.team_id === teamId ? {...team, isSelect: !team.isSelect} : team
    }))
    console.log(teamList)
  }

  return (
    <div className="App">
      <TeamSelect teamList={teamList} onTeamSelected={handleTesmSelect}/>

      {/*<table border="1">*/}
      {/*  {rankData.map((row, index) => (*/}
      {/*    <tr key={index}>*/}
      {/*      <td>{row.year}년</td>*/}
      {/*      <td>{row.rank}등</td>*/}
      {/*      <td>{row.team_name}</td>*/}
      {/*    </tr>*/}
      {/*  ))}*/}
      {/*</table>*/}
    </div>
  );
}

export default App;
