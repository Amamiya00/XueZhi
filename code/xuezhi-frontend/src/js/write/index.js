import React, { Component } from 'react'
import { Button, Switch,FormControlLabel,TextField} from 'material-ui'
import Progress from "../component/progress"
import SnackBar from "../component/snackbar"
import Editor from "../component/editor";
import axios from "axios";
import cookie from "react-cookies";

import "./write.css"
import {NavLink} from "react-router-dom";
import Header from "../component/header";


class Write extends Component {
  // 加载一次，初始化状态
  constructor(props) {
    super(props)
    this.state = { title: '', atricleTagIndex: 0 ,option:false}

    this._blurTitle = this._blurTitle.bind(this)
    this._changeSwitch = this._changeSwitch.bind(this)
    this._clickSubmit = this._clickSubmit.bind(this)
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
          if(response.data.university=="public"){
            let s=document.getElementById("switcher");
            s.style.display='none';
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

  _snackBarOpen(content, time = 2000) {
    this.setState({ snackBarOpen: true, content: content })
    setTimeout(() => {
      this.setState({ snackBarOpen: false })
    }, time)
  }


  _blurTitle(e){
    this.setState({title:e.target.value});

  }

  _changeSwitch(e){
    if(this.state.school=="public"){
      alert("您尚未通过审核！")
    }else{
      let s=document.getElementById("selector");
      if(s.style.display=='none'){
        s.style.display='block';
        const opts = s.getElementsByTagName("option");
        opts[0].selected=true;
        this.setState({area:"qita"})
      }else{
        s.style.display='none';
      }
      this.setState({option:e.target.checked});
    }
  }

  _snackBarOpen(content, time = 2000) {
    this.setState({ snackBarOpen: true, content: content });
    setTimeout(() => {
      this.setState({ snackBarOpen: false })
    }, time)
  }

  _clickSubmit(e) {

    let _this = this;

    const { title} = this.state;
    if (title.length === 0) {
      this._snackBarOpen('没有标题～')
      return
    }

    const editor = this.refs.editor;
    if(editor.state.editor.txt.html().length<1){
      this._snackBarOpen("问题太短啦～");
      return;
    }
    const url = "http://localhost:8085/v1/qa_service/qa/questions"
    let data = new URLSearchParams();
    data.append('title',this.state.title);
    data.append('description',editor.state.editor.txt.html());
    data.append('askerId',cookie.load("userId"));
    let school = this.state.school;
    let area = this.state.area;
    if(!this.state.option){
      school = "public";
      area = "qita";
    }
    data.append('school',school);
    data.append('area',area);
    console.log(area);
    axios.post(url,data).then(function (response) {
      alert('发布成功')
      _this.props.history.push('/')
    }).catch(function (e) {
      alert(e);
    })
  }

  _getValue=(event)=>{
    this.setState({
      area:event.target.value
    })
  }

  // 渲染 Dom
  render() {

    return (
       <div>
         <Header history={this.props.history} />
         <br/><br/><br/>
         <div className="write">
          <Progress show={this.state.progressShow} />
          <SnackBar open={this.state.snackBarOpen} content={this.state.content} />
          <div className="head">
            <TextField id="standard-basic" defaultValue="" label="请输入标题.." onBlur={this._blurTitle}/>
          </div>
          <div className="content">
            <Editor ref="editor"/>
          </div>
          <div className="switchdiv">
            <FormControlLabel control={<Switch onChange={this._changeSwitch}/>} id="switcher" label="发布到校内" className="switch"/>
          </div>
          <div className="selectdiv" id="selector" style={{display:'none'}} onChange={(e)=>this._getValue(e)}>
            <select className="select">
              <option value="qita">无分区（其他分区）</option>
              <option value="xuexi">学习分区</option>
              <option value="shenghuo">生活分区</option>
              <option value="shetuan">社团分区</option>
            </select>
          </div>
          <div className="buttondiv">
            <Button className="button" onClick={this._clickSubmit}><NavLink to="/"> 发布 </NavLink></Button>
          </div>
         </div>
       </div>

    )
  }


  // 父组建更新 Props 调用
  componentWillReceiveProps(nextProps) {

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


export default Write
