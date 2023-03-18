import React from 'react';

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historyStatus: false,
            historyList: [],
            indexedDB: null,
            count: []
        }
        this.getList = this.getList.bind(this);
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
    }

    getList = () => { // 获取所有抽卡历史，使用箭头函数也可以确保this调用没问题
        const customerOS = this.state.indexedDB.transaction(['heros'], 'readwrite').objectStore('heros');
        let dataArr = [];
        customerOS.openCursor().onsuccess = (event) => {
            const result = event.target.result;
            if (result) {
                dataArr.push(result.value);
                result.continue();
            }
            this.setState({
                historyStatus: true,
                historyList: dataArr
            })
        }
        this.getCount();
    }

    getRarity (rarity) { // 同样的英文转中文
        switch (rarity) {
            case 'legend':
                return '传奇';
            case 'epic':
                return '史诗';
            case 'elite':
                return '精英';
            default:
                return '普通'
        }
    }

    getCount = () => { // 此处统计抽卡结果，用的是indexedDB自动统计的，当然你也可以用for循环一个一个统计
        const typeArr = ['legend', 'epic', 'elite', 'ordinary'];
        let count = [];
        // 执行事务，从对象仓库（表）中获取所有数据
        const request = this.state.indexedDB.transaction(['heros'], 'readonly').objectStore('heros');
        for (let index = 0; index < typeArr.length; index++) {
            const typeCount = request.index('rarity').count(typeArr[index]);
            //数据获取成功
            typeCount.onsuccess = () => {
                if (typeCount.result) {
                    count.push(typeCount.result);
                    this.setState({
                        count: count
                    })
                }
            };
        }
    }

    sumCount () { // 获取总计的抽奖次数，这里我是遍历了getCount的结果数组，当然用indexedDB的count方法也可以直接获取
        let total = 0;
        this.state.count.forEach(value => {
            total += value;
        });
        return total;
    }

    render () {
        const historyTab = this.state.historyList.map((history, index) =>
            <tr className={`rarity_${history.rarity}`} key={index}>
                <td>{index + 1}</td>
                <td>{this.getRarity(history.rarity)}</td>
                <td>{history.name}</td>
            </tr>
        )
        return (
            <div className="history_area" style={{ display: this.state.historyStatus ? "flex" : "none" }}>
                <div className="history_list">
                    <table>
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>稀有度</th>
                            <th>武将</th>
                        </tr>
                        </thead>
                        <tbody>
                        {historyTab}
                        </tbody>
                    </table>
                </div>
                <div className="history_count">
                    <div className="rarity_legend">传奇：{this.state.count[0]}</div>
                    <div className="rarity_epic">史诗：{this.state.count[1]}</div>
                    <div className="rarity_elite">精英：{this.state.count[2]}</div>
                    <div className="rarity_ordinary">普通：{this.state.count[3]}</div>
                    <div className="rarity_total">总计：{this.sumCount()}</div>
                    <button onClick={() => {
                        this.setState({
                            historyStatus: false
                        })
                    }}>关闭记录</button>
                </div>
            </div>
        )
    }
}
