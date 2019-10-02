import React from 'react';
import './index.css';
import anime from 'animejs/lib/anime.es.js';
import ZingTouch from 'zingtouch/src/ZingTouch';

class RandomDot extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const pageStyle = {
            width: '100vw',
            height: '100vh',
        };


        return (
            <div style={pageStyle}>
                TODO двигать точки
            </div>
        );
    }

    componentDidMount() {

    }

}

export default RandomDot;
