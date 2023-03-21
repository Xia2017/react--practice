import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export default configureStore({
    reducer: {
        counter:counterReducer
    }
}
)

/**
 *  {counter:counterReducer} 这个配置的作用是，在redux状态对象中，又一个state.counter
 *   并且每次dispatch action 时，counterReducer函数负责决定是否以及如何更新state.counter 
 */