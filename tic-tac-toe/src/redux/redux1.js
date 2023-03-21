
/** Redux 术语和概念
 * Action：action 是一个具有type 字段的普通js对象，可以视为“描述应用程序Hong发生了什么的事件”
 *      -- type 是个字符串，给这个action一个描述性的名字通常写为“域/事件名称”如：“todos/todoAdded”
 *      -- action 对象可以有其他字段。其中包含有关发生的事情的附加信息，，按照惯例，我们将该信息放在名为payload的字段中
 *      典型的action对象如下
 *  
 *      const addTodoAction = {
 *          type: 'todos/todoAdded',
 *          payload: 'Buy milk'
 *          }
 * 
 * 
 * 
 * Action Creator :是创建并返回一个action对象的函数，让我们不必每次都手动便携action对象
 *      
 *      const addTodo = text => {
 *          return {
 *              type: 'todos/todoAdded',
 *               payload: text
 *              }
 *          }
 * 
 * 
 * Reducer：reducer是一个函数，接收当前的state 和一个action对象，必要时决定如何更新状态，并返回新状态
 *  可以将reducer视为一个事件监听器，它根据接收到的action类型处理事件。函数签名是(state,action)=>newState
 * 
 * reducer 规则：
 *      --仅使用 state 和 action 参数计算新的状态值
 *      --禁止直接修改 state。必须通过复制现有的 state 并对复制的值进行更改的方式来做 不可变更新（immutable updates）。
 *      --禁止任何异步逻辑、依赖随机值或导致其他“副作用”的代码
 * 
 * 常规 reducer 逻辑
 *  a.检查reducer是否关心这个action
 *      如果是，赋值state，使用新的值更新state副本，并返回新的state副本
 *      如果不是，返回原来的state 不变
 *  如：
 *  const initialState = { value: 0 }
 *   function counterReducer(state = initialState, action) {
 *    // 检查 reducer 是否关心这个 action
 *       if (action.type === 'counter/increment') {
 *           // 如果是，复制 `state`
 *           return {
 *                ...state,
 *               // 使用新值更新 state 副本
 *                 value: state.value + 1
 *                }
 *       }
 *       // 返回原来的 state 不变
 *           return state
 *       }
 * 
 * 
 * Store：当前Reduz应用的state存在于一个名为store的对象中
 * store 是通过传入一个 reducer 来创建的，并且有一个名为 getState 的方法，它返回当前状态值：
 * 如：
 *  import { configureStore } from '@reduxjs/toolkit'
 *    const store = configureStore({ reducer: counterReducer })
 *    console.log(store.getState())
 *    // {value: 0}
 * 
 * Dispatch ：Redux store 有一个方法教dispatch。更新state 的唯一方法是调用“store.dispatch()并传入一个action对象”
 *  store 将执行所有reducer函数并自酸楚更新后的state，调用getState() 可以获取新state
 * 如：
 * store.dispatch({ type: 'counter/increment' })
 *  console.log(store.getState())
 *  // {value: 1}
 * 
 * 
 * store，dispatch，action的作用和逻辑
 *  -- dispatch 一个action 基本类似于“触发一个事件”，我们希望store 知道这件事
 *  -- reducer 就像事件监听器，当他收到关注的action后，就会更新state作为响应
 * 如：
 *  const increment = () => {
 *   return {
 *       type: 'counter/increment'
 *       }
 *   }
 * store.dispatch(increment)
 * console.log(store.getState())
 *  
 * Selector 函数可以从store 状态书中提取指定的片段，会遇到应用程序的不同部分需要读取相同的数据，selector 可以避免重复这样的读取逻辑
 * const selectCounterValue = state => state.value
 * const currentValue = selectCounterValue(store.getState())
 * console.log(currentValue)
 * 
 * 
 * Redux 单向数据流
 * 初始启动：
    a.使用最顶层的 root reducer 函数创建 Redux store
    b.store 调用一次 root reducer，并将返回值保存为它的初始 state
    c.当视图 首次渲染时，视图组件访问 Redux store 的当前 state，并使用该数据来决定要呈现的内容。同时监听 store 的更新，以便他们可以知道 state 是否已更改。
   
    更新环节：
    a.应用程序中发生了某些事情，例如用户单击按钮
    b.dispatch 一个 action 到 Redux store，例如 dispatch({type: 'counter/increment'})
    c.store 用之前的 state 和当前的 action 再次运行 reducer 函数，并将返回值保存为新的 state
    d.store 通知所有订阅过的视图，通知它们 store 发生更新
    e.每个订阅过 store 数据的视图 组件都会检查它们需要的 state 部分是否被更新。
    f.发现数据被更新的每个组件都强制使用新数据重新渲染，紧接着更新网页
 * 
 */

import React from 'react';
import { increment, decrement, selectCount,incrementAsync } from './counterSlice';
import { useSelector, useDispatch } from 'react-redux'; // 这些是react 允许其他第三方库自定义的hook

function Counter(props) {
    // State: counter 值
    const count = useSelector(selectCount); // useSelector 这个hook 让我们的组件从redux的store 状态树中提取他需要的任何数据
    // 每当一个 action 被 dispatch 并且 Redux store 被更新时，useSelector 将重新运行我们的选择器函数。如果选择器返回的值与上次不同，useSelector 将确保我们的组件使用新值重新渲染。
    const dispatch = useDispatch();


    // View: 视图定义
    return (
        <div>
            Redux Counter Value: {count}
            <button onClick={() => { dispatch(increment()) }}>+</button>
            <button onClick={() => { dispatch(decrement()) }}>-</button>
            <button onClick={() => { dispatch(incrementAsync(4)) }}>Async</button>
        </div>


    )
}

export default Counter;


/**
 * redux 基础用法和流程总结、
 * 1.定义slice，slice 就是action 和reducer 被定义的地方，redux-toolkit 有createSlice 方法可以直接创建
 *   以下是createSlice的参数说明
 *      -- name：用于生产action对象的type的前半部分比如{type:counter/increment}的这个counter
 *      --initialState:{value:0}: reducer 的初始值，以便在第一次调用时就有一个state
 *      --reducers:{}: 定义reducer 函数
 * 2. export slice 里生成的action 和reducer,state
 *      -- action: export const [increment,decrement] = slice.actions;
 *      -- reducer: export default countSlice.reducer;
 *      -- state: export const selectCount=(state)=>state.counter.value; 
 * 3.create store
 *      configureStore({
 *          reducer: {
 *           counter:counterReducer // counterReducer 就是slice export的 reducer
 *              // 这个key counter 是定义在最终状态树中有state.counter, 是state的key
 *          }
 *      })
 * 4.定义store 应用的范围： 在某层react组件，比如根组件import { Provider } from "react-redux"; 以及上一步定义好的store
 *   用<Provider store={store}> </Provider> 包裹所有子选素，意味着在这层以及其子内共享一个store
 * 
 * 5.某层react 组件要变更 state的值:
 *      --import { useSelector, useDispatch } from 'react-redux';
 *      --import actions 以及 select from 自定义slice文件 // 选择器函数
 *      --声明dispatch ：const dispatch = useDispatch();
 *        声明selector：useSelector(select)
 *      --dispatch action 触发改动：dispatch(actionName())
 * 
 * 异步逻辑处理：
 *  定义thunk 函数 countSlice.js的24行
 *  thunk 函数可以当作普通的action 被组件dispatch
 */