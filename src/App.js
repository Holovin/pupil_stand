import React from 'react';
import ZingTouch from 'zingtouch/src/ZingTouch';
import RandomDot from './RandomDot';
import Calibrator from './Calibrator';
import './index.css';
import CailbratorCircle from './CailbratorCircle';

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
        }, () => this.switchPanel(1));
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

        if (newId >= this.state.panels.length) {
            newId = 3;
        }

        if (newId <= 0) {
            newId = 1;
        }

        this.state.panels.forEach(panel => {
            if (+panel.id.substr(3) === newId) {
                panel.style.display = 'block';

            } else {
                panel.style.display = 'none';
            }
        });

        this.setState({
            activePanelId: newId,
        });
    }

    isActivePanel(id) {
        return this.state.activePanelId === id;
    }

    render() {
        return (
            <div className={'fullscreen'} id='root'>
                <div className='hide pan' id='pan1'>
                    {/*<CailbratorCircle isActive={this.isActivePanel(1)}> </CailbratorCircle>*/}
                    TODO
                </div>
                <div className='hide pan' id='pan2'>
                    <Calibrator isActive={this.isActivePanel(2)}> </Calibrator>
                </div>
                <div className='hide pan' id='pan3'>
                    <RandomDot isActive={this.isActivePanel(3)}> </RandomDot>
                </div>
            </div>
        );
    }
}

export default App;
