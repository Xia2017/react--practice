/**
 * 条件渲染
 * 
 * 在class 定义component 的写法中在render 里可以定义变量，配合if 条件句决定渲染哪个元素
 * 在用{}引用变量
 * 或者使用三目运算符
 * 如果想阻止组件渲染，可以让render return null
 */
/** 生命周期相关
 * 36行到42行有个很特殊的方法，是react的生命周期，他在render 之前执行，返回值为新的state。
 * 参数 prop 是当前prop，state是当前state。这个函数很少用到，唯有当前state 中有属性完全依赖prop
 *    需要根据prop的变化更新时才会用到。这个例子中，TestConditionalRendering 从父组件获得props.user
 *    并赋值给state.user ,再传给子组件GuestGreeting，但state.user 并不会跟着prop的更新自动变化
 *    所以需要“监听prop的变化”并且 “更新state”
 * 
 */

/**
 * 列表&key
 * 列表即根据数据（list）动态生成元素，类似于ngFor，react的实现方式是，在数据的map（或循环）内，写入jsx语法
 *   将jsx 标签的list 作为render方法某元素的子元素，进行动态render。
 * key： 
 *  --帮助react 识别那些元素改变了，比如被添加或者删除，所以应该给list中的每一个元素赋予一个独一无二的key（在兄弟节点中唯一，全局不用唯一）
 *  -- key 是react 框架识别元素用，不会暴露给component，也就是子组件无法获取key
 * 
 */

import React from 'react';
import * as _ from 'lodash';

class TestConditionalRendering extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }
    render() {
        console.log('in', this.props, this.state.user)
        let greet = <GuestGreeting />
        if (this.state.user) {
            greet = <UserGreeting user={this.state.user} />
        }
        return (
            <div style={{ marginTop: 30 + 'px' }}>
                <span>This is a parent component for conditional-render</span>
                <div>这是使用变量渲染： {greet}</div>
                <div>这是使用三目运算符渲染：{this.state.user ? <UserGreeting user={this.state.user} /> : <GuestGreeting />} </div>
                <div>
                    <span> 根据数据render多个元素，类似于ngFor</span>
                    <ListItem items={this.setItemData()} />
                </div>
            </div>

        )
    }
    setItemData() {
        return [{ id: 1, name: 'react' }, { id: 2, name: 'vue' }, { id: 3, name: 'angular' }]
    }
    static getDerivedStateFromProps(props, state) {
        console.log(props, state)
        if (props.user !== state.user) {
            return { user: props.user }
        }
        return null
    }
}

class GuestGreeting extends React.Component {
    constructor(pros) {
        super(pros)
    }
    render() {
        return (
            <div> Please click login to login</div>
        )
    }
}

class UserGreeting extends React.Component {
    constructor(pros) {
        super(pros)
        this.state = { user: this.props.user }
    }
    render() {
        console.log('this.props.user', this.props.user)
        return (
            <div>Welcom,{this.state.user}!</div>
        )
    }
}
class ListItem extends React.Component {
    constructor(pros) {
        super(pros)
    }


    render() {
        return (
            <ul>
                {this.getElements()}
            </ul>
        )
    }

    getElements() {
        return this.props.items.map((obj) => {
            return (
                <li key={obj.id}  id={'li' + '_' + _.get(obj.id)}> {obj.name}</li>
            )
        })
    }

}


export default TestConditionalRendering