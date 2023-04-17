import React, { Component } from 'react';

interface HistoryState {
    historyStatus: boolean;
    historyList: {
        rarity: string;
        name: string;
    }[];
    indexedDB: IDBDatabase | null;
    count: number[];
}

interface HistoryProps {
    onRef?: (ref: History) => void;
}

export default class History extends Component<HistoryProps, HistoryState> {
    constructor(props: HistoryProps) {
        super(props);
        this.state = {
            historyStatus: false,
            historyList: [],
            indexedDB: null,
            count: [],
        };
        this.getList = this.getList.bind(this);
    }

    componentDidMount() {
        this.props.onRef && this.props.onRef(this);
        const request = window.indexedDB.open('History');
        request.onerror = () => {
            console.error('Error');
        };

        request.onsuccess = (e) => {
            this.setState({
                indexedDB: e.target.result,
            });
        };
    }

    getList = () => {
        const customerOS = this.state.indexedDB!.transaction(['heros'], 'readwrite').objectStore('heros');
        const dataArr: HistoryState['historyList'] = [];
        customerOS.openCursor().onsuccess = (event) => {
            const result = event.target.result;
            if (result) {
                dataArr.push(result.value);
                result.continue();
            }
            this.setState({
                historyStatus: true,
                historyList: dataArr,
            });
        };
        this.getCount();
    };

    getCount = () => {
        const typeArr = ['legend', 'epic', 'elite', 'ordinary'];
        const count: HistoryState['count'] = [];

        const request = this.state.indexedDB!.transaction(['heros'], 'readonly').objectStore('heros');
        for (let index = 0; index < typeArr.length; index++) {
            const typeCount = request.index('rarity').count(typeArr[index]);
            typeCount.onsuccess = () => {
                if (typeCount.result) {
                    count.push(typeCount.result);
                    this.setState({
                        count,
                    });
                }
            };
        }
    };

    sumCount() {
        let total = 0;
        this.state.count.forEach((value) => {
            total += value;
        });
        return total;
    }

    render() {
        const historyTab = this.state.historyList.map((history, index) => (
            <tr className={`rarity_${history.rarity}`} key={index}>
                <td>{index + 1}</td>
                <td>{history.rarity}</td>
                <td>{history.name}</td>
            </tr>
        ));
        return (
            <div className="history_area" style={{ display: this.state.historyStatus ? 'flex' : 'none' }}>
                <div className="history_list">
                    <table>
                        <thead>
                        <tr>
                            <th>No.</th>
                            <th>Rank</th>
                            <th>Hero</th>
                        </tr>
                        </thead>
                        <tbody>{historyTab}</tbody>
                    </table>
                </div>
                <div className="history_count">
                    <div className="rarity_legend">传奇：{this.state.count[0]}</div>
                    <div className="rarity_epic">史诗：{this.state.count[1]}</div>
                    <div className="rarity_elite">精英：{<div className="rarity_legend">传奇：{this.state.count[0]}</div>
                        <div className="rarity_epic">史诗：{this.state.count[1]}</div>
                        <div className="rarity_elite">精英：{this.state.count[2]}</div>
                        <div className="rarity_ordinary">普通：{this.state.count[3]}</div>
                        <div className="rarity_total">Total：{this.sumCount()}</div>
                        <button onClick={() => {
                        this.setState({
                        historyStatus: false
                    })
                    }}>close history</button>
                   </div>
