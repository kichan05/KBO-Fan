import rankData from "./data/rank";

function TeamRank({selectedTeam}) {
  return (
    <table border="1">
      {rankData.filter(t => (
        selectedTeam.length === 0 ||
        selectedTeam.includes(t.team_id)
      )).map((row, index) => (
        <tr key={index}>
          <td>{row.year}년</td>
          <td>{row.rank}등</td>
          <td>{row.team_name}</td>
        </tr>
      ))}
    </table>
  )
}