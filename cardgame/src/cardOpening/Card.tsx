import React, { Component } from "react"

interface Props {
    cardInfo: {
        rarity: string,
        hero: {
            spell: string,
            name: string,
        }
    }
}

interface State {
    underway: boolean,
}

export default class Card extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            underway: false
        }
    }

    // getRarity(rarity: string): string { // 将英文转为中文
    //     switch (rarity) {
    //         case 'legend':
    //             return '传奇';
    //         case 'epic':
    //             return '史诗';
    //         case 'elite':
    //             return '精英';
    //         default:
    //             return '普通'
    //     }
    // }

    render() { // 单个卡片
        return (
            <div className={['card', this.state.underway ? 'flip_card' : ''].join(' ')} onClick={() => {
                this.setState({
                    underway: true,
                })
            }}>
                <div className={["card_face", `rarity_${this.props.cardInfo.rarity}`].join(' ')} style={{ backgroundImage: `url(${require('./../../images/' + this.props.cardInfo.hero.spell + '.jpg')})` }}>
                    {/*<div className="card_rarity">{this.getRarity(this.props.cardInfo.rarity)}</div>*/}
                    <div className="card_info">
                        <div className="card_name">{this.props.cardInfo.hero.name}</div>
                    </div>
                </div>
                <img src={require('./../../images/card_bg.jpg')} alt="" />
            </div>
        );
    }
}
