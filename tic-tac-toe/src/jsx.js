/**
 * jsx 拥有js 的全部功能，可以生成react元素，将jsx 渲染为dom元素
 * 所有内容在渲染之前都被转换成了字符串，可以有效防止跨站脚本攻击
 * 书写的所有jsx 语法标签都会被babel转译成
 * const element = React.createElement('标签内容')，createElement会最终创建为固定数据结构的对象
 *  const element = {
 *  type:'div',
 *  props:{
 *          className:'greeting',
 *          childrem:'hello,world'
 *      }
 *  }
 * 这些对象被称为React元素，React通过读取这些对象，使用他们来构建dom以及保持随时更新。
*/

import React from 'react';
import ReactDOM from 'react-dom/client';

// 表达式

function firstUpper(str) {
    if (!str || (typeof str === 'string' && !str.length)) { return; }
    const firstChar = str.charAt(0);
    const otherStr = str.slice(1)
    return firstChar.toUpperCase() + otherStr;
}

function getGreeeting(user) {
    let returnVal =
        (<div>
            <div>hello,Stranger</div>{/** { }内可以放置任何有效的js 表达式*/}
        </div>)
    if (user) {
        returnVal =
            (<div>
                <div>hello,{user}</div>   {/**jsx 本身也是个表达式，他可以当作一个变量值，赋值给变量使用 */}
                <div>I am {firstUpper(user)}</div>
            </div>)

    }
    return returnVal;
}

/**将一个元素渲染为dom*/

/**根节点 <div id="root"></div>
 * React 构建的应用通常指偶单一的根DOM节点，该节点没的所有内容都由react dom 管理
 * 如何将一个react 元素渲染到根dom 节点中（见index.js的135，136 行）
 * const root = ReactDOM.createRoot(
 *  document.getElementById('root')
 * );
 * const element = <h1>Hello, world</h1>;
 * root.render(element);
 * 
*/

/**更新已渲染的元素
 * React元素是一个不可变对象，一旦创建，就无法更改它的子元素或者属性，
 * 更新ui的唯一方式是创建一个新的元素，并将其传入root.render()
 * 但实际应用中，一般只会调用一次root.render()，
 * react 通过“有状态组件”动态更新需要更新的部分，也就是将元素和他们的子元素
 *  与之前的状态比较，只更新有变化的dom
 */

function TestJSX(props) {
    const link = 'https://zh-hans.reactjs.org/docs/introducing-jsx.html';
    return (
        <div>
            {getGreeeting(props.name)}
            <a href='https://zh-hans.reactjs.org/docs/introducing-jsx.html'> React DOC</a> {/**可以使用“”来为jsx元素指定属性值 */}
            <a href={link}>This is  React DOC,too</a> {/**可以使用{}为元素指定变量作为属性值*/}
        </div>
    )
}

export default TestJSX

