/** useState
 * useState(init-value) 返回一个数组 [state变量,setState变量的方法
 * 一般使用解构数组的方式接收，如下
 * const [count, setCount] = useState(0)
 *      -- count:是state，类似于class 组件的this.state，这个值只能通过useState返回结果的第二个元素修改
 *      -- setCount:是一个方法，用来改变count的值
 * state 和setState 永远成对出现，当setState 被触发的时候，组件会重新render，并将最新的state用于显示
 * 与class 不同的是，hook 的写法可以按需求 创建多对state，每一个state 用自己的setState 方法更新,而不是全局只有一个this.state object，和并更新.
 */

/** useEffect
 * useEffect Hook 类似于Class 组件的 componentDidMount,componentDidUpdate和 componentWillUnmount这三个函数的组合
 * 在useEffect 里可以做：数据获取，设置订阅以及手动更改 React 组件中的 DOM
 * useEffecct 接收两个参数
 * 
 *  uesEffect(()=>{
 *      方法体
 *      return ()=>{ 这里是清除的方法体}   
 *  },[变量名])
 * 
 * 第一个参数： 如23-25行 react 会保存 useEffect 将接收的函数参数（()=>{document.title = `Title : cilcked ${count} times`}），并且在dom 更新后调用他。
 * useEffect 会在每次渲染后都执行，挂载和更新都会，每次重新渲染都会生成新的effect并替换掉之前的，这样可以保证拿到最新的state
 * 
 * 第二个参数：是一个由变量名组成的list[props.key,某个state]，作用是如果list 里有任意一个变量值发生变化的话，就调用effect，否则就跳过effect，实现性能优化
 *  如果我们需要当组件挂载后仅仅执行一次，也就是ngAfterViewInit 的生命周期，那可以把第二个参数传[],这样就只会执行一次
 *  
 *  当第二个参数被省略时则意味着每次render的时候都会执行effect
 *  
 * 
 * useEffect 是异步执行的，他不会阻塞浏览器更新屏幕，所以性能相比componentDidMount 这类生命周期更好，
 * 如果需要同步执行useEffect，比如说必须要读取dom元素应用于代码逻辑，但useEffect hook 又不会等待dom全部render 结束再运行，
 * 这种情况下可以使用useLayoutEffect替代useEffect
 * 
 * 需要清除的effect:比如 在effect 中需要发送api 获取数据，但需要在react组件unmount 的时候取消这个异步获取数据的订阅，类似于ngOnDestroy
 * 在useEffect 这个hook 中useEffect方法返回一个函数，这个函数就是清除逻辑应该放的地方.
 * 
 * react会在组件卸载的时候执行清除操作，同时也会在每次重新渲染的时候执行。
 * 每次render dom 后都会调用一个新的effect之前 对前一个effect 进行清理，其实可以看作effect 是一次render的属性，这次render 结束了，这个effect 跟着dom一起没了
 * 下次render时 又按照useEffect的设定重新创建了一个属于本次render 的effect
 * 
 * 和useState 一样useEffect也可以定义多个，根据代码逻辑分块
 */

/** Hook 规则
 *  --只能在react 组件的最高层使用hook，比如不能把hook 使用在if 条件句中。
 *  --Hook 是怎么知道哪个state 对应哪个useState的？
 *     react 调用hook 的顺序是相同的，首次渲染是什么顺序，update的时候还是这个顺序
 * 
 */



import React, { useEffect, useState } from 'react';

const Example = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = `Title : cilcked ${count} times`;
    })

    // 这个写法相当于每次componentDidUpdate()都clear timeout，再创建新的timeout

    //     useEffect(()=>{
    //         const id =  updateCount();
    //         console.log(id,'id')
    //         return () =>{  // 这里不可以直接调用 clearCount(id)，需要是一个新的function，否则会在updateCount 执行前直接clear掉
    //             clearCount(id)
    //         }
    //     },[count]);

    //    const updateCount =  ()=>{
    //     return setTimeout(()=>{setCount(count+2);console.log('count',count) },4000)
    //     }

    //     const clearCount = (id)=>{
    //         console.log('clear')
    //         clearTimeout(id) 
    //     }

    // 另一种方法实现轮训，类似于在componentDidMount()的时候创建interval，在componentWillUNMount()的时候清除

    const updateCount = () => {
        return setInterval(() => { 
            setCount(prevCount=>prevCount+2); // setState 的函数式更新
             }, 4000)
    }

    const clearCount = (id) => {
        console.log('clear')
        clearInterval(id)
    }

    useEffect(() => {
        const id = updateCount();
        return () => { clearCount(id) }
    }, [])

    return (
        <div>
            <p> You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click</button>
        </div>
    )
}

export default Example;