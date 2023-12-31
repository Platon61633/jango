"use client";
import axios from "axios";
import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";


const Main = () => {
    const [Trains, SetTrains] = useState([])
    // const [WT, SetWT] = useState()
    const [RightB, SetRightB] = useState(false)
    const [IdTrain, SetIdTrain] = useState(1)

  useEffect(()=>{
    axios.get('https://evraz-back.vercel.app/api?need=ns')
    .then(e=>SetTrains(e.data))
    window.addEventListener("contextmenu", function(e) { e.preventDefault(); })

    // for (let i = 0; i < Trains.length; i++) {
    //   if (Trains[i]==0) {
    //     console.log(0);
    //   }else{
    //   for (let j = 0; j < Trains[i].length; j++) {
    //     console.log(Trains[i][j][3]);
    //   }
    // }
      
    // }
  }
  ,[])

  const GetIdTrain = (type)=>{
    if (type != 'id') {
      SetIdTrain(IdTrain+1)
    }
    return IdTrain
  }
  

  return (
    <div className="App">
      {RightB?
        <div className='RightB' onClick={()=>SetRightB(false)}>
          <p onClick={e=>e.stopPropagation()} style={{top: RightB[2]-24, left: RightB[1]-8}}>
            
            <h1>Вагон №{RightB[0][0]}</h1>
            <hr />
            <div className="infor">
              <div><span>Простой на станции</span><span>{RightB[0][8]}</span></div>
              <div><span>Собственник</span><span>{RightB[0][1]}</span></div>
              <div><span>Оператор</span><span>???</span></div>
              <div><span>Тип вагона</span><span>{RightB[0][4]}</span></div>
              <div><span>Гружённый</span><span>{RightB[0][6]=='POROZHNIE'?<span>Нет</span>:<span>Да</span>}</span></div>
              <div><span>Позиция</span><span>{RightB[0][2]}</span></div>
            </div>
          </p>
        </div>
        :<></>}
      <div className="table">
        <div className="colomuns info">
          <div className="item">j</div>
          <span>Парк 'П'</span>
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

          {e?
          // <Reorder.Group as='' axys='x' values={e} onReorder={SetTrains}>
          <div className='trains'>{
            e.map(
              el=>{
                console.log(el[0])
                return(
              // <Reorder.Item key={el[0]} value={el}>
              <div className="train" id={el[0]} onContextMenu={(e)=>SetRightB([el,e.clientX, e.clientY])}>
                <span>{el[0]}</span>
                <img src={'/trains/'+el[1]+'/'+el[6]+'/'+el[3]+'/1.svg'} />
              </div>
            // </Reorder.Item>
            )}
            )
          }</div>
          // </Reorder.Group>
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