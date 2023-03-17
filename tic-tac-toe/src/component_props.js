/**react 有两种方式定义组件
 * 函数组件
 *  如9-15行，这段代码定义了一个函数组件，本质上就是一个js函数。
 *  但他首字母大写，并且接收唯一带有数据的“props”对象，并返回一个React元素。
 * 
 * class 组件
 *  使用ES6的class 来定义组件,如18-26行，这两种定义方式是等效的
 * 
 * 自定义组件的标签可以按照普通dom元素标签的调用方式使用，区别是（index.js 128-129 行）
 *  标签首字母必须大写，否则会被认为是普通dom标签
 *  标签调用时传入的参数，在组件内通过this.prop.属性名获取并使用（class 组件）
 *  标签调用时传入的参数，在组件内通过prop.属性名获取并使用（函数组件） 
 * 
 * 自定义组件间可以相互调用，这就意味着我们可以按照科学的粒度抽取封装组件进行复用，例如game，square，board
 * 
 * props不可更改
 */

/**State & 生命周期
 * 组件初始化状态下执行顺序：构造函数，static getDerivedStateFromProps()，render，componentDidMount，componentWillUnmount
 * 组件更新时生命周期执行顺序：static getDerivedStateFromProps()，shouldComponentUpdate()，render()，getSnapshotBeforeUpdate()，componentDidUpdate()
 * componentDidUpdate(prevProps, prevState, snapshot)：在这里进行prevProp 和this.prop的比较，决定是否要进行某些操作
 * 
 * shouldComponentUpdate(nextProps, nextState)，当 props 或 state 发生变化时，shouldComponentUpdate() 会在渲染执行之前被调用。返回值默认为 true。当手动返回false时不会进行渲染
 *  但不建议使用这种方式，可以使用PurecComponent，PureComponent 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。
 * 
 * static getDerivedStateFromProps(props, state)，它返回一个对象，来更新state，如果返回null 则不更新任何内容
 * 
 * 
 * state：
 *  --state的变化会triger render方法的执行，更新相应dom，以及子组件
 *  --state 不可以直接更改，比如 this.state.date = mpment(),这样不会渲染组件，需要使用setState。
 *    构造函数是唯一可以给this.state赋值的地方，也就是state的初始化
 *  --state 和props 都是一步更新，不可以依赖他们更新下一个状态，
 *    比如 this.setState({counter:this.state.counter+this.props.increment})这种写法是错误的，需要返回函数
 *    this.setState((state,prop)=>{counter:stare.counter+props.increment})
 *  --State的更新会被合并，比如先后执行this.setState({ posts: response.posts}); this.setState({comments: response.comments});后
 *     state的值为{posts: response.posts,comments: response.comments}
 *  --数据是向下流动的
 *  -- setState({stateUpdateObj},callback):setState 是一个异步作用方法，也就是说state的更新不会在方法调用后立刻结束，如form.js的40行
 *      如果想要获得state完全更新后的数据，需要使用setState的第二个参数callback，在这个回调方法里获取state。
 */

/** react 中的事件处理
 * react通常在class 中声明函数处理的方法，在jsx添加事件监听绑定该方法
 * jsx 绑定事件监听函数处理this 的三种方案
 *  -- bind this,jsx中使用onClick={this.handleClick} 绑定click的eventListener，当click事件被监听到时，调用handleClick方法
 *     这里没有用nClick={this.handleClick()}，也就是说这里执行handleClick的时候，作用域是event的作用域，不是Clock class，方法体zhong
 *     调用this.state 就会报错，this 是undifined，需要在jsx或构造函数里bind（this）：this.handleClick = this.handleClick.bind(this) 77行
 *  --public class field语法：也就是在方法定义里使用箭头函数,箭头函数执不会改变作用域，this就是上下文里的this Clock 对象
 *  -- 在jsx里事件监听绑定时，使用箭头函数：onClick={(e)=>this.handleClick()}
 *      a.这种方法在每次渲染对应的dom 时，都会创建不同的回调函数，如果该回调函数作为prop传入子组件时，可能会进行额外的重新渲染，一般使用class fields 语法定义回调函数
 *  --事件绑定传参
 *      a.jsx 使用箭头函数onClick={(e)=>this.handleClick(‘jsx使用箭头函数’)}
 */

// function TestComponent(props) {
//     return (
//         <div>
//             <div> This is Component part,{props.desc}</div>
//         </div>
//     )
// }
import React from 'react';
import * as moment from 'moment';
import * as _ from 'lodash';
class TestComponent extends React.Component {
    render() {
        console.log('props', this.props)
        return (
            <div>
                <div> This is Component part,{this.props.desc}</div>
            </div>
        )
    }
}

export class Clock extends React.Component {
    constructor(props) {
        super(props)
        /**
         * super 代指父类的构造函数，如果想在构造函数之前使用this 就必须先调用super，指向父类构造函数
         * super里传入（props）的原因是，在构造函数中，可以将父组件传入的props实例话成子组件的this.prop
         * 也就类似于 const subComponent = new Component(prop); subComponent.props = prop;
         * 也就是说在构造函数里，使用this.prop 不会是undeifined，当组件被实例化后prop就被super(props)赋值了 
         * 但在构造函数执行后，也会进行this.props的实例化 也就是说只传super(),在render或其他方法里调用this.props也是有值的
         */
        this.state = {
            date: moment().format('YYYY-MM-DD HH:mm:ss'),
            isToggleOn: true
        };
        console.log('constructor')
        // this.handleClick = this.handleClick.bind(this)// 配合onClick={this.handleClick} 使用，90行
    }
    render() {
        console.log('render')
        let status;
        if (!this.state.isToggleOn) {
            status = <span>stoped</span>
        }
        return (
            <div>
                <span>This is a clock</span>
                <div>Date:{this.state.date}</div>
                {status}
                {/**事件监听处理this方案1，在构造函数中使用bind(this) */}
                {/* <button onClick={this.handleClick}>{this.state.isToggleOn ? 'stop refresh' : 'start refresh'} </button>  */}
                {/* <button onClick={this.handleClick.bind(this,'jsx里 bind this')}>{this.state.isToggleOn ? 'stop refresh' : 'start refresh'} </button>  */}
                {/**事件监听处理this的方案3，在jsx 里使用回调函数 */}
                <button onClick={(e)=>this.handleClick(e,'jsx 里使用箭头函数')}>{this.state.isToggleOn ? 'stop refresh' : 'start refresh'} </button>
            </div>
        )
    }
    // 配合bind this 使用，jsx 绑定事件监听函数处理this 的方案1
    // 配合jsx 使用箭头函数 使用，jsx 绑定事件监听函数处理this 的方案3
    // handleClick(type) { 
    //     console.log('type',type)
    //     this.state.isToggleOn?clearInterval(this.timerID):this.startInterval()
    //     this.setState(
    //         { isToggleOn: !this.state.isToggleOn }
    //     )
    // }

    handleClick = (e,type) => { // 绑定事件监听函数处理this 的方案2,public class fields 语法
        console.log('type',e,type)
        this.state.isToggleOn ? clearInterval(this.timerID) : this.startInterval()
        this.setState(
            { isToggleOn: !this.state.isToggleOn }
        )
    }
    componentDidMount() {
        /**componentDidMount 是react的生命周期函数
         * 当当前组件第一次被渲染到dom中会执行这个函数，即“挂载”（mount）
         * 类似于ngafterViewInit
         */
        console.log('componentDidMount', this, _.cloneDeep(this)) // this 里有timer，_.cloneDeep(this)里没有timerID
        this.startInterval();
    }

    componentWillUnmount() {
        /**componentWillUnmount 是react 的生命周期函数
         * 当当前组件被删除的时候，出发，被称为“卸载”（unmout）
         */
        console.log('componentWillUnmount', this, this.timerID)
        clearInterval(this.timerID)
    }
    tick() {
        this.setState({ date: moment().format('YYYY-MM-DD HH:mm:ss') })
    }
    startInterval() {
        this.timerID = setInterval(() => {
            this.tick()
        }, 2000)
    }
}




export default TestComponent;//module.exports = Clock ==> import * as Clock form './component_prop.js'
//= module.exports.Clock = Clock