"use client";
import axios from "axios";
import { useEffect, useState } from "react";


const Main = () => {
    const [Trains, SetTrains] = useState([])
    const [WT, SetWT] = useState()

  useEffect(()=>{
    axios.get('https://evraz-back.vercel.app/api?need=ns')
    .then(e=>SetTrains(e.data))

    for (let i = 0; i < Trains.length; i++) {
      if (Trains[i]==0) {
        console.log(0);
      }else{
      for (let j = 0; j < Trains[i].length; j++) {
        console.log(Trains[i][j][3]);
      }
    }
      
    }
  }
  ,[])

  

  return (
    <div className="App">
      <div className="table">
        <div className="colomuns info">
          <div className="item">j</div>
          <span>jlvghcjhxjgdzhf</span>
        </div>
        <div className="colomuns">
          <div className="item">1</div>
          <div className="item">2</div>
          <div className="item">3</div>
          <div className="item">4</div>
          <div className="item">5</div>
          <div className="item">6</div>
        </div>
        <div className="colomuns">
          <div className="item">4</div>
          <div className="item">5</div>
          <div className="item">6</div>
          <div className="item">4</div>
          <div className="item">5</div>
          <div className="item">6</div>
        </div>
        <div className="colomuns">
          <div className="item">1</div>
          <div className="item">2</div>
          <div className="item">3</div>
          <div className="item">1</div>
          <div className="item">2</div>
          <div className="item">3</div>
        </div>
      <div className="columns">
      {Trains.map(
        e=>
        <div className="item">
          {e?<div className='trains'>{
            e.map(
              el=>{
                return(
              <div className="train">
                <span>{el[0]}</span>
                <img src={'/trains/'+el[1]+'/'+el[6]+'/'+el[3]+'/1.svg'}/>
              </div>
            )}
            )
          }</div>
          :<div><br/></div>}
        </div>
      )}
      </div>

        <div className="colomuns">
          <div className="item">4</div>
          <div className="item">5</div>
          <div className="item">6</div>
          <div className="item">4</div>
          <div className="item">5</div>
          <div className="item">6</div>
        </div>
      </div>
    </div>
  );
};

export default Main