import React from 'react';
import ReactDOM from 'react-dom';

// about the cards
import './card.scss';
import CardArea from './cardArea';
import BtnArea from './btnArea'

class Game extends React.Component {
    cardArea!: CardArea; // Add ! after the class member variable to declare that it must be assigned

    // about the opening
    onRef = (ref: CardArea) => {
        this.cardArea = ref;
    }

    render() {
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
                <CardArea ref={this.onRef} />
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
