import React, { Component } from 'react'
import AtricleItem from "../component/atricleItem"
import MessageComponent from "../component/message"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"

import "./news.css"
import axios from "axios";
import {Link} from "react-router-dom";
import cookie from "react-cookies";
import NoButtonItem from "../component/noButtonItem";
import Message from "../component/message";

class News extends Component {
    // 加载一次，初始化状态
    constructor(props, context) {
        super(props);
        this.state = { items: [] };
    }

    // 加载一次，Dom 未加载
    componentWillMount() {
        this._net()
    }

    // 加载一次，这里 Dom 已经加载完成
    componentDidMount() {

    }

    _click1=()=>{
        this.props.history.push("./")
    }

    _click2=()=>{
        this.props.history.push("./news")
    }

    _net() {
        this.setState({ progressShow: true });
        const url = "http://localhost:8085/v1/qa_service/qa/questions/public/qita";
        let _this = this;
        let data = [];
        axios.get(url).then(function (response) {
            data = response.data;
            console.log(response.data)
            // for(let i = 0; i <response.data.length; i++) {
            //     data[i].askerId = cookie.load("userId");
            // }

            _this.setState({
                items:response.data,
                progressShow: false
            })

        }).catch(function (e) {
            alert(e);
        });



    }
    // 渲染 Dom
    render() {
        const atricleItems = this.state.items.map((item, index) =>
            <NoButtonItem key={item.id} history={this.props.history} item={item} MessageChildren={Message} />
        )
        return (
            <div>
                <Header history={this.props.history} />
                <div className="g-container news">
                    <Progress show={this.state.progressShow} />
                    <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
                    <div className="left">
                        <button id="11" onClick={this._click1} className="btn-1">为您推荐</button>
                        <button id="22" onClick={this._click2} className="btn-2">等待回答</button>
                        {atricleItems}
                    </div>
                    <div className="right">
                        <div className="card">
                            本站主要愿景：<br />
                            建立高等教育信息分享平台，统一中国高校的经验分享市场，解决中国青年的升学和迷茫问题<br />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    _snackBarOpen(content, time = 2000) {
        this.setState({ snackBarOpen: true, content: content });
        setTimeout(() => {
            this.setState({ snackBarOpen: false })
        }, time)
    }
    // 父组建更新 Props 调用
    componentWillReceiveProps(nextProps) {
        this._net(nextProps.match.params.page)
    }
    // 更新 Props 或 State 则调用
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    //在 Dom 更新之前调用
    componentWillUpdate(nextProps, nextState) {

    }
    // 更新 Dom 结束后调用
    componentDidUpdate() {

    }
    // 拆卸调用
    componentWillUnmount() {

    }
}

export default News