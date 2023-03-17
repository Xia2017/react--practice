/**
 * 状态提升即，当多个子组件需要同时反映相同的数据变化时，，往往将共享状态提升到最近的共同父组件中
 * 下面的例子就是组件状态提升的逻辑思路，组件逻辑如下
 * 
 * 父组件 Calculate (需要同时展示摄氏度和华氏度两种温度，输入摄氏度时，要自动计算华氏度，输入华氏度时自动计算摄氏度)
 *   --子组件1 ：temperature 
 *   --子组件2: temperature
 *  提升思路
 *   -- 父组件Calculate 引用两次子组件分别用作摄氏度和华氏度输入和展示
 *   -- 子组件，只做数据展示输入，不做逻辑处理，数据的处理通通放在父组件进行
 *      a.接受prop.scale 来确定是摄氏度还是华氏度
 *      b.接受prop.temperature 作为input的value展示并输入值
 *      c.接受prop.onTemperatureChange ，来做事件监听方法，当input onChange 时调用父组件的对应方法计算摄氏度或华氏度
 * 
 *  -- 当输入摄氏度时
 *      a.触发子组件的handleChange方法，调用prop.onTemperatureChange方法，进而触发父组件的handleCelsiusChange方法。
 *      b.父组件的handleCelsiusChange方法 触发setState()方法更新了this.state.temperature为用户最新输入值，并触发父组件的render方法
 *      c.父组件render方法进行计算摄氏度和华氏度，并将重新计算好的值prop给两个子组件
 *      d.两个子组件接收到新的temperature后对比之前的prop.temperature,华氏度的子组件发现值变了，重新渲染了input的值
 */

/**
 * <Fragment></Fragment> 类似于angular 的ng-template 是react的内置组件，他用于将元素分组，使代码结构更清晰，省略不必要层次的div
 *  是div 单纯的出现在他必须要出现的页面上，减少不必要的dom 元素加快渲染速度。他不会产生实际的dom元素。
 */
import React, { Fragment } from 'react';


function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p> The watet would boil</p>
    } else {
        return <p> The watet would not boil</p>
    }
}



class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.scaleNames = {
            c: 'Celsius',
            f: 'Fahrenheit'
        };
    }
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        console.log('temp render', this.props.scale)
        return (
            <fieldset>
                <legend>Enter temperature in {this.scaleNames[this.props.scale]}:</legend>
                <input
                    value={this.props.temperature}
                    onChange={this.handleChange.bind(this)} />
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = { temperature: '', scale: 'c' };
    }
    handleCelsiusChange(temperature) {
        this.setState({ scale: 'c', temperature });
    }

    handleFahrenheitChange(temperature) {
        this.setState({ scale: 'f', temperature });
    }

    tryConvert(temperature, convert) {
        const input = parseFloat(temperature);
        if (Number.isNaN(input)) {
            return '';
        }
        const output = convert(input);
        const rounded = Math.round(output * 1000) / 1000;
        return rounded.toString();
    }
    toCelsius(fahrenheit) {
        return (fahrenheit - 32) * 5 / 9;
    }
    toFahrenheit(celsius) {
        return (celsius * 9 / 5) + 32;
    }

    render() {

        const celsius = this.state.scale === 'f' ? this.tryConvert(this.state.temperature, this.toCelsius) : this.state.temperature;
        const fahrenheit = this.state.scale === 'c' ? this.tryConvert(this.state.temperature, this.toFahrenheit) : this.state.temperature;

        return (
            <div>
                <Fragment key='12'>
                    <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange} />
                    <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange} />
                </Fragment>

                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        );
    }

}
export default Calculator;