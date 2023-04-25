import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom';
import './index.css'
import api from '../../utils/api'
let backEmnu = {
    "Instant": '#86c5d5',
    "Skill Check" : '#ddc585',
    "Standard" : '#86c5d5',
    "Versus" : '#be8fd3'
}
export default function Index() {
    const [cardsData,setCardsData] = useState([]);
    
    const navigate =  useNavigate();
    // pre page
    const [prevPage,setPrevPage] = useState(0);
    // next page
    const [pageNumber,setPageNumber] = useState(1)
    const [pageSize,setPageSize] = useState(6);
    // fliter
    const [filter,setFilter] = useState(null);
    // sort
    const [sort,setSort] = useState(null); 

    const [cardLists,setCardLists] = useState([])


    useEffect(()=>{
         let user = JSON.parse(localStorage.getItem('user')); 
         if(!user) return;
         api.findDeckCards({
            email:user.email
         }).then(res=>{
            if(res.code === 1){
                setCardsData([...res.cards]);
            }
         })
    },[])

    useEffect(()=>{
        let handerArray = [...cardsData]
        let handerData = [...handerArray.splice(prevPage * pageSize  , pageSize)];

        if(filter){
            if(filter !== 'all') {
                handerData =  handerData.filter(card => card.type === filter)
            }
        }
        
        if (sort === 'asc') {
            handerData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'desc') {
            handerData.sort((a, b) => b.name.localeCompare(a.name));
        }

        console.log(handerData);

        // 起始位置
        setCardLists( handerData);
    },[pageSize,pageNumber,prevPage,filter,sort,cardsData])

  return (
    <div className="wrapper">
        <div className="window" >
            <div className="title-bar">
                <span className="title">Deck</span>
            </div>
            <div className="menu-bar">
                <ul className="menu">
                    <li onClick={()=>{
                        navigate('/dashboard')
                    }}>Back</li>
                    <li>
                        <select onChange={(e)=>{
                            setSort(e.target.value);
                        }}>
                            <option value="default">Sort</option>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </li>
                    <li>
                        <select onChange={(e)=>{
                            setFilter(e.target.value);
                        }}>
                            <option value="all">Filter</option>
                            <option value="Standard">Standard</option>
                            <option value="Versus">Versus</option>
                            <option value="Skill Check">Skill Check</option>
                            <option value="Instant">Instant</option>
                        </select>
                    </li>
                </ul>
            </div>
            <div className="content">
            <div className='cardContainer' >
                                    {

                                   
                                        cardLists.map(item => <div key={item.id} className='imgContainer'>
                                                <div className='cardFront' style={{boxShadow:`0px 0px 8px 7px ${backEmnu[item.type]}`,transform: 'rotateY(0deg)'}}>
                                                    <p className='title' >{item.name}</p>
                                                    <div className='footerCard'>
                                                        <img className='img' width={180} src={item.imageUrl} alt={item.name} />
                                                        <p className='desTitle'>{item.type.toUpperCase()}</p>
                                                        <p className='description'>{item.description}</p>
                                                    </div>
                                                </div>
                                        </div>)
                                    }
                                </div>
                {/* <div className="card-container">
                    312
                </div> */}
            </div>
            <div className="bottom">
                <div className="arrow-container">
                    <div className="arrow left" onClick={()=>{
                        if(prevPage - 1 < 0) {
                            return;
                        }
                        setPrevPage(prevPage - 1)
                    }}></div>
                    <div className="arrow right" onClick={()=>{
                        setPrevPage(prevPage + 1)
                    }}></div>
                </div>
            </div>
        </div>
    </div>
  )
}
