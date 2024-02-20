import React, { useState } from 'react';

const Park = () => {

    const [Trains, SetTrains] = useState([])
    const [RightB, SetRightB] = useState(false)
    const [FlyTrain, SetFlyTrain] = useState(false)
    const [PosTrain, SetPosTrain] = useState([0,0])
    const [NumberTrain, SetNumberTrain] = useState(true)
    const [ColorSob, SetColorSob] = useState([])
    const [ManyInfo, SetManyInfo] = useState({})
    const [TypeOfSort , SetTypeOfSort] = useState('S');
    const [Loco , SetLoco] = useState({CH: [], NotCH: []});
    const [InfoForm , SetInfoForm] = useState(false);
    const [SearchTrain , SetSearchTrain] = useState('');
    const [FindedTrain , SetFindedTrain] = useState('');
    const [OperationF , SetOperationF] = useState(false);
    const [MovingTrain , SetMovingTrain] = useState([]);


    return(
        <div className="table">
        <div className="colomuns info">
          <div className="item" onClick={e=>InfoForm?SetInfoForm(false):SetInfoForm(true)}><img src="/img/info.svg" alt="" /></div>
          {InfoForm?<div className="infoform">
          <img src="/img/infoForm.svg" width={250} alt="" />
        </div>:null}
          <span>Парк &quot;П&quot;</span>
        </div>
        <div className="colomuns">
          <div className="header">Путь</div>
          <div className="item">1</div>
          <div className="item">2</div>
          <div className="item">3</div>
          <div className="item">4</div>
          <div className="item">5</div>
          <div className="item">6</div>
        </div>

        <div className="colomuns">
          <div className="header">Всего</div>
          {Trains.map((e, id)=>
            <div key={id} className="item">
              {e.length}
            </div>
            )}
        </div>

        <div className="colomuns">
          <div className="header">Л (Чётная)</div>
          {Loco.CH.map((e, id)=>
          <div key={id} className="item mec ">{e?
            e.map((el, idl)=>
            <div className="locomotive" key={idl}>
              <img src="/img/trainL.svg" alt="" width={26}/>
              <span>{el[0]}</span>
            </div>)
            :null}</div>
          )
        }
        </div>
      <div className="columns" onMouseMove={e=>
      { if (FlyTrain) SetPosTrain([e.clientX, e.clientY])}}
      style={FlyTrain?{cursor: "grab"}:{}}
      >
      <div className="header"></div>


      {FlyTrain?
              <div className="FlyTrain"  style={{left: PosTrain[0]+2, top: PosTrain[1]-15}}>

                <span>{FlyTrain.train[0]}</span>
                <img src={FlyTrain.img} />
              </div>
            :<></>
            }

            
      {Trains.map(
        (e, way)=>

        {
          // console.log('start');
          // console.log(e);
          // console.log(e.filter(ele=>ele[1]=='OTHER'), '-------');
          return(
        <div className="item mec" key={way} onMouseUp={

          (koordi)=>{
            if (FlyTrain) {

              // ---------Отслеживание операций----------------
              let f = true
              for (let i = 0; i < MovingTrain.length; i++) {
                if (FlyTrain.train[0]==MovingTrain[i].number) {
                  if (way!=FlyTrain.way) {
                    if (MovingTrain[i].wayStart==way) {
                      SetMovingTrain([...MovingTrain.slice(0, i), ...MovingTrain.slice(i+1)])
                    }else{
                    SetMovingTrain([{
                      number: FlyTrain.train[0],
                      wayStart: MovingTrain[i].wayStart+1,
                      wayFinish: way+1},...MovingTrain.slice(0, i), ...MovingTrain.slice(i+1)])
                    }
                  } 
                  f = false
                  break
                }
              }
              if (f && FlyTrain.way!=way) {
                SetMovingTrain([{
                number: FlyTrain.train[0],
                wayStart: FlyTrain.way+1,
                wayFinish: way+1}, ...MovingTrain])
              }
              // -------------------------------------------------

              const xy = {x: koordi.clientX, y: koordi.clientY}
              const i = Math.floor((xy.y-table.current.offsetTop-5)/52)-1
            
                  let TrainsArr = Array.from(Trains)
            let TrainArr = Array.from(Trains[i])
            let j = Math.floor((Math.floor((xy.x-trains.current.offsetLeft-3)/30.5)+1)/2)

            if (TrainArr[TrainArr.length-1]) {
              let LastTrain = Number(TrainArr[TrainArr.length-1][2])
              if (LastTrain+1<j) {
                j = LastTrain+1
              }
            }else{
              j = 1
            }
            
            SetFlyTrain({...FlyTrain, train: [...FlyTrain.train, FlyTrain.train[2]=j]})

            TrainArr.splice(j, 0, FlyTrain.train)
             for (let index = j; index < TrainArr.length; index++) {
             if (TrainArr[index]) TrainArr[index][2]++
           }

            TrainsArr.splice(i, 1, TrainArr)
            SetFlyTrain(false)
            SetTrains(TrainsArr)
                  }}
              }>
          

          {e?
          <div className="trains" ref={trains}>
            
            {e.map(
              
              (el, id)=>{
                
                return(
                  <span key={id}>

              {el  ?<div className="train" onMouseDown={

                (koordi)=>
                
                {
                  if (!FlyTrain) {
                    
                    // ---------Отслеживание операций----------------
                    // let f = true
                    // for (let i = 0; i < MovingTrain.length; i++) {
                    //   if (FlyTrain.train[0]==MovingTrain[i].number || FlyTrain.train[2]==MovingTrain[i].way) {
                    //     f = false
                    //   }
                    // }
                    // if (f) {
                    //   SetMovingTrain([{
                    //   number: FlyTrain.train[0],
                    //   way: way+1}, ...MovingTrain])
                    // }
                    // -------------------------------------------------

                    const xy = {x: koordi.clientX, y: koordi.clientY}
                    let TrainsArr = Array.from(Trains)

                    

                  TrainsArr[way].splice(el[2]-1, 1)

                  for (let index = el[2]-1; index < TrainsArr[way].length; index++) {
                    if (TrainsArr[way][index]) TrainsArr[way][index][2]--
                    
                  }
                  let img
                switch (TypeOfSort) {
                  case 'S':
                    img = "/img/trains/"+el[1]+"/"+el[6]+"/"+el[3]+"/1.svg";
                    break;
                  case 'B':
                    img = "/img/trains/"+ el[5]?'bolnoy/'+el[1]+'.svg':'OTHER/'+el[6]+"/"+el[3]+"/1.svg"
                    break;
                
                  default:
                    break;
                }
                

                SetFlyTrain({
                train: el,
                way: way,
                ...xy,
                img: "/img/trains/"+el[1]+"/"+el[6]+"/"+el[3]+"/1.svg", 
                })
                SetPosTrain([xy.x, xy.y])
                SetTrains(TrainsArr)
              }
              
              }
              } 
                onContextMenu={(e)=>SetRightB([el,e.clientX, e.clientY])}>
                <span className="num" style={NumberTrain?{}:{visibility: 'hidden'}}>{el[0]}</span>
                <span className="pos" >{el[2]}</span>

                {FindedTrain==el[0]?<img style={{background: '#cacaca'}} src={"/img/trains/VIDELENNIE/"+el[6]+"/"+el[3]+"/1.svg"}/>:
                <div>{TypeOfSort=='S'?<img src={"/img/trains/"+el[1]+"/"+el[6]+"/"+el[3]+"/1.svg"} />:null}
                {TypeOfSort=='B'? 
                <div>
                {Number(el[5])?<img src={"/img/trains/bolnoy/"+el[3]+'.svg'} alt="" />:
              <img src={"/img/trains/OTHER/"+el[6]+"/"+el[3]+"/1.svg"}/>}
              </div>
                :null}
                {TypeOfSort=='Z'? 
                <div>
                {el[6]=='POROZHNIE'?<img src={"/img/trains/ATL/"+el[6]+"/"+el[3]+"/1.svg"} alt="" />:
              <img src={"/img/trains/OTHER/"+el[6]+"/"+el[3]+"/1.svg"}/>}
              </div>
                :null}
                {TypeOfSort=='P'?
                <div>
                  {el[8]<4?<img src={"/img/trains/GK/"+el[6]+"/"+el[3]+"/1.svg"} />:null}
                  {5<el[8] && 11>el[8]?<img src={"/img/trains/ATL/"+el[6]+"/"+el[3]+"/1.svg"} />:null}
                  {el[8]>3 && el[8]<6?<img src={"/img/trains/FGK/"+el[6]+"/"+el[3]+"/1.svg"} />:null}
                  {el[8]>10?<img src={"/img/trains/MOD/"+el[6]+"/"+el[3]+"/1.svg"} />:null}
                </div>:
                null}
                {TypeOfSort=='O'?
                <div>
                  {el[7]=='Finished'?<img src={"/img/trains/PGK/"+el[6]+"/"+el[3]+"/1.svg"} />:null}
                  {el[7]=='InProgress'?<img src={"/img/trains/FGK/"+el[6]+"/"+el[3]+"/1.svg"} />:null}
                  {el[7]=='WithoutOperation'?<img src={"/img/trains/GK/"+el[6]+"/"+el[3]+"/1.svg"} />:null}
                  {el[7]=='0'?<img src={"/img/trains/OTHER/"+el[6]+"/"+el[3]+"/1.svg"} />:null}
                </div>:
                null}</div>}

                
                
              </div>
              :null}
              </span>
            )}
            )
          }</div>
          :<div></div>}
        </div>
      )})}
      </div>

      <div className="colomuns">
          <div className="header">Л (Чётная)</div>
          {Loco.NotCH.map((e, id)=>
          <div key={id} className="item mec ">{e?
            e.map((el, idl)=>
            <div className="locomotive" key={idl}>
              <img src="/img/trainL.svg" alt="" width={26}/>
              <span>{el[0]}</span>
            </div>)
            :null}</div>
          )
        }
        </div>
      </div>
    );
};

export default Park