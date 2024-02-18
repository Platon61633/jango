'use client'
import React, { useEffect, useRef, useState } from 'react';
import '../../OperationOnStation.css'
import axios from 'axios';


const OperationOnStation = ({params}) => {

    const [NumOp , SetNumOp] = useState('');
    const [Minut , SetMinut] = useState('Загружается...');
    const [CustomOP , SetCustomOP] = useState(false);
    const [StartTime , SetStartTime] = useState(new Date().toLocaleString().slice(6, 10)+'-'+new Date().toLocaleString().slice(3, 5)+'-'+new Date().toLocaleString().slice(0, 2)+'T'+new Date().toLocaleString().slice(12, 17));
    const [FinishTime , SetFinishTime] = useState(new Date().toLocaleString().slice(6, 10)+'-'+new Date().toLocaleString().slice(3, 5)+'-'+new Date().toLocaleString().slice(0, 2)+'T'+new Date().toLocaleString().slice(12, 17));
    

    const RefType = useRef()
    const RefComment = useRef()
    const RefReason = useRef()
    const RefStartStation = useRef();
    const RefFinishStation = useRef();
    const RefStartPark = useRef();
    const RefFinishPark = useRef();
    const RefStartWay = useRef();
    const RefFinishWay = useRef();
    const RefVagon = useRef();
    const RefNapravlenie = useRef();
    
    const TypeOperation = ['Перестановка вагонов', 'Перестановка вагонов без отцепки локомотива',
'Подача вагонов', 'Уборка вагонов', 'Взвешивание вагонов', 'Очистка вагонов от снега', 'Ст. Междуреченск - перестановка из парка в парк',
'Отцепка вагонов от состава', 'Выгрузка', 'Погрузка', 'Очистка вагонов от снега']
    
    const Parks = ['А', 'Б', 'В', 'П']
    

    useEffect(()=>{
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

    return(
        <div className='OperationOnStation'>
            <h2>Регистрация операции</h2>
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
                        <input ref={RefReason} placeholder='Введите проблему'/>
                    </div>
                </div>
                <div className="item row">
                    <div className='p'>
                        <div>
                              <div>Станция отправления</div>
                              <select ref={RefStartStation}>
                                  {['Новкузнецк Северный', 'Новкузнецк Северный',
                                  'Новкузнецк Северный', 'Новкузнецк Северный'].map((e, id)=>
                                    <option key={id} value={e}>{e}</option>
                                  )}
                              </select>
                        </div>
                        <div>
                              <div>Станция прибытия</div>
                              <select ref={RefFinishStation}>
                                  {['Новкузнецк Северный', 'Новкузнецк Северный',
                                  'Новкузнецк Северный', 'Новкузнецк Северный'].map((e, id)=>
                                    <option key={id} value={e}>{e}</option>
                                  )}
                              </select>
                        </div>
                    </div>
                    <div className='p'>
                        <div>
                              <div>Парк отправления</div>
                              <select ref={RefStartPark}>
                                <option>Выберите из списка</option>
                                  {Parks.map((e, id)=>
                                  <option key={id}>{e}</option>)}
                              </select>
                        </div>
                        <div>
                              <div>Парк прибытия</div>
                              <select ref={RefFinishPark}>
                                <option>Выберите из списка</option>
                                  {Parks.map((e, id)=>
                                  <option key={id}>{e}</option>)}
                              </select>
                        </div>
                    </div>
                    <div className='p'>
                        <div>
                              <div>Путь отправления</div>
                              <select ref={RefStartWay}>
                                <option>Выберите из списка</option>
                                  {[1, 2, 3, 4, 5, 6].map(e=>
                                  <option key={e}>{e}</option>)}
                              </select>
                        </div>
                        <div>
                              <div>Путь прибытия</div>
                              <select ref={RefFinishWay}>
                                <option>Выберите из списка</option>
                                  {[1, 2, 3, 4, 5, 6].map(e=>
                                  <option key={e}>{e}</option>)}
                              </select>
                        </div>
                    </div>
                    <div className='p'>
                        <div>
                              Вагон №{params.vagon}
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
                <div className="item">
                    <div>
                        <div>Локомотив №1*</div>
                        <select>
                            <option>3</option>
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
                </div>
                <div className="item">
                    <div>
                        <div>Локомотив №1*</div>
                        <select>
                            <option>3</option>
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
                </div>
                <div className="item">
                    <div>
                        <div>Локомотив №1*</div>
                        <select>
                            <option>3</option>
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
                </div>
                <div className="item">
                    <div>
                        <div>Локомотив №1*</div>
                        <select>
                            <option>3</option>
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
                </div>
                
            </div>
            <hr />
            <div className='submit'>
                <div style={{color: '#15386C', fontWeight: 800}}>Отмена</div>
                <div onClick={()=>console.log(
                {StartTime,
                FinishTime,
                Type: RefType.current.value,
                Reason: RefReason.current.value,
                StartStation: RefStartStation.current.value,
                FinishStation: RefFinishStation.current.value,
                StartPark: RefStartPark.current.value,
                FinishPark: RefFinishPark.current.value,
                StartWay: RefStartWay.current.value,
                FInishWay: RefFinishWay.current.value,
                Napravlenie: RefNapravlenie.current.value
                })} className="btn">Сохранить</div>
            </div>
        </div>
    );
};

export default OperationOnStation