"use client";
import axios from "axios";
import { document } from "postcss";
import { useEffect, useRef, useState } from "react";


const Main = () => {
    const [Trains, SetTrains] = useState([])
    const [RightB, SetRightB] = useState(false)
    const [FlyTrain, SetFlyTrain] = useState(false)
    const [PosTrain, SetPosTrain] = useState([0,0])
    const [NumberTrain, SetNumberTrain] = useState(true)
    const [ColorSob, SetColorSob] = useState([])
    const [SortSob , SetSortSob] = useState(false);
    


    const table = useRef()
    const trains = useRef(null)

  useEffect(()=> {
    const _FA = async ()=> {
      await axios.get("https://evraz-back.vercel.app/api?need=ns")
      .then(e=>{
        const arr = e.data
        let ColorSobArr = []
        for (let ii = 0; ii < arr.length; ii++) {
          for (let i = 0; i < arr[ii].length; i++) {
            if (!Boolean(ColorSobArr[0] || i || ii)) {
              ColorSobArr.push({sob: arr[0][0][1], n: 1})
            }else{
              let f = true
            for (let j = 0; j < ColorSobArr.length; j++) {
              if (arr[ii][i][1]==ColorSobArr[j].sob) {
                ColorSobArr[j].n++
                f = false
                break
              }
              }
              if (f) ColorSobArr.push({sob: arr[ii][i][1], n: 1})
          }
        }
        }

        SetColorSob(ColorSobArr)
        SetTrains(e.data)})
    }
    _FA()
    window.addEventListener("contextmenu", function(e) { e.preventDefault(); })
    
    
    
  }
  ,[])
  
  

  const PostTrains = async ()=>{
    const OldTrains = await axios.get("https://evraz-back.vercel.app/api?need=ns").then(e=>e.data)
    let journality = []
    for (let ind = 0; ind < 6; ind++) {
      
      if (JSON.stringify(OldTrains[ind])!==JSON.stringify(Trains[ind])) {
        // console.log(OldTrains[ind] , Trains[ind]);
        if (Trains[ind].length) {
          journality.push([ind+1, Trains[ind]])
        }else{
          journality.push([ind+1, 0])
        }
        
        
      }
    }

    console.log(journality);
    if (journality[0]) {
      axios.post('https://evraz-back.vercel.app/api?need=ns', JSON.stringify(journality)).then(e=>console.log(e.data)).catch(er=>console.log(er))
    }
  }
  
 



  return (
    <div className="App">   



      {RightB?
        <div className="RightB" onClick={()=>SetRightB(false)}>
          <p onClick={e=>e.stopPropagation()} style={{top: RightB[2], left: RightB[1]}}>
            
            <h1>Вагон №{RightB[0][0]}</h1>
            <hr />
            <div className="infor">
              <div><span>Простой на станции</span><span>{RightB[0][8]}</span></div>
              <div><span>Собственник</span><span>{RightB[0][1]}</span></div>
              <div><span>Оператор</span><span>???</span></div>
              <div><span>Тип вагона</span><span>{RightB[0][4]}</span></div>
              <div><span>Гружённый</span><span>{RightB[0][6]=="POROZHNIE"?<span>Нет</span>:<span>Да</span>}</span></div>
              <div><span>Позиция</span><span>{RightB[0][2]}</span></div>
              <div>{RightB[0][5]}</div>
            </div>
          </p>
        </div>
        :<></>}
        <div className='basic'>
          <div className='first-line'>
            <img src='/img/rgd.svg'/>
            <p>АРМ дежурного по станции</p>
            <p>Журнал операций</p>
          </div>
          <div className="second-line">

            <div className="second-l">
              <select>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
                <option value='Новокузнецк Северный'>Новокузнецк Северный</option>
              </select>
              <div className='stations'>
                 
              </div>
              </div>

             <div className="second-r">
               <select onChange={e=>{SetSortSob(e.target.value=='0'?false:e.target.value)
               console.log(e.target.value=='0'?e.target.value:false) }}>
                   <option value={0}>Собственник</option>
                   
                    {ColorSob.map((e, id)=>
                    <option key={id} value={e.sob}>{e.sob}</option>
                    )}
               </select>
               <div className="sep-v"></div>
               <span className='filter'>
                 <img src="/img/filter.svg" alt="" width={24}/>
                 <div>2</div>
               </span>
               <span className='vagon'>
                 <img src="/img/vagon.svg"  alt="" width={26}/> (3)
               </span>
             </div>
              
           </div>

          <div className='panel'>
             <p style={{fontFamily: 'GT'}}>АРМ дежурного по станции</p>
             <div className='third-line'>
                   <div className='third-l'>
                     <div>
                       <input id='FreeWay' onChange={e=>console.log(e.target.value)} type="checkbox" />
                       <label htmlFor="FreeWay">Скрыть свободные пути</label>
                     </div>
                     <div>
                      
                       <input
                       id='Number'
                       value={true}
                       name="Number"
                       onChange={e=>NumberTrain?SetNumberTrain(false):SetNumberTrain(true)}
                       type="checkbox" checked={NumberTrain}/>

                       <label htmlFor="Number">Номер вагона</label>
                     </div>
                   </div>
                   <div className="third-r">
                     <p>Операции на станции</p>
                     <div>2</div>
                     <img src={"/img/train.svg"} width={25.1} alt="" />
                     <img src="/img/excel.svg" width={20} alt="" />
                   </div>
               </div>

               <div className='fourth-line'>
                 <span>Собственники:</span>

                {ColorSob.map((e, id)=>
                  <div key={id} className="item-fl">
                    <div className="quadro" style={{backgroundColor: 'var(--'+e.sob+')'}}></div>
                    <p>{e.sob}({e.n})</p>
                  </div>
                  )}
    
               </div>

               <div className='fifth-line'>
                 <input placeholder='поиск по вагону' />
                  <div><div className='quadro' style={{backgroundColor: 'orange'}}></div>Больные (3)</div> 
                  <div><img src="/img/shasi.svg" width={55}/> Простой более 5 суток (34)</div> 
                  <div><img src="/img/gruzhenyeIsh.svg" width={14} /> Груженые исходящие (10)</div> 
                  <div><img src="/img/square.svg" width={14} alt="" /> Порожние (50)</div> 
               </div>


              
      <div className="table" ref={table}>
        <div className="colomuns info">
          <div className="item"><img src="/img/info.svg" alt="" /></div>
          <span>Парк &quot;П&quot;</span>
        </div>
        <div className="colomuns">
          <div className="item">Путь</div>
          <div className="item">1</div>
          <div className="item">2</div>
          <div className="item">3</div>
          <div className="item">4</div>
          <div className="item">5</div>
          <div className="item">6</div>
        </div>

        <div className="colomuns">
          <div className="item">Всего</div>
          {Trains.map((e, id)=>
            <div key={id} className="item">
              {e.length}
            </div>
            )}
        </div>

        <div className="colomuns">
          <div className="item">Л (Чётная)</div>
          <div className="item mec">1</div>
          <div className="item mec">2</div>
          <div className="item mec">3</div>
          <div className="item mec">1</div>
          <div className="item mec">2</div>
          <div className="item mec">3</div>
        </div>
      <div className="columns" onMouseMove={e=>
      { if (FlyTrain) SetPosTrain([e.clientX, e.clientY])}}
      style={FlyTrain?{cursor: "grab"}:{}}
      >
      <div className="item"></div>


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
        <div className="item mec" key={way} onDoubleClick={

          (koordi)=>{
            if (FlyTrain) {
              
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
            
            {
            e.map(
              
              (el, id)=>{
                // console.log('start');
                // console.log(el);
                // console.log(e.filter(ele=>ele[1]=='OTHER'), '-------');
                // console.log(el && (SortSob==el[1] || !SortSob));
                return(
                  <span key={id}>
              {el && (SortSob==el[1] || !SortSob)  ?<div className="train" onDoubleClick={
                (koordi)=>
                
                {
                  console.log(false)
                  if (!FlyTrain && !SortSob) {
                    const xy = {x: koordi.clientX, y: koordi.clientY}
                    let TrainsArr = Array.from(Trains)

                    

                // }else{
                  TrainsArr[way].splice(el[2]-1, 1)

                  for (let index = el[2]-1; index < TrainsArr[way].length; index++) {
                    if (TrainsArr[way][index]) TrainsArr[way][index][2]--
                    
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
                <img src={"/img/trains/"+el[1]+"/"+el[6]+"/"+el[3]+"/1.svg"} />
                
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
          <div className="item">Л (Нечётная)</div>
          <div className="item mec">4</div>
          <div className="item mec">5</div>
          <div className="item mec">6</div>
          <div className="item mec">4</div>
          <div className="item mec">5</div>
          <div className="item mec">6</div>
        </div>
      </div>
      {/* <div onClick={PostTrains} className="posttrain"> */}
      <div onClick={PostTrains} className="posttrain">
        Click
      </div>
              

           </div>

         </div>
     </div>
  );
};

export default Main
