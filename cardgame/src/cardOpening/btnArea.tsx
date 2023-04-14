import React from 'react';

import History from '../cardOpening/History';

interface BtnAreaProps {
    getHero: () => void;
    getHeros: () => void;
}

export default class BtnArea extends React.Component<BtnAreaProps> {
    private historyRef = React.createRef<History>();

    state = {
        times: 0
    }

    constructor(props: BtnAreaProps) {
        super(props);
        this.calculationTimes = this.calculationTimes.bind(this);
    }

    calculationTimes(subtractor: number) {
        if (this.state.times < subtractor) {
            alert('Insufficient lottery coefficient');
            return false;
        } else {
            this.setState({
                times: this.state.times - subtractor
            })
        }
        return true;
    }

    handleGetList = () => {
        this.historyRef.current?.getList();
    }

    render() {
        return (
            <div className="index_page">
                <History ref={this.historyRef} />
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
                    }}>Single Draw</button>
                    <button className="ten_btn" style={{ backgroundImage: `url(${require('./../../images/ten.png')})` }} onClick={() => {
                        if (this.calculationTimes(10)) {
                            this.props.getHeros();
                        }
                    }}>Ten draws</button>
                    <div className="history_btn" onClick={this.handleGetList}>Card Record</div>
                </div>
            </div>
        )
    }
}
