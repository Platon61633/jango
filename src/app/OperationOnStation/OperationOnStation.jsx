'use client'
import React, { useEffect, useRef, useState } from 'react';
import '../OperationOnStation.css'
import axios from 'axios';
import Loader from '@/components/Loader';

// -----------------------------------------------

// -----------------------------------------------

// -----------------------------------------------
// 
// -----------------------------------------------
// -------------------------------------------------Сделай операции между станциями
// --------------------------------------------------------------------------------
// ------------------------------
// -----------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------
// ---------------------------------------------

const OperationOnStation = ({station, flagFunc, CancelTrain, CH, NotCH, SetMovingTrain, MovingTrain, numberOperation}) => {


    const Train = MovingTrain[numberOperation]

    const [NumOp , SetNumOp] = useState('');
    const [Minut , SetMinut] = useState('Загружается...');
    const [CustomOP , SetCustomOP] = useState(false);
    const [StartTime , SetStartTime] = useState(new Date().toLocaleString().slice(6, 10)+'-'+new Date().toLocaleString().slice(3, 5)+'-'+new Date().toLocaleString().slice(0, 2)+'T'+new Date().toLocaleString().slice(12, 17));
    const [FinishTime , SetFinishTime] = useState(new Date().toLocaleString().slice(6, 10)+'-'+new Date().toLocaleString().slice(3, 5)+'-'+new Date().toLocaleString().slice(0, 2)+'T'+new Date().toLocaleString().slice(12, 17));
    const [Load , SetLoad] = useState(false);
    
    
    
    

    const RefType = useRef()
    const RefComment = useRef()
    const RefReason = useRef()
    const RefStartStation = useRef();
    const RefFinishStation = useRef();
    const RefStartPark = useRef();
    const RefFinishPark = useRef();
    const RefStartWay = useRef();
    const RefFinishWay = useRef();
    const RefNapravlenie = useRef();
    
    const TypeOperation = ['Перестановка вагонов', 'Перестановка вагонов без отцепки локомотива',
'Подача вагонов', 'Уборка вагонов', 'Взвешивание вагонов', 'Очистка вагонов от снега', 'Ст. Междуреченск - перестановка из парка в парк',
'Отцепка вагонов от состава', 'Выгрузка', 'Погрузка', 'Очистка вагонов от снега']
    
    // const Parks = ['Полосухино', 'Ольжерасская', 'Новокузнецк Северный', 'Новокузнецк Северный']

    
    

    useEffect(()=>{
        // axios.get("https://evraz-back.vercel.app/api?need=train&train="+FinishTrain.number)
        // .then(e=>SetStartTrain(e.data))
        axios.get('https://evraz-back.vercel.app/api?need=operation')
        .then(e=>{
            let max = e.data[0][0]
            for (let i = 1; i < e.data.length; i++) {
                if (e.data[i][0]>max) {
                    max = e.data[i][0]
                }
            }
            SetNumOp(max);
        })
        SetMinut(Math.floor(Math.random()*(50-30)+30))
        // StartTime.current
    },[])
    
    
    const nextOperation = ()=>{
        // console.log(MovingTrain);
        if (numberOperation==0) {
            flagFunc(false)
        }
        

        SetMovingTrain(MovingTrain.slice(0, numberOperation))
    }
    
    const PostOperation = async ()=>{
        SetLoad(true)
        await axios.post('https://evraz-back.vercel.app/api?need=operation', JSON.stringify(
            [   RefReason.current.value, 
                RefType.current.value,
                Number(Train.locoCH)?Number(Train.locoCH):0,
                Number(Train.locoNotCH)?Number(Train.locoNotCH):0, 
                Number(Train.number),
                RefStartStation.current.value+' '+RefStartPark.current.value+' '+RefStartWay.current.value,
                RefFinishStation.current.value+' '+RefFinishPark.current.value+' '+RefFinishWay.current.value,
                Number(Minut),
                StartTime,
                FinishTime,
                
            ]   
        )).then(a=>console.log(a.data))
        SetLoad(false)
        nextOperation()
    }

    return(
        <div className='OperationOnStation'>
            {Load?<Loader/>:null}
            <h2>Регистрация операции {numberOperation+1}</h2>
            <hr />
            {/* <div className='p'>Иполняемая операция: {NumOp}</p> */}
            <div className="info">
                <div className="item">
                    <div className='time'>
                        <div>Начало операции</div>
                        <input type="datetime-local" value={StartTime} onChange={e=>SetStartTime(e.target.value)}   />
                    </div>
                    <div className='time'>
                        <div>Окончание операции</div>
                        <input type="datetime-local" value={FinishTime} onChange={e=>SetFinishTime(e.target.value)}  />
                    </div>
                </div>
                <div className="item">
                    <div style={{fontWeight: 700}}>
                        Длительность, мин: {Minut}
                    </div>
                    <div>
                        <span style={{fontWeight: 300}}>норматив/отклонение:</span> 40/<span className='otklonenie' style={(Minut-40)>0?{backgroundColor: '#ff0d00'}:{backgroundColor: '#0dff00'}}>{40-Minut}</span>
                    </div>
                    <textarea ref={RefComment} style={{width: '100%'}} placeholder='Введите текст комментария'></textarea>
                </div>
                <div className="item row">
                    <div>
                        <div>Вид операции</div>
                        
                        <select ref={RefType}>
                                 <option>Выберите из списка</option>
                            {TypeOperation.map((e,id)=>
                                <option value={e} key={id}>{e}</option>
                            )}
                        </select>
                    </div>
                    {CustomOP?
                    <div>
                        <div>Вид операции, которой нет в списке</div>
                        <input ref={RefType} type="text" placeholder='Введите вид операции'/>
                    </div>
                    :
                        <div  onClick={()=>SetCustomOP(true)} className='btn'>Операции нет в списке</div>
                    }
                    <div>
                        <div>Причина</div>
                        <textarea ref={RefReason} placeholder='Введите проблему'/>
                    </div>
                </div>
                <div className="item row">
                    <div className='p'>
                        <div>
                              <div>Станция отправления</div>
                              <select ref={RefStartStation}>
                                  {[{title: 'Полосухино', value: 'po'}, 
                                  {title: 'Ольжерасская', value: 'ol'}, 
                                  {title: 'Новокузнецк Северный', value: 'ns'}, 
                                  {title: 'Есауловка', value: 'es'}].map((e, id)=>
                                    <option selected={e.value==station} key={id} value={e.value} >{e.title}</option>
                                  )}
                              </select>
                        </div>
                        <div>
                              <div>Станция прибытия</div>
                              <select ref={RefFinishStation}>
                                  {[{title: 'Полосухино', value: 'po'}, 
                                  {title: 'Ольжерасская', value: 'ol'}, 
                                  {title: 'Новокузнецк Северный', value: 'ns'}, 
                                  {title: 'Есауловка', value: 'es'}].map((e, id)=>
                                    <option selected={e.value==station} key={id} value={e.value} >{e.title}</option>
                                  )}
                              </select>
                        </div>
                    </div>
                    
                    <div className='p'>
                        <div>
                              <div>Путь отправления</div>
                              <div>{Train.wayStart}</div>
                        </div>
                        <div>
                              <div>Путь прибытия</div>
                              <select ref={RefFinishWay}>
                                <option>Выберите из списка</option>
                                  {[1, 2, 3, 4, 5, 6].map(e=>
                                  <option key={e} selected={e==Train.wayFinish?'selected':null}>{e}</option>)}
                              </select>
                        </div>
                    </div>
                    <div className='p'>
                        <div>
                              Вагон №{Train.number}
                        </div>
                        <div>
                              <div>Направление подачи</div>
                              <select ref={RefNapravlenie}>
                                <option>Выберите из списка</option>
                                  {['с четной', 'с нечетной'].map((e, id)=>
                                  <option key={id}>{e}</option>)}
                              </select>
                        </div>
                    </div>
                </div>
                {CH?
                CH.map((e,id)=>
                <div className='item'>
                    <div>
                        <div>Чёт. Локомотив №{id+1}</div>
                        <select>
                            <option>{e[0]}</option>
                            <option>3</option>
                            <option>3</option>
                        </select>
                    </div>
                    <div>
                        <div>ФИО машиниста</div>
                        <select>
                            <option>3</option>
                            <option>3</option>
                            <option>3</option>
                        </select>
                    </div>
                </div>)
                :
                null}
                {NotCH?
                NotCH.map((e,id)=>
                    <div className='item'>
                        <div>
                            <div>Нечёт. Локомотив №{id+1}</div>
                            <select>
                                <option>{e[0]}</option>
                                <option>3</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div>
                            <div>ФИО машиниста</div>
                            <select>
                                <option>3</option>
                                <option>3</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>)
                    :null}
                
                
            </div>
            <hr />
            <div className='submit'>
                <div style={{color: '#15386C', fontWeight: 800, display: 'flex', flexDirection: 'column', gap: 20}}>
                    <div onClick={()=>{
                        nextOperation()
                        CancelTrain(Train)
                    }}>Отмена</div>
                    <div onClick={()=>flagFunc(false)}>Отменить всё</div>
                </div>
                
                <div onClick={PostOperation} className="btn">Сохранить</div>
            </div>
        </div>
    );
};

export default OperationOnStation