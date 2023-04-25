import React, { useEffect, useState, useRef } from 'react'
import './index.css'
import {useNavigate} from 'react-router-dom'
// back audio
const audio = require('./audio/background_v01.mp3');
export default function Index() {
    let navigate = useNavigate();
    // display of audio play button

    let [audioShowState, setAudioShowState] = useState(false)
    let [volume, setVolume] = useState(0.02);

    const [showDialog,setShowDialog] = useState(false)

    let radioRef = useRef()

    useEffect(() => {
        radioRef.current.play();
        radioRef.current.volume = volume;
    }, [volume])


    return (
        <div className="WebContainer">
            <div className="background">
                <div className="image"></div>
            </div>
            <p className="logo">SLACKER</p>
            <div>
                <div className="buttons">
                    <span href="#" id="button1" className="button button1" onClick={() => {
                        setShowDialog(true);
                    }}>


                    </span>
                    <div className='dialogContainer' style={{display:showDialog ? 'block' :'none'}}>
                        <div className='dialogHeader'>
                            SLACKER.txt
                            <span className='dialogClose' onClick={()=>{
                                setShowDialog(false);
                            }}>X</span>
                        </div>
                        <div className='dialogFooter'>SLACKER © was developed by:<br/><br/>Brendon Freaney<br/>Fabio Lima<br/>Jasmine Ha<br/>Kevin Shiels<br/>Siobhan Hardt<br/>Tan Xiaoxu<br/><br/>SLACKER © 2023. All rights reserved.</div>
                    </div>
                    <span href="#" id="button2" className="button button2"></span>
                    <span href="#" className="button button3" onClick={() => {
                        setAudioShowState(!audioShowState);
                        if (radioRef.current.pause) {
                            radioRef.current.play();
                        }
                    }}></span>
                    <div style={{ display: audioShowState ? 'block' : 'none' }}>
                        <input type="range" min="0" max="1" step="0.01" value={volume} className="volume-slider" onInput={(e) => {
                            setVolume(e.target.value);
                        }} />
                    </div>
                </div>
            </div>
            <div className="cash">
                <p>
                    $ 1200
                </p>
            </div>

            <div className="navButtons">
                <button id="shopButton" className="btn btn-lg btn-primary button" type="button" onClick={()=>{
                    navigate('/drawCard')
                }}>SHOP</button>
                <button id="deckButton" className="btn btn-lg btn-primary button" type="button" onClick={()=>{
                    navigate('/deckManage')
                }}>DECK</button>
            </div>

            {/* audio  */}
            <audio style={{ visibility: 'hidden' }} ref={radioRef} src={audio} loop  controls></audio>
        </div>
    )
}