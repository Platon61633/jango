'use client'
import React, { useEffect, useState } from 'react';
import '../OperationOnStation.css'
import axios from 'axios';


const OperationOnStation = () => {

    const [NumOp , SetNumOp] = useState('');
    const [Minut , SetMinut] = useState('Загружается...');
    const [CustomOP , SetCustomOP] = useState(false);
    const [Data, SetData] = useState({
    startT: new Date().toLocaleString().slice(6, 10)+'-'+new Date().toLocaleString().slice(3, 5)+'-'+new Date().toLocaleString().slice(0, 2)+'T'+new Date().toLocaleString().slice(12, 17), 
    finishT: new Date().toLocaleString().slice(6, 10)+'-'+new Date().toLocaleString().slice(3, 5)+'-'+new Date().toLocaleString().slice(0, 2)+'T'+new Date().toLocaleString().slice(12, 17),
    later: Minut,
    comment: '',
    type: '',
    reason: '',
    startSt: '',
    finishSt: '',
    startP: '',
    finishP:'',
    startW:'',
    finishW: '',
    Vagon: '////*',
    Napravlenie: ''
})
    
    
    const VidyOperation = ['Перестановка вагонов', 'Перестановка вагонов без отцепки локомотива',
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
                        <input type="datetime-local" value={Data.startT} onChange={e=>SetData({startT: e.target.value, ...Data})} name="" id="" />
                    </div>
                    <div className='time'>
                        <div>Окончание операции</div>
                        <input type="datetime-local" value={Data.finishT} onChange={e=>SetData({finishT: e.target.value, ...Data})} name="" id="" />
                    </div>
                </div>
                <div className="item">
                    <div style={{fontWeight: 700}}>
                        Длительность, мин: {Minut}
                    </div>
                    <div>
                        <span style={{fontWeight: 300}}>норматив/отклонение:</span> 40/<span className='otklonenie' style={(Minut-40)>0?{backgroundColor: '#ff0d00'}:{backgroundColor: '#0dff00'}}>{40-Minut}</span>
                    </div>
                    <textarea onChange={e=>SetData({comment: e.target.value, ...Data})} style={{width: '100%'}} placeholder='Введите текст комментария'></textarea>
                </div>
                <div className="item row">
                    <div>
                        <div>Вид операции</div>
                        
                        <select onChange={e=>{SetData({type: e.target.value, ...Data})
                    console.log(Data, e.target.value);
                    setTimeout(()=>console.log(Data), 5000)}}>
                                 <option>Выберите из списка</option>
                            {VidyOperation.map((e,id)=>
                                <option value={e} key={id}>{e}</option>
                            )}
                        </select>
                    </div>
                    {CustomOP?
                    <div>
                        <div>Вид операции, которой нет в списке</div>
                        <input onChange={e=>SetData({type: e.target.value, ...Data})} type="text" placeholder='Введите вид операции'/>
                    </div>
                    :
                        <div  onClick={()=>SetCustomOP(true)} className='btn'>Операции нет в списке</div>
                    }
                    <div>
                        <div>Причина</div>
                        <input onChange={e=>SetData({reason: e.target.value, ...Data})} placeholder='Введите проблему'/>
                    </div>
                </div>
                <div className="item row">
                    <div className='p'>
                        <div>
                              <div>Станция отправления</div>
                              <select onChange={e=>SetData({startSt: e.target.value, ...Data})}>
                                  <option>Новкузнецк Северный</option>
                                  <option>Новкузнецк Северный</option>
                                  <option>Новкузнецк Северный</option>
                                  <option>Новкузнецк Северный</option>
                              </select>
                        </div>
                        <div>
                              <div>Станция прибытия</div>
                              <select onChange={e=>SetData({finishSt: e.target.value, ...Data})}>
                                  <option>Новкузнецк Северный</option>
                                  <option>Новкузнецк Северный</option>
                                  <option>Новкузнецк Северный</option>
                                  <option>Новкузнецк Северный</option>
                              </select>
                        </div>
                    </div>
                    <div className='p'>
                        <div>
                              <div>Парк отправления</div>
                              <select onChange={e=>SetData({startP: e.target.value, ...Data})}>
                                <option>Выберите из списка</option>
                                  {Parks.map((e, id)=>
                                  <option key={id}>{e}</option>)}
                              </select>
                        </div>
                        <div>
                              <div>Парк прибытия</div>
                              <select onChange={e=>SetData({finishP: e.target.value, ...Data})}>
                                <option>Выберите из списка</option>
                                  {Parks.map((e, id)=>
                                  <option key={id}>{e}</option>)}
                              </select>
                        </div>
                    </div>
                    <div className='p'>
                        <div>
                              <div>Путь отправления</div>
                              <select onChange={e=>SetData({startW: e.target.value, ...Data})}>
                                <option>Выберите из списка</option>
                                  {[1, 2, 3, 4, 5, 6].map(e=>
                                  <option key={e}>{e}</option>)}
                              </select>
                        </div>
                        <div>
                              <div>Путь прибытия</div>
                              <select onChange={e=>SetData({finishW: e.target.value, ...Data})}>
                                <option>Выберите из списка</option>
                                  {[1, 2, 3, 4, 5, 6].map(e=>
                                  <option key={e}>{e}</option>)}
                              </select>
                        </div>
                    </div>
                    <div className='p'>
                        <div>
                              Вагон №****
                        </div>
                        <div>
                              <div>Направление подачи</div>
                              <select onChange={e=>SetData({Napravlenie: e.target.value, ...Data})}>
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
                <div onClick={()=>console.log(Data)} className="btn">Сохранить</div>
            </div>
        </div>
    );
};

export default OperationOnStation