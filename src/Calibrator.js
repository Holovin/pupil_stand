import React from 'react';
import './index.css';
import anime from 'animejs/lib/anime.es.js';

class Calibrator extends React.Component {
    constructor(props) {
        super(props);

        this.state = { items: Array(9).fill(0) };
    }

    componentDidMount() {
        // TODO: lol, i know
        setTimeout(() => {
            const tapField = document.getElementById('tapField');
            this.props.activeRegion.bind(tapField, 'tap', this.handleDotClick);

            [...document.getElementsByClassName('calibrate')].forEach(dot => {
                this.props.activeRegion.bind(dot, 'tap', this.handleDotClick);
            });
        });
    }

    handleDotClick = (e => {
        const target = e.target;

        this.setState(state => {
            if (target.id === 'tapField') {
                let enabledIndex = -1;

                const items = state.items.map((item, index, array) => {
                    const id = this.getCalibrateId(index);

                    if (item === 1 && enabledIndex === -1) {
                        enabledIndex = index + 1;
                    }

                    let newValue = enabledIndex === index ? 1 : 0;
                    this.toggleCalibrateDot(id, newValue);

                    return newValue;
                });

                if (enabledIndex === state.items.length) {
                    this.toggleCalibrateDot('calibrate0', 1);
                    items[0] = 1;
                }

                return { items };
            }

            return {
                items: state.items.map((_, index) => {
                    const id = this.getCalibrateId(index);
                    const newValue = id === target.id ? 1 : 0;
                    this.toggleCalibrateDot(id, newValue);

                    return newValue;
                }),
            };
        });
    });

    getCalibrateId(id) {
        return 'calibrate' + id;
    }

    toggleCalibrateDot(id, state) {
        anime({
            targets: document.getElementById(id),
            easing: 'easeInOutQuad',
            duration: 200,

            opacity: state ? 1 : 0.1,
            backgroundColor: state ? '#F00' : '#CCCCCC',
        });
    }

    renderDots = (() => {
        const values = ['5px', 'calc(50% - 10px)', 'calc(100% - 30px)'];
        return values.map((x, indexX) =>
            values.map((y, indexY) => {
                const key = indexX * 3 + indexY;
                const style = {
                    display: 'block', position: 'fixed',
                    top: x + '', left: y + '',
                    width: '20px', height: '20px',
                    margin: '5x', borderRadius: '20px',
                    background: '#F00', fontSize: '5px',
                };

                return(<div className={'calibrate'}
                            key={key}
                            id={'calibrate' + key}
                            style={style}>
                </div>);
            }),
        );
    });

    render() {
        return (
            <div id={'tapField'} className={'fullscreen'}>
                {!!this.props.activeRegion ? this.renderDots() : ''}
            </div>
        );
    }
}

export default Calibrator;
