import React from 'react';
import ZingTouch from 'zingtouch/src/ZingTouch';
import RandomDot from './RandomDot';
import Calibrator from './Calibrator';
import './index.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            panels: [],
            activePanelId: 1,
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
        }, () => this.togglePanel(1));
    }

    swipeHandler = (e => {
        const angle = e.detail.data[0].currentDirection;

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
        this.state.panels.forEach(panel => {
            if (+panel.id.substr(3) === id) {
                panel.style.display = 'block';

            } else {
                panel.style.display = 'none';
            }
        });

        this.setState({
            activePanelId: id,
        });
    }

    isActivePanel(id) {
        return this.state.activePanelId === id;
    }

    render() {
        return (
            <div className={'fullscreen'} id='root'>
                <div className='hide pan' id='pan1'>
                    <Calibrator isActive={this.isActivePanel(1)}> </Calibrator>
                </div>
                <div className='hide pan' id='pan2'>
                    <RandomDot isActive={this.isActivePanel(2)}> </RandomDot>
                </div>
            </div>
        );
    }
}

export default App;
