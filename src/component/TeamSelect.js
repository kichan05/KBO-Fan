import "./TeamSelect.css"
import classNames from "classnames";

const TeamSelect = ({teamList, onTeamSelected}) => {
  return (
    <ui className={"team-list"}>
      {teamList.map((team, index) => (
        <li
          key={team.index}
          className={classNames({selected: team.isSelect})}
          onClick={() => {
            onTeamSelected(team.id)
          }}
        >
          <img
            src={team.logo} alt={`${team.name} 로고`}
            className={"logo"}
          />
          <div className="name">{team.name}</div>
        </li>
      ))}
    </ui>
  )
}

export default TeamSelect