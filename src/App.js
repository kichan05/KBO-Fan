import "./style/initical.css"
import './style/App.css';
import {RankPage} from "./Page/RankPage";
import TeamPage from "./Page/TeamPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./component/Header";
import SeasonPage from "./Page/SeasonPage";

function App() {
  const headerMenu = [
    {path : "/", name : "홈"},
    {path : "/team", name : "팀별"},
    {path : "/season", name : "시즌"},
  ]

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header headerMenu={headerMenu}/>}>
            <Route index element={<RankPage/>}/>
            <Route path="team" element={<TeamPage/>}/>
            <Route path="season" element={<SeasonPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;