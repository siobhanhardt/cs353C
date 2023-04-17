// import React from 'react';
// import Card from './Card';
//
// import heros from '../cardJSON.json';
//
// interface Props {
//     onRef?: any;
// }
//
// interface CardData {
//     rarity: string;
//     hero: {
//         name: string;
//     };
// }
//
// interface State {
//     cardAreaStatus: boolean;
//     cardArr: CardData[];
//     indexedDB: IDBDatabase | null;
// }
//
// export default class CardArea extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.state = {
//             cardAreaStatus: false,
//             cardArr: [],
//             indexedDB: null,
//         };
//         this.addHistory = this.addHistory.bind(this);
//     }
//
//     componentDidMount() {
//         this.props.onRef && this.props.onRef(this);
//         const request = window.indexedDB.open('History');
//         request.onerror = () => {
//             console.error('Error');
//         };
//
//         request.onsuccess = (e) => {
//             this.setState({
//                 indexedDB: e.target.result,
//             });
//         };
//
//         request.onupgradeneeded = (event) => {
//             const db = event.target.result as IDBDatabase;
//             let objectStore: IDBObjectStore;
//             console.log(event, db);
//             if (!db.objectStoreNames.contains('heros')) {
//                 objectStore = db.createObjectStore('heros', {autoIncrement: true});
//                 objectStore.createIndex('id', 'id', {unique: true});
//                 objectStore.createIndex('rarity', 'rarity', {unique: false});
//                 objectStore.createIndex('name', 'name', {unique: false});
//             }
//         };
//     }
//
//     addHistory(card: CardData) {
//         const customerOS = this.state.indexedDB.transaction(['heros'], 'readwrite').objectStore('heros');
//         const data = {
//             id: Number(Math.random().toString().substr(3, 10) + Date.now()).toString(36),
//             rarity: card.rarity || null,
//             name: card.hero.name || null,
//         };
//         const request = customerOS.add(data);
//         request.onsuccess = () => {
//             console.log(data, 'Data has been added.');
//         };
//         request.onerror = () => {
//             console.error(data);
//         };
//     }
//
//     updateCard(num: number) {
//         this.setState({
//             cardAreaStatus: true,
//             cardArr: this.randomHero(num),
//         });
//     }
//
//     closeCardArea() {
//         this.setState({
//             cardAreaStatus: false,
//             cardArr: [],
//         });
//     }
//
//     getHeros() {
//         const rarityNum = Math.floor(Math.random() * 100);
//         let rarityArr = heros.ordinary;
//         let rarity = 'ordinary';
//         if (rarityNum < 3) {
//             rarityArr = heros.legend;
//             rarity = 'legend';
//         } else if (rarityNum < 10) {
//             rarityArr = heros.epic;
//             rarity = 'epic';
//         } else if (rarityNum < 20) {
//             rarityArr = heros.elite;
//             rarity = 'elite';
//         }
//         const heroNum = Math.floor(Math.random() * rarityArr.length);
//         const hero = rarityArr[heroNum];
//         const card = {
//             rarity: rarity,
//             hero: hero,
//         };
//         this.addHistory(card);
//         return card;
//     }
//
//     randomHero(num: number) {
//         const heros: CardData[] = [];
//         for (let i = 0; i < num; i++) {
//             heros.push(this.getHeros());
//         }
//         return heros;
//     }
//
//     render() {
//         const { cardAreaStatus, cardArr } = this.state;
//         return (
//             <div className={card-area${cardAreaStatus ? ' active' : ''}}>
//                 <div className="card-area-close" onClick={() => this.closeCardArea()}></div>
//                 <div className="card-list">
//                     {cardArr.map((card, index) => (
//                         <Card key={index} rarity={card.rarity} hero={card.hero} />
//                     ))}
//                 </div>
//             </div>
//         );
//     }
