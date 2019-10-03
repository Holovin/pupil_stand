import React from 'react';
import './index.css';
import ZingTouch from 'zingtouch/src/ZingTouch';
import RandomDot from './RandomDot';
import Calibrator from './Calibrator';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.panels = [];
        this.state = {
            activeRegion: '',
        }
    }

    componentDidMount() {
        const rootElement = document.getElementById('root');
        const activeRegion = ZingTouch.Region(rootElement);
        const swipe = new ZingTouch.Swipe({ escapeVelocity: 0.5, maxRestTime: 50 });
        activeRegion.bind(rootElement, swipe, this.swipeHandler);
        // this.activeRegion.bind(rootElement, swipe, this.swipeHandler);

        [...document.getElementsByClassName('pan')].forEach(panel => {
            this.panels.push(panel);
        });

        this.togglePanel(1);

        this.setState({
            activeRegion,
        });
    }

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

    togglePanel(id) {
        this.panels.forEach(panel => {
            if (+panel.id.substr(3) === id) {
                panel.style.display = 'block';

            } else {
                panel.style.display = 'none';
            }
        });
    }

    render() {
        return (
            <div className={'fullscreen'} id='root'>
                <div className='hide pan' id='pan1'>
                    <Calibrator activeRegion={this.state.activeRegion}> </Calibrator>
                </div>
                <div className='hide pan' id='pan2'>
                    <RandomDot> </RandomDot>
                </div>
            </div>
        );
    }
}

export default App;
