import React from 'react';
import Card from './Card';

import heros from "?????";

export default class CardArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardAreaStatus: false, // 抽卡状态
            cardArr: [], // 抽出的卡片
            indexedDB: null // 本地数据库
        }
        this.addHistory = this.addHistory.bind(this);
    }

    componentDidMount () {
        this.props.onRef && this.props.onRef(this);
        const request = window.indexedDB.open('History');
        request.onerror = () => {
            console.error('Error')
        }

        request.onsuccess = (e) => {
            this.setState({
                indexedDB: e.target.result
            })
        }

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            let objectStore;
            console.log(event, db);
            if (!db.objectStoreNames.contains('heros')) {
                objectStore = db.createObjectStore('heros', { autoIncrement: true });
                objectStore.createIndex('id', 'id', { unique: true });
                objectStore.createIndex('rarity', 'rarity', { unique: false });
                objectStore.createIndex('name', 'name', { unique: false });
            }
        }
    }

    addHistory (card) { // 点击抽卡将抽卡结果加入到indexedDB里
        console.log(this.state);
        const customerOS = this.state.indexedDB.transaction(['heros'], 'readwrite').objectStore('heros');
        const data = {
            id: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
            rarity: card.rarity || null,
            name: card.hero.name || null
        }
        const request = customerOS.add(data);
        request.onsuccess = () => {
            console.log(data, '数据已新增');
        }
        request.onerror = () => {
            console.error(data);
        }
    }

    // 更新卡池
    updateCard (num) {
        this.setState({
            cardAreaStatus: true,
            cardArr: this.randomHero(num)
        })
    }

    // 关闭抽卡
    closeCardArea () {
        this.setState({
            cardAreaStatus: false,
            cardArr: []
        })
    }


    getHeros () { // 获取单个英雄
        const rarityNum = Math.floor(Math.random() * 100); // 使用伪随机数（0 - 100之间的整数）获取随机稀有度
        let rarityArr = heros.ordinary;
        let rarity = "ordinary";
        if (rarityNum < 3) { // 此处配置抽卡几率
            rarityArr = heros.legend;
            rarity = "legend";
        } else if (rarityNum < 10) {
            rarityArr = heros.epic;
            rarity = "epic";
        } else if (rarityNum < 20) {
            rarityArr = heros.elite;
            rarity = "elite";
        }
        const heroNum = Math.floor(Math.random() * rarityArr.length); // 此处获取随机武将
        const hero = rarityArr[heroNum];
        const card = {
            rarity: rarity,
            hero: hero
        }
        this.addHistory(card);
        return card;
    }

    randomHero (num) { // 执行单抽与十连抽操作，按传入数字判断
        const heros = [];
        for (let i = 0; i < num; i++) {
            heros.push(this.getHeros());
        }
        return heros;
    }

    render () { // 生成页面
        const cardArea = this.state.cardArr.map((card, index) =>
            <Card key={index} cardInfo={card} />
        )
        return (
            <div className="card_main" style={{ display: this.state.cardAreaStatus ? "flex" : "none", backgroundImage: `url(${require('./../../images/bg_card.jpg')})` }}>
                <div className="close_btn" onClick={this.closeCardArea.bind(this)}>
                    <img src={require('./../../images/close.png')} alt="" />
                </div>
                <div className="card_area">
                    {cardArea}
                </div>
            </div>
        );
    }
}
