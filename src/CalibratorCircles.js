import React from 'react';
import './index.css';
import anime from 'animejs/lib/anime.es.js';
import ZingTouch from 'zingtouch/src/ZingTouch';

class CalibratorCircles extends React.Component {
    static fieldName = 'tapFieldCircles';
    static elementName = 'calibrateCircles';
    static sideSize = 100;
    static sizeMod = 0.05;

    constructor(props) {
        super(props);

        this.state = {
            items: [
                {
                    x: `calc(50%  - ${CalibratorCircles.sideSize / 2}px)`,
                    y: `calc(50%  - ${CalibratorCircles.sideSize / 2}px)`
                },

                {
                    x: `${CalibratorCircles.sideSize * CalibratorCircles.sizeMod}px`,
                    y: `${CalibratorCircles.sideSize * CalibratorCircles.sizeMod}px`
                },

                {
                    x: `calc(100% - ${CalibratorCircles.sideSize + CalibratorCircles.sideSize * CalibratorCircles.sizeMod}px)`,
                    y: `${CalibratorCircles.sideSize * CalibratorCircles.sizeMod}px`
                },

                {
                    x: `calc(100% - ${CalibratorCircles.sideSize + CalibratorCircles.sideSize * CalibratorCircles.sizeMod}px)`,
                    y: `calc(100% - ${CalibratorCircles.sideSize + CalibratorCircles.sideSize * CalibratorCircles.sizeMod}px)`
                },

                {
                    x: `${CalibratorCircles.sideSize * CalibratorCircles.sizeMod}px`,
                    y: `calc(100% - ${CalibratorCircles.sideSize + CalibratorCircles.sideSize * CalibratorCircles.sizeMod}px)`
                },

            ],
            activeIndex: 0,
        };
    }

    componentDidMount() {
        const tapField = document.getElementById(CalibratorCircles.fieldName);
        this.activeRegion = ZingTouch.Region(document.getElementById('root'));
        this.activeRegion.bind(tapField, 'tap', this.handleClick);
    }

    handleClick = (() => {
        this.setState(state => {
            if (state.activeIndex < state.items.length * 2) {
                const isShowingMove = state.activeIndex % 2 === 0;

                if (isShowingMove) {
                    this.props.alert(`Show ${state.activeIndex / 2 + 1} / ${state.items.length}`);
                } else {
                    this.props.alert(`Hide ${(state.activeIndex - 1) / 2 + 1} / ${state.items.length}`);
                }


                if (state.activeIndex % 2 === 0) {
                    this.toggleCalibrateCircle(state.activeIndex / 2, 1);
                } else {
                    this.toggleCalibrateCircle((state.activeIndex - 1) / 2, 0);
                }

                return { activeIndex: state.activeIndex + 1 }
            }

            this.toggleCalibrateCircle(state.activeIndex - 1, 0);
            this.props.alert('Calibration ended');

            return { activeIndex: 0 };
        });
    });

    toggleCalibrateCircle(id, state) {
        anime({
            targets: document.getElementById(`${CalibratorCircles.elementName}` + id),
            easing: 'easeInOutQuad',
            duration: 100,
            opacity: state ? 1 : 0,
        });
    }

    renderDots = (() => {
        return this.state.items.map((item, index) => {
                const style = {
                    display: 'block', position: 'fixed',
                    top: item.y,
                    left: item.x,
                    width:  CalibratorCircles.sideSize + 'px',
                    height: CalibratorCircles.sideSize + 'px',
                    borderRadius: CalibratorCircles.sideSize + 'px',
                    opacity: 0,
                };

            return (<img className={'test'} key={index}
                         id={CalibratorCircles.elementName + index} style={style}
                         src={'v4_calib_marker.jpg'} alt={''}/>);
        });
    });

    render() {
        return (
            <div id={CalibratorCircles.fieldName} className={'fullscreen'}>
                { this.renderDots() }
            </div>
        );
    }
}

export default CalibratorCircles;
