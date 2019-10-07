import React from 'react';
import './index.css';
import anime from 'animejs/lib/anime.es.js';
import ZingTouch from 'zingtouch/src/ZingTouch';

class CalibratorCircle extends React.Component {
    static fieldName = 'tapFieldCircle';
    static elementName = 'calibrateCircle';

    constructor(props) {
        super(props);

        this.state = { visible: false };
    }

    componentDidMount() {
        const tapField = document.getElementById(CalibratorCircle.fieldName);
        this.activeRegion = ZingTouch.Region(document.getElementById('root'));
        this.activeRegion.bind(tapField, 'tap', this.handleDotClick);
    }

    handleDotClick = (() => {
        this.setState(state => {
            this.toggleCalibrateDot(CalibratorCircle.elementName, !state.visible);

            return {
                visible: !state.visible,
            };
        });
    });

    toggleCalibrateDot(id, state) {
        anime({
            targets: document.getElementById(id),
            easing: 'easeInOutQuad',
            duration: 200,

            filter: state ? 'blur(0px)' : 'blur(90px)',
        });
    }

    render() {
        const wrapperStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        };

        const style = { width: '100%' };

        return (
            <div id={CalibratorCircle.fieldName} className={'fullscreen'} style={wrapperStyle}>
                <img src={'v4_calib_marker.jpg'}
                     className={CalibratorCircle.elementName}
                     id={CalibratorCircle.elementName}
                     style={style}
                     alt={''}
                />
            </div>
        );
    }
}

export default CalibratorCircle;
