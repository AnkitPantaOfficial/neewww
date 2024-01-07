import React from "react";
import "./top3team.css";


const Live = () => {
    

    return (
        <div className="elimframe1">
            <div className="teamstats">
            <div className="group12">
             <div className="wwcd">WWCD%</div>
                <div className="percentage">33.85%</div>
                </div>
            <div className="alive">
                <div className="player1"></div>
                <div className="player1"></div>
                <div className="player1"></div>
                <div className="player1"></div>
            </div>
          <div className="logoframe5">
            {/* TEAM LOGO HERE */}
          <img
                    className="topteamlogo"
                    src="https://media.discordapp.net/attachments/1182241812950286397/1182241848299900938/20231207_142932.png?ex=65a8e585&is=65967085&hm=ea37b77a1797cea2ae095e735987848965b05ac2518cc8c10670e88b1968aa61&=&format=webp&quality=lossless&width=701&height=701"
                    alt="logo"
                />
          </div>
          <div>
          <div className="design11"></div>
          
          </div>
          </div>
        </div>
    );
  }

export default Live;
