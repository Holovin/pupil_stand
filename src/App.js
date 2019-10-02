import React from 'react';
import './index.css';
import anime from 'animejs/lib/anime.es.js';
import ZingTouch from 'zingtouch/src/ZingTouch';
import RandomDot from './RandomDot';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { items: Array(9).fill(0) };
        this.panels = [];
    }

    componentDidMount() {
        const rootElement = document.getElementById('root');
        this.activeRegion = ZingTouch.Region(rootElement);

        const swipe = new ZingTouch.Swipe({ escapeVelocity: 0.5, maxRestTime: 50 });
        this.activeRegion.bind(rootElement, swipe, this.swipeHandler);
        this.activeRegion.bind(document.body, 'tap', this.tapHandler, true);

        [...document.getElementsByClassName('pan')].forEach(panel => {
            this.panels.push(panel);
        });

        this.togglePanel(1);
    }

    handleClick = (e => {
        const target = e.target;

        this.setState(state => {
            return {
                items: state.items.map((item, index) => {
                    const id = 'calibrate' + index;
                    const newValue = id === target.id ? 1 : 0;

                    anime({
                        targets: document.getElementById(id),
                        easing: 'easeInOutQuad',
                        duration: 200,

                        opacity: newValue ? 1 : 0.1,
                        backgroundColor: newValue ? '#F00' : '#CCCCCC',
                    });

                    return newValue;
                })
            };
        });
    });

    getListItems = (() => {
        const values = ['5px', 'calc(50% - 10px)', 'calc(100% - 30px)'];
        return values.map((x, indexX) =>
            values.map((y, indexY) => {
                const key = indexX * 3 + indexY;
                const style = {
                    display: 'block', position: 'fixed',
                    top: x+'', left: y+'',
                    width: '20px', height: '20px',
                    margin: '5x', borderRadius: '20px',
                    background: '#F00', fontSize: '5px',
                };

                return(<div key={key} id={'calibrate' + key} style={style} onClick={this.handleClick}>.</div>);
            }),
        );
    });

    swipeHandler = (e => {
        const angle = e.detail.data[0].currentDirection;
        console.log(angle);

        // swipe left
        if (angle > 150 && angle < 210) {
            this.togglePanel(2);
            return;
        }

        // swipe right
        if (angle > 330 || angle < 30) {
            this.togglePanel(1);
            return;
        }
    });

    tapHandler = (e => {
       console.log(e);
    });

    render() {
        const pageStyle = {
            width: '100vw',
            height: '100vh',
        };

        return (
            <div style={pageStyle} id='root'>
                <div className='hide pan' id='pan1'>
                    {this.getListItems()}
                </div>
                <div className='hide pan' id='pan2'>
                    <RandomDot> </RandomDot>
                </div>
            </div>
        );
    }

    togglePanel(id) {
        this.panels.forEach(panel => {
            if (+panel.id.substr(3) === id) {
                panel.style.display = 'block';

            } else {
                panel.style.display = 'none';
            }
        });
    }
}

export default App;
