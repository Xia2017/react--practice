/**
 * 组合和继承
 * react 推荐使用组合的方式来代替继承实现组件间的代码复用
 * 组合：如dialog 等组件的封装时，无法提前预知他们子组件的具体内容，需要父组件接收一个props.child
 *  并插入到自己的jsx标签内展示，就类似于angular 的componentFactory，动态加载子组件一样
 *
 * 如FancyBorder 方法和 Welcom 方法，<FancyBorder></FancyBorder>内包裹的dom元素会作为prop.children传给子组件
 *   --props.children 是固定写法
 *   --也可以通过props 自定义参数接收元素，比如SplitPane 自定义了props.top 和props.bottom 两个接口，接受react组件或者element。
 *     接收来的元素用{}引用在自己jsx的任意位置
 * 
 * 在实际使用过程中，比如dialog的封装，可以将dialog 的外框封装为一个组件，内部留props.header 和props.content 接收每个页面的自定义组件进行动态显示
 */

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    )
}

function SplitPane(props) {
    return (
        <div className="pane">
            <div className="top">
                {props.top}
            </div>
            <div className="bottom">
                {props.bottom}
            </div>
        </div>
    )
}

function Top(props) {
    return (<div> this is top </div>)
}

function Bottom(props) {
    return (<div> this is Bottom </div>)
}

function Welcom(props) {
    return (
        <div>
            <FancyBorder color="blue">
                <div>
                    this is parent content
                </div>
            </FancyBorder>
            <SplitPane top={<Top/>} bottom={<Bottom/>}></SplitPane>
            
        </div>

    )
}

export default Welcom;