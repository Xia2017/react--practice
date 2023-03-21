/**mouse render
 * 给组件提供了一个render方法，方法返回一个reactEle，然书为该组件的某些变变量（一般是state）。
 * 这个方法的作用是，告知该组件什么时候，渲染这个reactEle，比如，当state 变化的时候根据新的state值渲染reactEle
 * 
 * 例：需要两个组件
 *   -- Mouse 追踪鼠标的位置
 *   -- Cat 根据鼠标的位置动态渲染图片，猫抓鼠标
 * 
 */

import React from 'react';
import "./app.scss"

class Mouse extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x: 1, y: 0 }
    }
    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }
    render() {
        return (
            <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
                {this.props.render(this.state)} {/** 动态render props.render 属性配置的reactEle，并将自己的state作为参数传给reactEle使用 */}
            </div>
        )
    }
}
class Cat extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const mouse = this.props.mouse;
        console.log('mouse',mouse)
        return (
            <div className='moni-cat' style={{ left: mouse.x, top: mouse.y}}></div> 
        )
    }
}

class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div>
                <span>追踪鼠标的位置</span>
                <Mouse render={(mousePosition)=>(<Cat mouse={mousePosition}></Cat>)}/>
            </div>
        )
    }
}

export default MouseTracker;