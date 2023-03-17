import React, { createRef } from 'react';
import * as _ from 'lodash';
import { create } from 'lodash';

/** Form
 * 受控组件：即为表单的数据源如value，使用component.state.child 控制表单的value 显示，属性值等，
 *  并只能使用setState 开更新
 *  下面的例子NameForm 就是一个受控组件，他的value 绑定了state.value.当setSate 被触发时，input的value属性
 *  会被更新，仅仅使用state并不能实现双向数据绑定，用户手动输入value并不能同步到state中，需要使用onChange 监听
 *  用户输入并更新state 
 * 
 * 表单校验：react 不像angualr 在form中封装了表单校验功能，甚至在mui里也没有给出validator接口，那么在实现过程中
 *  除了我们利用onChange等事件，手写validator方法，定义每一个form的validator，error，errormsage 数据结构外，
 *  也可以在后期使用hook 时，使用react-hook-form的api进行表达校验。
 * 
 *  
 * 非受控组件：即不使用this.state 绑定form表单的value，使用ref 来在js代码里获得form 元素的实例，ref 有点类似于angular的
 *  html:  #name
 *  ts: @ViewChild('name') nameRef; this.nameRef.focus()
 * 
 * 非受控组件的form 给定默认值时可以使用defaultValue，95行，defaultValue在挂载以后如果被更新了，不会造成dom上真正value的更新
 *   可以避免不必要的渲染。checkbox，radio 支持 defaultChecked;input select，textarea 支持defaultValue
 * 
 * Refs的使用：
 *  --适用refs的情况
 *   a.管理元素焦点，文本选择或者媒体播放
 *   b.触发强制动画
 *   c.集成第三方dom库
 *   d.非受控组件的form表单
 * 
    * 创建Refs
    *  this.myRef = React.createRef();
 * 
    * 访问Ref
    * const node =  this.myRef.current;
    *   -- 当ref 属性用于HTML元素时，ref.current 就是dom元素本身 ，96行
    *      可以通过this.ref.current.value获取元素值 ，100行
    *   -- 当ref 用于定义class 组件时，ref.current 就是该class 的实例 ，101 行
    *   -- 函数没有实例，不能使用ref
    * 
    * Ref的赋值与更新
    *   --组件挂载时会给ref.current传值
    *   -- 在组件卸载时赋值为null
    *   -- 在componentDidMount 和componentDidUpdate 生命周期前触发更新
    * 
    * 如何将ref 暴露给父组件
    *   -- react class写法不建议将ref传递给父组件，但hook 可以使用ref转发实现
    * 
    * 回调ref
    *   --回调ref 即，创建的方式不是在js中先createRef再绑定到dom中，而是在jsx中直接配置一个自定义函数，函数体将这个元素实例复制给ref变量
    *     也就是说，接收一个element或class标签，再创建ref变量,114 ,119行
    * 
    * 
* 
* 
 */



class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', isGoing: false, number: '0' }
        this.handelChange = this.handelChange.bind(this);
    }
    render() {
        return <form onSubmit={this.handleSubmit.bind(this)}>
            <label> Name:
                <input type='text' value={this.state.value} name="value" onChange={this.handelChange} />
            </label>
            <label> Attend:
                <input type='checkbox' checked={this.state.isGoing} name="isGoing" onChange={this.handelChange} />
            </label>
            <label> People Counting:
                <input type='text' value={this.state.number} name="number" onChange={this.handelChange} />
            </label>

            <input type='submit' value='Submit' />

        </form>
    }
    handelChange(event) {
        console.log('e', event)
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.setState({ [name]: value }, // 这个是 es6计算属性名称语法
            () => { console.log('e', event, 'name', name, 'state', this.state) });
        //console.log('e', event, 'name', name, 'state', this.state) } 这里打出的state会比实际输入慢一步，原因如下
        // setState({stateUpdateObj},callback):setState 是一个异步作用方法，也就是说state的更新不会在方法调用后立刻结束，如form.js的40行
        // 如果想要获得state完全更新后的数据，需要使用setState的第二个参数callback，在这个回调方法里获取state。

    }
    handleSubmit(event) {
        alert('Name submitted:' + this.state.value);
        event.preventDefault() // 不加这句，submit后 input value会被清空
    }
}


class UncontrolledForm extends React.Component {
    constructor(props) {
        super(props);
        this.phone = React.createRef();
        this.mail = null
    }
    render() {
        return (
            <div>
                <label>
                    Phone:
                    <input type="text" ref={this.phone} defaultValue='18211112222' onChange={(e) => this.handleChange(e)} />
                </label>
                <label>
                    Mail:
                    <input type="text" ref={this.setMailRef} defaultValue='YYY@QQ.COM' onChange={(e) => this.handleMailChange(e)} />
                </label>
            </div>
        )
    }
    setMailRef = ele => {
        this.mail = ele;
    }
    handleMailChange = (e) => {
       console.log('this.mail',this.mail,this.mail.value);
       this.mail.focus();
    }
    componentDidMount() {
        console.log('phone', this.phone.current, this.phone.current.value)
    }
    handleChange(e) {
        console.log('phone2', 'e', 'value', this.phone.current, e, this.phone.current.value)
    }
}


class ParentForm extends React.Component {
    constructor(props) {
        super(props);
        this.nameFormIns = createRef();
    }
    render() {
        return (
            <div>
                <div>
                    <NameForm ref={this.nameFormIns} />
                </div>
                <div>
                    <UncontrolledForm />
                </div>
            </div>

        )
    }
    componentDidMount() {
        console.log('nameFormIns', this.nameFormIns.current)
    }
}

export default ParentForm;