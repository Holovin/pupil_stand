import React from 'react';
import ZingTouch from 'zingtouch/src/ZingTouch';
import RandomDot from './RandomDot';
import Calibrator from './Calibrator';
import './index.css';
import CalibratorSingleCircle from './CalibratorSingleCircle';
import anime from 'animejs';
import CalibratorCircles from './CalibratorCircles';

class App extends React.Component {
    static panelLabel = 'panelLabel';

    constructor(props) {
        super(props);

        this.state = {
            panels: [],
            activePanelId: 2,
            panelLabel: null,
        }
    }

    componentDidMount() {
        const rootElement = document.getElementById('root');
        const activeRegion = ZingTouch.Region(rootElement);
        const swipe = new ZingTouch.Swipe({ escapeVelocity: 0.5, maxRestTime: 50 });
        activeRegion.bind(rootElement, swipe, this.swipeHandler);

        const panels = [];
        [...document.getElementsByClassName('pan')].forEach(panel => {
            panels.push(panel);
        });

        this.setState({
            panels,
            panelLabel: document.getElementById(App.panelLabel),
        }, () => this.switchPanel(-2));
    }

    swipeHandler = (e => {
        const angle = e.detail.data[0].currentDirection;

        // swipe right to left
        if (angle > 150 && angle < 210) {
            this.switchPanel(1);
            return;
        }

        // swipe right to left
        if (angle > 330 || angle < 30) {
            this.switchPanel(-1);
            return;
        }
    });

    switchPanel(id) {
        let newId = this.state.activePanelId + id;

        if (newId > this.state.panels.length) {
            newId = this.state.panels.length;
        }

        if (newId < 0) {
            newId = 0;
        }

        this.state.panels.forEach(panel => {
            if (+panel.id.substr(3) === newId) {
                this.showLabelWithNewText(panel.getAttribute('data-label'));
                panel.style.display = 'block';

            } else {
                panel.style.display = 'none';
            }
        });

        this.setState({
            activePanelId: newId,
        });
    }

    showLabelWithNewText = (text) => {
        anime.remove(this.state.panelLabel);

        const panelElement = this.state.panelLabel;
        panelElement.innerText = text;

        anime({
            targets: this.state.panelLabel,
            easing: 'easeInOutQuad',
            opacity: [{
                value: 1,
                duration: 100,
                endDelay: 500,
            }, {
                value: 0,
                duration: 350,
            }]
        });
    };

    isActivePanel(id) {
        return this.state.activePanelId === id;
    }

    render() {
        return (
            <div className={'fullscreen'} id='root'>
                <div id={App.panelLabel} className={App.panelLabel}>Loading...</div>

                <div className='hide pan' id='pan0' data-label={'Screen marker calibration'}>
                    <CalibratorCircles alert={this.showLabelWithNewText}> </CalibratorCircles>
                </div>

                <div className='hide pan' id='pan1' data-label={'Single marker calibration'}>
                    <CalibratorSingleCircle isActive={this.isActivePanel(1)}> </CalibratorSingleCircle>
                </div>

                <div className='hide pan' id='pan2' data-label={'Natural Features calibration'}>
                    <Calibrator isActive={this.isActivePanel(2)}> </Calibrator>
                </div>

                <div className='hide pan' id='pan3' data-label={'Accuracy test'}>
                    <RandomDot isActive={this.isActivePanel(3)}> </RandomDot>
                </div>
            </div>
        );
    }
}

export default App;
