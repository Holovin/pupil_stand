import React from 'react';
import './index.css';
import anime from 'animejs/lib/anime.es.js';
import ZingTouch from 'zingtouch/src/ZingTouch';

class CailbratorCircle extends React.Component {
    constructor(props) {
        super(props);

        this.state = { items: Array(9).fill(0) };
    }

    componentDidMount() {
        const tapField = document.getElementById('tapFieldCircle');
        this.activeRegion = ZingTouch.Region(document.getElementById('root'));
        this.activeRegion.bind(tapField, 'tap', this.handleDotClick);

        [...document.getElementsByClassName('calibrateCircle')].forEach(dot => {
            this.activeRegion.bind(dot, 'tap', this.handleDotClick);
        });
    }

    handleDotClick = (e => {
        const target = e.target;

        this.setState(state => {
            if (target.id === 'tapFieldCircle') {
                let enabledIndex = -1;

                const items = state.items.map((item, index) => {
                    const id = this.getCalibrateId(index);

                    if (item === 1 && enabledIndex === -1) {
                        enabledIndex = index + 1;
                    }

                    let newValue = enabledIndex === index ? 1 : 0;
                    this.toggleCalibrateDot(id, newValue);

                    return newValue;
                });

                if (enabledIndex === state.items.length || enabledIndex === -1) {
                    this.toggleCalibrateDot('calibrateCircle0', 1);
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
        return 'calibrateCircle' + id;
    }

    toggleCalibrateDot(id, state) {
        anime({
            targets: document.getElementById(id),
            easing: 'easeInOutQuad',
            duration: 200,

            opacity: state ? 1 : 0.1,
            background: state ? 'url(v4_calib_marker.jpg) 0% 0% / cover' : '#aaa',
        });
    }

    renderDots = (() => {
        const sideSize = 60;
        const values = [
            '5px',
            'calc(50% - ' + (sideSize / 2) + 'px)',
            'calc(100% - ' + parseInt(sideSize * 1.5) + 'px)'
        ];

        return values.map((x, indexX) =>
            values.map((y, indexY) => {
                const key = indexX * values.length + indexY;
                const style = {
                    display: 'block', position: 'fixed',
                    top: x + '', left: y + '',
                    width: sideSize + 'px', height: sideSize + 'px',
                    borderRadius: sideSize + 'px', margin: sideSize / 10 + 'px',
                    background: '#EEE',
                };

                return(<div className={'calibrateCircle'} key={key} id={'calibrateCircle' + key} style={style}> </div>);
            }),
        );
    });

    render() {
        return (
            <div id={'tapFieldCircle'} className={'fullscreen'}>
                { this.renderDots() }
            </div>
        );
    }
}

export default CailbratorCircle;
