import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TestJSX from './jsx';
import TestComponent from './component_props';
import { Clock } from './component_props';
import TestConditionalRendering from './conditional-rendering';
import ParentForm from './form';
import Calculator from './liftingStateUp'
import Welcom from './CompositionInheritance';
import MouseTracker from './renderProps';
// hook
import Example from './hook/hook'
import Timers from './hook/customHook';
//redux
import ReduxCounter from './redux/redux1'
import store from "./redux/store";
import { Provider } from "react-redux";





class Square extends React.Component {// 受控组件（controlled components）
    render() {
        return (
            <button className="square"
                onClick={() => this.props.onClick()}> {/**给 state 赋值 ，每次在组件中调用setState时，react都会自动更新其子组件*/}
                {/* TODO */}
                {this.props.value} {/**子组建接收父组建传参 */}
            </button>
        );
    }
}

class Board extends React.Component {


    renderSquare(i) {
        return <Square value={this.props.squares[i]}  // 父组建定义传参的变量名为value
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {

        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)} {/**父组建实际传参 */}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}



class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            isNextStep: true,
            stepNumber: 0,
            username: null
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();// shallow copy
        if (calculateWinner(squares) || squares[i]) { return; }
        squares[i] = this.state.isNextStep ? 'X' : 'O';
        this.state.isNextStep = !this.state.isNextStep;
        this.setState({
            history: history.concat([{ squares: squares }]),
            isNextStep: this.state.isNextStep,
            stepNumber: history.length
        });
    }

    jumpTo(step) {
        this.setState(
            {
                stepNumber: step,
                xIsNext: (step % 2) === 0
            }
        );
        console.log('this.state', this.state)
    }
    login() {
        /**
         * 这里记录username 使用state比全局变量更合适
         * 使用普通的全局变量 this.username 并将其通过props传递给子组件时，当username在父组件更新后，子组件的render不会被触发
         *  其实父组件也不会被触发。
         * 使用state ，每次state变化的时候，父组件的render都会被触发，但不是无差别render所有子组件，会更新需要变化的元素
         */
        this.setState(
            { username: 'yue' }
        )

    }
    logout() {
        this.setState(
            { username: null }
        )
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            console.log(step, move);
            const desc = move ? 'Go to move #' + move : 'Go to start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner' + winner;
        } else {
            status = 'Next player:' + (this.state.isNextStep ? 'X' : 'O');
        }
        return (
            <Provider store={store}>
                <div>
                    <div>
                        <button onClick={this.login.bind(this)} >Login</button>
                        <button onClick={this.logout.bind(this)} >Logout</button>
                    </div>
                    <div className="game">
                        <div className="game-board">
                            <Board
                                squares={current.squares}
                                onClick={(i) => this.handleClick(i)}
                            />
                        </div>
                        <div className="game-info">
                            <div>{status}</div>
                            <ol>{moves}</ol>
                        </div>
                    </div>
                    <div>
                        <TestJSX name="test" />
                    </div>
                    <div>
                        <TestComponent desc="you will learn moro about react component" />
                    </div>
                    <div>
                        <Clock></Clock>
                    </div>
                    <div>
                        <TestConditionalRendering user={this.state.username}></TestConditionalRendering>
                    </div>
                    <div>
                        <ParentForm />
                    </div>
                    <div>
                        状态提升
                        <Calculator />
                    </div>
                    <div>
                        组合
                        <Welcom />
                    </div>
                    <div>
                        <MouseTracker />
                    </div>
                    <div>
                        hook
                        <div>
                            <Example />
                        </div>
                    </div>
                    <div>
                        customHook
                        <div>
                            <Timers />
                        </div>
                    </div>
                    <div>
                        redux counter
                        <ReduxCounter />
                    </div>
                </div>
            </Provider>



        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
