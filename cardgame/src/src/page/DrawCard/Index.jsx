import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { getRandomCard } from '../../utils/index'
import { useNavigate } from 'react-router-dom'

import api from '../../utils/api'



let backEmnu = {
    "Instant": '#86c5d5',
    "Skill Check": '#ddc585',
    "Standard": '#86c5d5',
    "Versus": '#be8fd3'
}



export default function Index() {
   const [cardsData,setCardsData] = useState([]);
    let navigate = useNavigate();
    let cardContainer = useRef();
    const [showImg, setShowImg] = useState([])
    let [state, setState] = useState(null);
    window.oncontextmenu = function (e) {
        //It is very important to cancel the default browser's own right button!！
        e.preventDefault();
    }
    useEffect(()=>{
        api.getCards().then(res=>{
            let newCardArray = [];
            if(res.code === 1){
                newCardArray = res.cardList.map(item => {
                    return {
                        ...item,
                        imageUrl: function(){
                            try {
                                return require(`../../asstes/${item.imageUrl}`)
                                
                            } catch (error) {
                                return '';
                            }
                        }()
                    }
                })
            }
           setCardsData(newCardArray);

        })
    },[])


    useEffect(() => {
        //    if(!state){
        //         window.onmousedown = null;
        //    }else{
        //         window.onmousedown = (e)=>{
        //             e.preventDefault();
        //             if(e.button === 0){
        //                 window.onmousedown = null;
        //                 navigate('/');
        //             }else if(e.button === 2){

        //             }                
        //         };
        //    }
    }, [state])


    const buttonHander = (count) => {
        if(cardsData.length > 0){
            let fanhuideshuzu = getRandomCard(cardsData, count)
            setState(count);
            setShowImg(fanhuideshuzu);
        }
       
    }
    return (
        <section className='back'>
            <section className='mouse'>
                <section className='leftIcon' onClick={()=>{
                      navigate('/dashboard');
                }}></section>
                <section className='rightIcon' onClick={()=>{
                      setState(null);
                }}></section>
                <section className='center'>
                    {
                        state
                            ?
                            <>
                                <div className='cardContainer' ref={cardContainer}>
                                    {
                                        showImg.map(item => <div key={item.id} className='imgContainer'>
                                            <div className='cardFront' style={{ boxShadow: `0px 0px 8px 7px ${backEmnu[item.type]}` }}>
                                                <p className='title' >{item.name}</p>
                                                <div className='footerCard'>
                                                    <img className='img' width={180} src={item.imageUrl} alt={item.name} />
                                                    <p className='desTitle'>{item.type.toUpperCase()}</p>
                                                    <p className='description'>{item.description}</p>
                                                </div>
                                            </div>
                                            <div className='cardBack'></div>
                                        </div>)
                                    }

                                </div>
                            </>

                            :
                            <div className='lotteryContainer'>
                                <button className='my_button' onClick={() => {
                                    buttonHander(1);
                                }}>one card</button>
                                <button className='my_button' onClick={() => {
                                    buttonHander(6);
                                }}>six card</button>
                            </div>
                    }


                </section>

                <button style={{ display: state ? 'block' : 'none' }} className='my_button cof' onClick={() => {

                    let user = JSON.parse(localStorage.getItem('user')) ;

                    if(user){
                        api.uploadCard({
                            cardList:showImg,
                            email:user.email
                        }).then(res=>{
                            if(res.code === 1){
                                Array.prototype.forEach.call(cardContainer.current.children, (item, index) => {
                                    setTimeout(() => {
                                        item.children[0].style.transform = 'rotateY(0deg)';
                                        item.children[1].style.transform = 'rotateY(-180deg)';
                                    }, 500 * index);
                                });
                            }
                        })
                    }else{
                        navigate('/');
                    }

                    
                }}>REVEAL All</button>
            </section>
            <section>

            </section>
        </section>
    )
}
