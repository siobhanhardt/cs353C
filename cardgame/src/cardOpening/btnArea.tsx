import React from 'react';

import History from '../cardOpening/Histroy';

export default class BtnArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            times: 0
        }

        this.calculationTimes = this.calculationTimes.bind(this) // 方法绑定this的一种解决方案
    }

    onRef = (ref) => {
        this.history = ref
    }

    calculationTimes (subtractor) { // 抽奖次数的变化
        if (this.state.times < subtractor) {
            alert('抽奖系数不足');
            return false;
        } else {
            this.setState({
                times: this.state.times - subtractor
            })
        }
        return true;
    }

    render () { // 页面渲染，子组件History
        return (
            <div className="index_page">
            <History onRef={this.onRef} />
        <div className="btn_area">
        <div className="increase_times">
            <span>{this.state.times}</span>
            <img onClick={() => {
            this.setState({
                times: this.state.times + 10
            })
        }} src={require('./../../images/add.png')} alt="" />
            </div>
            <button className="single_btn" style={{ backgroundImage: `url(${require('./../../images/single.png')})` }} onClick={() => {
            if (this.calculationTimes(1)) {
                this.props.getHero();
            }
        }}>单抽</button>
        <button className="ten_btn" style={{ backgroundImage: `url(${require('./../../images/ten.png')})` }} onClick={() => {
            if (this.calculationTimes(10)) {
                this.props.getHeros();
            }
        }}>十连抽</button>
        <div className="history_btn" onClick={() => {
            this.history.getList();
        }}>抽卡记录</div>
        </div>
        </div>
    )
    }
}
