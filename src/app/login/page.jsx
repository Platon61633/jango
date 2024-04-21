"use client"
import React, { useEffect, useRef, useState } from 'react';
import '../login.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const Login = () => {
    
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(()=>{
        const ArrCookies = JSON.stringify(cookies).slice(2,-1)
        let f = false
        for (let i = 0; i < ArrCookies.length; i++) {
            if (ArrCookies[i]=='"') {
                SetName(ArrCookies(0, i))
            }
            break
        }
    },[cookies])

    const router = useRouter()

    

    const [Name , SetName] = useState('');
    const [Password , SetPassword] = useState('');
    const [Station, SetStation] = useState('ns')
     

    
    
    const RefName = useRef(null)

    const Authorization = async ()=>{
        await axios.post("https://evraz-back.vercel.app/api?need=authorization", [Name, Password])
        .then(id=>{
            if (id.data) {
                setCookie(Name, [Password, Station], { path: '/', })
                router.push(`/station/${id.data}/${Password}/${Station}`, { scroll: false })
            } else {
                console.log('no')
            }
            
        })
    }

    return(
        <div className="login-layout">
            <div className='Login'>
                <section className="title">
                    <div>
                        <img src="/img/logo+amp.svg" alt="" />
                    </div>
                    <h1>
                        Авторизация
                    </h1>
                </section>
                <hr />
                <section className='inputs'>
                    <div className="item">
                        <label htmlFor="">
                            Станция
                        </label>
                        <select onChange={(e)=>SetStation(e.target.value)}>
                            <option value="ns">
                                Новокузнецк Северный
                            </option>
                            <option value="es">
                                Есауловка
                            </option>
                            <option value="ol">
                                Ольжерасская
                            </option>
                            <option value="po">
                                Полосухино
                            </option>
                        </select>
                    </div>
                    <div className="item">
                        <label htmlFor="">
                            Логин
                        </label>
                        <input type="text" value={Name} onChange={e=>SetName(e.target.value)}/>
                    </div>
                    <div className="item">
                        <label htmlFor="">
                            Пароль
                        </label>
                        <input type="text" value={Password} onChange={e=>SetPassword(e.target.value)}/>
                    </div>
                </section>
                <hr />
                <section>
                    <div onClick={Authorization} className="SubLogin">
                        Войти
                    </div>
                </section>
            </div>
            <div onClick={()=>console.log(cookies)}>click</div>
        </div>
    );
};

export default Login