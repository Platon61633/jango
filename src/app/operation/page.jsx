"use client"
import axios from 'axios';
import '../operation.css';
import React, { useEffect, useState } from 'react';

const Operation = () => {

    const [ArrOperation , SetArrOperation] = useState([[]]);
    

    useEffect(()=>{
        axios.get("https://evraz-back.vercel.app/api?need=operation")
        .then(e=>SetArrOperation(e.data))
    },[])


    return(
        <div className='Operation'>
            <div className="filter">
                <select name="" id="">
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                </select>
                <select name="" id="">
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                </select>
                <select name="" id="">
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                </select>
                <select name="" id="">
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                </select>
                <select name="" id="">
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                </select>
                <select name="" id="">
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                    <option value="">cnfywbz</option>
                </select>
            </div>
            <table align='CENTER'>
                <thead>
                    <tr>
                        <th className='item'>№ операции</th>
                        <th className='item'>Операция</th>
                        <th className='item'>№ лок-ва</th>
                        <th className='item'>Вагоны</th>
                        <th className='item'>Откуда</th>
                        <th className='item'>Куда</th>
                        <th className='item'>Длит. мин</th>
                        <th className='item'>Начало</th>
                        <th className='item'>Окончание</th>
                        <th className='item'> Изменить</th>
                        <th className='item'><img src="/img/info.svg" alt="" /></th>
                    </tr>
                </thead>
                <tbody>
                    {ArrOperation.map((e, id)=>
                        <tr key={id}>
                            {e.map((el, idi)=>
                                <td key={idi}>{idi==0?<img className='circle' src="/img/GreyCircle.svg" alt="" />:null}{el}</td>)}
                            <td><img width={20} src='/img/edit.svg'/></td>
                            <td><img width={20} src="/img/delete.svg" alt="" /></td>
                        </tr>)}
                    
                </tbody>
            </table>
        </div>
    );
};

export default Operation