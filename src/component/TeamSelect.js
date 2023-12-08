import "./TeamSelect.css"
import classNames from "classnames";

const TeamSelect = ({teamList, onTeamSelected}) => {
  return (
    <ui className={"team-list"}>
      {teamList.map(team => (
        <li
          className={classNames({selected: team.isSelect})}
          onClick={() => {
            onTeamSelected(team.team_id)
          }}
        >
          <img
            src={team.logo} alt={`${team.team_name} 로고`}
            className={"logo"}
          />
          <div className="name">{team.team_name}</div>
        </li>
      ))}
    </ui>
  )
}

export default TeamSelect