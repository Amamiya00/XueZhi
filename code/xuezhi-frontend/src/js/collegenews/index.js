import React, { Component } from 'react'
import AtricleItem from "../component/atricleItem"
import Message from "../component/message"
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Header from "../component/header"
import cookie from "react-cookies";
import "./collegenews.css"
import axios from "axios";
import {Link} from "react-router-dom";
import NoButtonItem from "../component/noButtonItem";

class CollegeNews extends Component {
    // 加载一次，初始化状态
    constructor(props) {
        super(props)
        this.state = { items: [] ,school:''}
    }

    // 加载一次，Dom 未加载
    componentWillMount() {
        let _this = this;
        const url = "http://localhost:8085/v1/user_service/users/" + cookie.load("userId");
        axios.get(url).then(
            function (response) {
                _this.setState(
                    {
                        school:response.data.university
                    }
                )
                let school = _this.state.school;
                if(school === "public"){
                    alert("宁尚未通过审核！")
                    _this.props.history.push("/");
                    return;
                }
                else{
                    _this._net(_this.props.match.params.page)
                }
            }
        ).catch(
            function (e) {
                alert(e)
            }
        )
    }

    // 加载一次，这里 Dom 已经加载完成
    componentDidMount() {

    }

    _click1=()=>{
        this.props.history.push("./college")
    }

    _click2=()=>{
        this.props.history.push("./collegenews")
    }

    _net(page) {
        let _this=this;
        this.setState({ progressShow: true })


        var school = this.state.school;
        const url = "http://localhost:8085/v1/qa_service/qa/questions/"+school+"/all";


        let data;
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
                <div className="g-container collegenews">
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
                            <h1>{this.state.school} &nbsp;University</h1>
                        </div>
                        <div className="areacard">
                            问题分区：<br />
                            <div className="areacarditems">
                                <div className="areacarditem">
                                    <Link to="/college/xuexi" style={{textDecoration:'none',color:'#8590a6'}}>
                                        <img  width='95px' height='95px' src="https://s3.ax1x.com/2021/03/14/60Uxm9.png"></img><br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;学习专区
                                    </Link>

                                </div>
                                <div className="areacarditem" >
                                    <Link to="/college/shetuan" style={{textDecoration:'none',color:'#8590a6'}}>
                                        <img  width='95px' height='95px' src="https://s3.ax1x.com/2021/03/14/60amTI.png"></img><br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;社团专区
                                    </Link>

                                </div>
                            </div>
                            <div className="areacarditems" style={{marginLeft:'40px'}}>
                                <div className="areacarditem">
                                    <Link to="/college/shenghuo" style={{textDecoration:'none',color:'#8590a6'}}>
                                        <img  width='95px' height='95px' src="https://s3.ax1x.com/2021/03/14/60a7Bd.png"></img><br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;生活专区
                                    </Link>

                                </div>
                                <div className="areacarditem">
                                    <Link to="/college/qita" style={{textDecoration:'none',color:'#8590a6'}}>
                                        <img  width='95px' height='95px' src="https://s3.ax1x.com/2021/03/14/60a36g.png"></img><br/>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其他
                                    </Link>

                                </div>
                            </div>
                            <br />

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

export default CollegeNews