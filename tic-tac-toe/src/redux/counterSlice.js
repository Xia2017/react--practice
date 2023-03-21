import { createSlice } from '@reduxjs/toolkit';

export const countSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1 // 这里看起来是直接变更了state，但实际是创建了一个state的copy
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = countSlice.actions;
// 这里定义了一个thunk 函数，做异步处理，他接受dispatch 做第一个参数，当异步处理逻辑结束后，调用某个其他的action 完成state更新
// 他可以像普通的action 一样，被dispatch 触发
export const incrementAsync = (amount) => (dispatch) => {
    setTimeout(() => {
        dispatch(incrementByAmount(amount))
    }, 4000)
}

export const selectCount = (state) => state.counter.value;

export default countSlice.reducer;

/**
 * slice 是应用中单个功能的Redux reducer 逻辑和action 的集合，比如counter 相关的定义在counterSlice.js
 * 如果有另外的业务需要做user的共享和更新，那就再定义userSlice.js写user的action 和reducer。再引用
 *  配置到store里。
 */