import React from "react";
import "./lower.css";


const Live = () => {

    return (
        <div className="elimframe">
          <div className="logoframe">
            {/* change this two logo automatic in 20 sec */}
          <img
                    className="tournamentlogo"
                    src="https://media.discordapp.net/attachments/1189852419304202280/1189852524077928468/logo.png?ex=65a8e604&is=65967104&hm=484c8c72516805a3a09880b49145944c0eeadeee241df2a425ea608ba574cc31&=&format=webp&quality=lossless&width=701&height=701"
                    alt="logo"
                />
          <img
                    className="serverlogo"
                    src="https://media.discordapp.net/attachments/1179258931214827591/1190540332077678592/nne.png?ex=65ab6696&is=6598f196&hm=d4e3469449af4f42184819e4f437ced6e9a929633df79a42f53c432ec1aa3308&=&format=webp&quality=lossless&width=701&height=701"
                    alt="logo"
                />
          </div>
          <div className="daybox">DAY-2</div>
          <div>
          <div className="group">GRAND-FINAL</div>
          <div className="design"></div>
          <div className="design2"></div>
          <div className="design3"></div>
          </div>
          <div className="Match">MATCH 1 - ERANGEL</div>
          <div className="tournamentname">PUBG MOBILE DAILY TIER SCRIM</div>
        </div>
    );
  }

export default Live;
