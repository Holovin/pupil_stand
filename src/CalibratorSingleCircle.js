import React from 'react';
import './index.css';
import anime from 'animejs/lib/anime.es.js';
import ZingTouch from 'zingtouch/src/ZingTouch';

class CalibratorSingleCircle extends React.Component {
    static fieldName = 'tapFieldSingleCircle';
    static elementName = 'calibrateSingleCircle';

    constructor(props) {
        super(props);

        this.state = { visible: false };
    }

    componentDidMount() {
        const tapField = document.getElementById(CalibratorSingleCircle.fieldName);
        this.activeRegion = ZingTouch.Region(document.getElementById('root'));
        this.activeRegion.bind(tapField, 'tap', this.handleDotClick);
    }

    handleDotClick = (() => {
        this.setState(state => {
            this.toggleCalibrateDot(CalibratorSingleCircle.elementName, !state.visible);

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

        const style = {
            width: '100%',
            maxWidth: '100vh',
            maxHeight: '100vw',
        };

        return (
            <div id={CalibratorSingleCircle.fieldName} className={'fullscreen'} style={wrapperStyle}>
                <img src={'v4_calib_marker.jpg'}
                     className={CalibratorSingleCircle.elementName}
                     id={CalibratorSingleCircle.elementName}
                     style={style}
                     alt={''}
                />
            </div>
        );
    }
}

export default CalibratorSingleCircle;
