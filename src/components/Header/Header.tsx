import "./Header.scss";

import { ReactComponent as HomeSVG } from "../../assets/home.svg";
// import { ReactComponent as PublishSVG } from "../../assets/publish.svg";
import { ReactComponent as SettingSVG } from "../../assets/setting.svg";
import { ReactComponent as TaskSVG } from "../../assets/task.svg";
import { ReactComponent as TeamSVG } from "../../assets/team.svg";

export enum ActiveTypes {
  ONBOARD,
  TASKS,
  TEAM,
  DEPLOY,
  SETTINGS,
}

export const Header = ({ linkArray, activeTab }: { linkArray: string[]; activeTab: ActiveTypes }) => {
  return (
    <div className="nav-bar">
      <div className="nav-bar-logo">
        Cruit<span>Wise</span>
      </div>

      <div className="tool-kit-title">
        <span className="environment">{linkArray[0] + "   |   "}</span>
        <span>{"   "}</span>
        <span className="position">{linkArray[1]}</span>
      </div>

      <div className="nav-bar-buttons">
        <div className="nav-bar-links">
          <div className={"nav-bar-link" + (activeTab === ActiveTypes.ONBOARD ? " nav-bar-link-active" : "")}>
            <HomeSVG fill="#222" /> Onboard
          </div>
          <div className={"nav-bar-link" + (activeTab === ActiveTypes.TASKS ? " nav-bar-link-active" : "")}>
            <TaskSVG fill="#222" /> Tasks
          </div>
          <div className={"nav-bar-link" + (activeTab === ActiveTypes.TEAM ? " nav-bar-link-active" : "")}>
            <TeamSVG fill="#222" /> Team
          </div>
          {/* <div className={
                  "nav-bar-link" +
                  (activeTab === ActiveTypes.DEPLOY ? " nav-bar-link-active" : "")
                }>
                <PublishSVG fill="#222" /> Deploy
              </div> */}
          <div className={"nav-bar-link" + (activeTab === ActiveTypes.SETTINGS ? " nav-bar-link-active" : "")}>
            <SettingSVG fill="#222" /> Settings
          </div>
        </div>
      </div>
    </div>
  );
};
