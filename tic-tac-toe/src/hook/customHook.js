/**
 * 自定义Hook是一个函数，其名以use开头，函数内部可以调用其他hook
 * 自定义hook 可以在react组件中灵活的共享逻辑
 * 例：自定义hook 做倒计时器，在 timers 组件里复用
 * 这个例子有问题，clockerData 变化的时候 useClocker 里面的clockerTime 不会重新初始化，用render prop 更合适
 */

import { useEffect, useState } from "react";
import * as _ from 'lodash';

function useClocker(clockerData) {
    console.log('clockerData',clockerData)
    const [clockerTime, seClockerTime] = useState(clockerData.clockerTime);
    console.log('clockerTime',clockerTime)
    useEffect(() => {
        const intervalID = setInterval(() => {
            seClockerTime(clockerTime-1) 
        }, 1000)

        if (!clockerTime) {
            clearInterval(intervalID)
        }
        return (() => { clearInterval(intervalID) })
    },[clockerTime]) 
    return [clockerData.clockerID, clockerTime, clockerTime === 0 ? true : false]
}

function Timers(props) {
    const [current, setCurrent] = useState({ clockerID: 1, clockerTime: 10 })
    const clockerList = [
        { clockerID: 1, clockerTime: 10 },
        { clockerID: 2, clockerTime: 200 }
    ]
    const [watchClocker, watchTime, watchStop] = useClocker(current)
    console.log(watchClocker, watchTime, watchStop)
    const handleClick = (e)=>{
        const match = clockerList.filter((per) => { 
            return per.clockerID+''===e.target.value
        })[0]
        setCurrent(match)
        console.log('current_45',current,match)
    }
    return (
        <div>
            <select
                value={current.clockerID} onChange={e => handleClick(e)}
            >
                {
                    clockerList.map((per) => {
                        return <option key={per.clockerID}>{per.clockerID}</option>
                    })
                }
            </select>
            <div>
                current clocker:{watchClocker}
                time: {watchTime}
                status:{watchStop?'stoped':'counting'}
            </div>
        </div>

    );
}

export default Timers;