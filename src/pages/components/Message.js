import React, { Component } from 'react'
import {Input, Checkbox, Button, Form ,Divider} from 'antd'
import { connect } from 'dva';
import {getDateString, scollToTop, getUrlExceptMessage} from '../../common/Tools.js'
import request from '../../common/request.js'
import emojione from 'emojione'
import styles from './Message.css'
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 8 }
    },
};
const formItemLayout2 = {
    labelCol: {
        xs: { span: 24 },
    },
    wrapperCol: {
        xs: { span: 24 },
    },
};
let articleURL;
class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            messageRenderId: -1,
            sendLoadding:false
        }
        this.scrollToMessage = this.scrollToMessage.bind(this);
        this.getMessageDom = this.getMessageDom.bind(this);
        this.getSendMessageForm = this.getSendMessageForm.bind(this);
        this.cancelRepeat = this.cancelRepeat.bind(this);
        this.sendMessageRequest = this.sendMessageRequest.bind(this);
    }
    scrollToMessage(target){
        const element = document.getElementById(target);
        if(element){
            scollToTop(element);
        }
    }
    componentDidMount(){
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(userInfo){
            const {setFieldsValue} = this.props.form;
            const {name, email, home} = userInfo;
            setFieldsValue({
                name,
                email,
                home
            })
        }
        articleURL = getUrlExceptMessage();
    }
    getMessageDom(messages, level = 0){
        const {messageRenderId} = this.state;
        return messages.map((message) =>{
            return(
            <React.Fragment key={message.id}>
                <div id={'message'+message.id} className={styles.message_wrap} style={{paddingLeft: level * 15}}>
                    <div className={styles.message_top}>
                        <img className={styles.message_corver} src={message.imgUrl} alt={message.name}/>
                        <div className={styles.message_info}>
                            <div className={styles.message_name}>
                                <span>{message.name}</span>
                                <span className={styles.message_time}><a onClick={(e) => this.repeatMessage(message.id, message.name)}>回复</a> {getDateString(message.createTime)}</span>
                            </div>
                            <div className={styles.message_content} dangerouslySetInnerHTML={{__html:emojione.toImage(message.content)}}>
                            </div>
                        </div>
                    </div>
                    <Divider className={styles.message_divider} />
                </div>
                {messageRenderId === message.id ? this.getSendMessageForm(true) : ''}
                {message.son && message.son.length > 0 ? this.getMessageDom(message.son, level + 1) : ''}
            </React.Fragment>)
        })
    }
    getSendMessageForm(isRepeat){
        const { getFieldDecorator } = this.props.form;
        return (
        <div className={styles.message_box}>
            <span 
                className={styles.message_cancel} 
                style={{display: isRepeat ? '' :'none'}}
                onClick={this.cancelRepeat}
            >点击取消回复</span>
            <Form 
                onSubmit={this.sendMessages}
                hideRequiredMark={true}
            >
                <FormItem
                    label="你的大名"
                    {...formItemLayout}
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '别忘了你的大名!', whitespace: true
                        }],
                    })(
                        <Input placeholder="显示的用户名"/>
                    )}
                </FormItem>
                <FormItem
                    label="你的邮箱（已绑定gravatar头像）"
                    {...formItemLayout}
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '邮箱格式有误!',
                        },{
                            required: true, message: '别忘了你的邮箱!'
                        }],
                    })(
                        <Input placeholder="被回复会发送至该邮箱"/>
                    )}
                </FormItem>
                <FormItem
                    label="你的主页（选填）"
                    {...formItemLayout}
                >
                    {getFieldDecorator('home', {
                        rules: [{
                            type:'url', message: '请完整填写http/https'
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    label="你的留言（支持大部分emoji）"
                    {...formItemLayout2}
                >
                    {getFieldDecorator('content', {
                        rules: [{
                            required: true, message: '别忘了你的留言!', whitespace: true
                        }],
                    })(
                        <Input.TextArea rows={4} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: localStorage.getItem('remeber') !== null ? false : true,
                    })(
                        <Checkbox>记住信息</Checkbox>
                    )}
                    <br />
                    <Button type="primary" htmlType="submit" loading={this.state.sendLoadding}>
                        提交留言
                    </Button>
                </FormItem>
            </Form>
        </div>)
    }
    sendMessages = (e) =>{
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.sendMessageRequest(values)
            }
        });
    }
    async sendMessageRequest(data){
        const { dispatch } = this.props;
        const {messageRenderId} = this.state;
        this.setState({
            sendLoadding:true
        })
        const response = await request({
            method: 'POST',
            url: '/message',
            data:{
                message:{
                    ...data,
                    articleid:this.props.articleId,
                    reply:messageRenderId != -1 ? messageRenderId : null
                }
            }
        });
        this.setState({
            sendLoadding:false
        })
        if(response['data'] && !response['data']['msg']){
            this.setState({
                messageRenderId:-1
            })
            const message = response['data'];
            console.log(message);
            
            if(data.remember){
                //记住信息
                localStorage.setItem('userInfo',JSON.stringify({
                    name:message['name'],
                    home:message['home'],
                    email:message['email']
                }))
                localStorage.removeItem('remeber')
                const {setFieldsValue} = this.props.form;
                setFieldsValue({
                    content:''
                })
            }else{
                setTimeout(this.props.form.resetFields,300);
                localStorage.removeItem('userInfo')
                localStorage.setItem('remeber','false')
            }
            //添加dom
            dispatch({
                type: 'global/setMessage',
                payload:{
                    message
                }
            });
        }
    }
    repeatMessage = (messageRenderId, username) =>{
        const {setFieldsValue} = this.props.form;
        setFieldsValue({
            content:`<a href="#message${messageRenderId}">@${username}</a>`
        })
        this.setState({
            messageRenderId
        })
    }
    cancelRepeat(){
        const {setFieldsValue} = this.props.form;
        setFieldsValue({
            content:''
        })
        this.setState({
            messageRenderId:-1
        })
    }
    render() { 
        const messages = this.props.messages;
        const message = messages && messages.length > 0 ? this.getMessageDom(messages) : <div>还未被人捷足先登</div>;
        const {messageRenderId} = this.state;
        return (  
            <React.Fragment>
                {message}
                {messageRenderId === -1 ? this.getSendMessageForm() : ''}
            </React.Fragment>
        );
    }
}
 
function mapStateToProps(state) {
    const {setting} = state.global;
	return {
        emojiSwitch:setting.emojiSwitch
	};
}

export default connect(mapStateToProps)(Form.create()(Message));