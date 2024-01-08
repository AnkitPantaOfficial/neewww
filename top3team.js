import React, { useState, useEffect } from 'react';
import "./top3team.css";


const Live = () => {
  const [Fulldata, setFulldata] = useState([]);

  useEffect(() => {
      const Data = localStorage.getItem('alive');

      if (Data) {
          setFulldata(JSON.parse(Data));
      }
  }, []);

  useEffect(() => {
      // Function to fetch and process Excel data
      const fetchData = () => {
          fetch('https://script.google.com/macros/s/AKfycbzP16Zyp63bZYpfzSuijbBxljiLvrdt4P9GmpU_iOv26Ut2Wk8majQaBVIX58nErcuk/exec')
              .then(response => {
                  if (!response.ok) {
                      throw new Error("Could not fetch data");
                  }
                  return response.json();
              }).then(data => {
                  const updatedData = data.data.slice(1).map(row => {
                      const trueCount = Object.values(row).filter(value => value === true).length;
                      return { ...row, trueCount };
                  });
                  console.log(updatedData)
                  updatedData.sort((a, b) => {
                      if (a.trueCount !== b.trueCount) {
                        return a.trueCount - b.trueCount; // Sort by trueCount in ascending order
                      } else {
                        // Find the earliest index where trueCount is achieved
                        const earliestA = Fulldata.findIndex((team) => team.trueCount === a.trueCount);
                        const earliestB = Fulldata.findIndex((team) => team.trueCount === b.trueCount);
                        return earliestA - earliestB; // Sort by the order of appearance
                      }
                    });
                    updatedData.sort((a, b) => {
                      if (a.trueCount !== b.trueCount) {
                          return a.trueCount - b.trueCount; // Sort by trueCount in ascending order
                      } else {
                          // If trueCount is the same, sort by Kill count in descending order
                          return b.Kill - a.Kill;
                      }
                  });
                  console.log(updatedData)
                  setFulldata(updatedData);
                  localStorage.setItem('alive', JSON.stringify(updatedData));
              })
              
              .catch((error) => {
                  console.error("Error fetching Excel data:", error);
              });
      };

      fetchData();
      const intervalId = setInterval(fetchData, 2000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
  }, []);
    

    return (
        <div className="elimframe10">
           {Fulldata.slice(0, 4).map((ele, index) => (
             ele.Player1 && ele.Player2 && ele.Player3 && ele.Player4 ? null : (
             <div className={`teamstats ${ele.Player1 && ele.Player2 && ele.Player3 && ele.Player4 ? 'allPlayersTrue1' : ''}`} key={index}>
            <div className="group12">
             <div className="wwcd">WWCD%</div>
                <div className="percentage">33.85%</div>
                </div>
            <div className="alive">
            <div className={`player1 ${ele.Player1 ? 'player1True' : 'player1False'}`}></div>
            <div className={`player1 ${ele.Player2 ? 'player1True' : 'player1False'}`}></div>
            <div className={`player1 ${ele.Player3 ? 'player1True' : 'player1False'}`}></div>
            <div className={`player1 ${ele.Player4 ? 'player1True' : 'player1False'}`}></div>
            </div>
          <div className="logoframe5">
          <img
                    className="topteamlogo"
                    src={ele.photo}
                    alt="logo"
                />
          </div>
          <div>
          <div className="design11"></div>
          
          </div>
          </div>
           )
          ))}
        </div>
    );
  }

export default Live;
