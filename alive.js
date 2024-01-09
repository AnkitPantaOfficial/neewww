import React, { useState, useEffect } from 'react';
import "./alive.css";


const Alive = () => {
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
          fetch('https://script.googleusercontent.com/macros/echo?user_content_key=TrIcCstJmXUTEb3-SmXROmqKq7LIcJVsy9zeSTdWm6RE7RJyID9AgWqnPqwCqIkUN1cvxu4IgUjzKFL9LcTrX9gvYyzDCczxm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnK0wZQrLV0rmgbM_CeJC_N9T2IGSIe9IlCOnds_wpWrNGNV818BtjCCIthQGZ92S9wkJjh7WKvz0S_-bGa433LWmbFYFiSmwZg&lib=MyDIGNa8ClhITOhHWOHKG6aIwSiYkmlJD')
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

  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#000000');
 
  useEffect(() => {
    const Data = localStorage.getItem('alive');

    if (Data) {
        setPrimaryColor(JSON.parse(Data));
    }
}, []);
  useEffect(() => {
    const Data = localStorage.getItem('alive');

    if (Data) {
        setSecondaryColor(JSON.parse(Data));
    }
}, []);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbz5MaS11pgUeKkrXBXricCRDD71zmPapnT0yeeq75mcTpW7ivy_sVGSK9uf9fajK79T/exec');
        const data = await response.json();

        const primaryColorItem = data.data.find(item => item.MATCH === 'Primary Color');
        const secondaryColorItem = data.data.find(item => item.MATCH === 'Secondary Color');

        if (primaryColorItem) {
          setPrimaryColor(primaryColorItem.MAP);
        }

        if (secondaryColorItem) {
          setSecondaryColor(secondaryColorItem.MAP);
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    fetchDataFromApi();
  }, []);

    return (
        <div className="aliveframe">
         <div className="alivebox">
          <div className="alivetopbox"style={{ backgroundColor: secondaryColor }}>
            <div className="alivetext1"> ALIVE STATS </div>
            <div className="dead"></div>
            <div className="alivecolor"></div>
            <div className="alivetext2">DEAD</div>
            <div className="alivetext3">ALIVE</div>
          </div>
          <div className="alivestatsall">
          {Fulldata.map((ele, index) => (
             ele.TeamName && (
             <div className={`alivestatsbox ${ele.Player1 && ele.Player2 && ele.Player3 && ele.Player4 ? 'allPlayersTrue' : ''}`} key={index}>
              <div className="alivestatsboxcolor"style={{ backgroundColor: secondaryColor }}></div>
             <div className="aliverank">{index + 1}</div>
              <div className="alivelogo">
                <img className="aliveteamlogo" src={ele.photo}/>
              </div>
              <div className="alivetext4">{ele.TeamName}</div>
              <div className="alivekills"style={{ backgroundColor: primaryColor }}>{ele.Kill}</div>
              <div className="aliveplayer4">
                   <div className={`aliv1 ${ele.Player1 ? 'playerTrue' : 'playerFalse'}`}></div>
                   <div className={`aliv2 ${ele.Player2 ? 'playerTrue' : 'playerFalse'}`}></div>
                   <div className={`aliv3 ${ele.Player3 ? 'playerTrue' : 'playerFalse'}`}></div>
                   <div className={`aliv4 ${ele.Player4 ? 'playerTrue' : 'playerFalse'}`}></div>
                 
              </div>
          </div>
          )
           ))}
          </div>
         </div>
        </div>
    );
  }

export default Alive;
