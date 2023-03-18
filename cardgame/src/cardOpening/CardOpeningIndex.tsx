import React from 'react';
import ReactDOM from 'react-dom';

// collection
import './card.scss';
import CardArea from "../cardOpening/cardArea";
import BtnArea from "../cardOpening/btnArea"

class Game extends React.Component {
    // collection
    onRef = (ref) => {
        this.cardArea = ref;
    }

    render () {
        return (
            <div className="game" style={{ backgroundImage: `url(${require('./images/bg.jpg')})` }}>
                <BtnArea getHeros={ // call CardArea
                    () => {
                        this.cardArea.updateCard(10);
                    }
                } getHero={ // call CardArea
                    () => {
                        this.cardArea.updateCard(1);
                    }
                } />
                <CardArea onRef={this.onRef} />
            </div >
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
