import React, { useState, useEffect } from "react";
import "./screen.css";
import _ from 'lodash';

const Screen = () => {
  const [TopPlayers, setTopPlayers] = useState([]);
  const [Photo, setPhoto] = useState([]);
  


  const findPhoto = (playerName) => {
    
    const player = Photo.find((p) => p.Name === playerName);
    const defaultImageUrl = 'https://media.discordapp.net/attachments/1043905461193285702/1177634952439930971/black.png?ex=65733904&is=6560c404&hm=ce8e11d29ac48de2a7cf75484719eeaccd45b62fe807645437c732d9235580a7&=&format=webp&width=671&height=671';
    return player && player.Photo ? player.Photo : defaultImageUrl;
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwjwi_EHq4gO3q0l3V2p0tRnKKlNjWQLn2feQFp1HOMfc2LPMJIg9jBxxWE8Uae_0DL/exec');
        if (!response.ok) {
          throw new Error(`Failed to fetch data (HTTP ${response.status})`);
        }
        const data = await response.json();
        console.log('Fetched Data:', data);
  
        // Filter data based on the "Show" field (supports both string and boolean)
        const filteredData = data.data.filter(player => player.Show === true || player.Show === 'true');
        setTopPlayers(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Initial fetch
    fetchData();
  
    // Fetch data every 2 seconds
    const intervalIdMVPMatch = setInterval(fetchData, 2000);
  
    // Cleanup function
    return () => {
      clearInterval(intervalIdMVPMatch);
    };
  }, [TopPlayers, Photo]);
  

  useEffect(() => {
    const Data = localStorage.getItem('photoMatchData');
    if (Data) {
      setPhoto(JSON.parse(Data));
    }
  }, []);

 

  return (
    <div className="screen">
      {TopPlayers.map((ele, index) => (
        <div key={index}>
          <div className="backgroundcolor"></div>
          <img className="screenplayerphoto" src={findPhoto(ele.PlayerName)} alt={`Player Photo - ${ele.PlayerName}`} />
          <div className="player-logo"><img  src={ele.TeamLogo} alt={`Player Logo - ${ele.PlayerName}`} /></div>
          <div className="otext">
            <div className="texts">
              <div className="kills-text">KILLS</div>
              <div className="kills">{ele.Kills}</div>
            </div>
            <div className="texts1">
              <div className="kills-text">KPM</div>
              <div className="kills">{ele.Kdm}</div>
            </div>
            <div className="texts2">
              <div className="kills-text">RANK</div>
              <div className="kills">{ele.Rank}</div>
            </div>
            <div className="playyername">
              <div className="nname">{ele.Player}</div>
            </div>
            <div className="screenteamname">
              <div className="screennamee">G{ele.TeamName}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Screen;
