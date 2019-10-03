import React from 'react';
import './index.css';
import anime from 'animejs';

class RandomDot extends React.Component {
    render() {
        if (this.props.isActive) {
            setTimeout(() => {this.anime()}, 5000);

            console.log('render!');
        }

        console.log('disabled');

        const style = {
            width: '10px',
            height: '10px',
            background: 'red',
            borderRadius: '10px',
            top: '50%',
            left: '50%',
            position: 'fixed',
        };


        return (
            <div className={'fullscreen'}>
                <div id={'autoDot'} style={style}> </div>
            </div>
        );
    }

    anime = (() => {
        console.log('1');

        anime({
            targets: this.dot,
            easing: 'easeInOutQuad',
            translateX: [
                { value: this.randomMovementX },
                { value: this.randomMovementX },
                { value: this.randomMovementX }
            ],
            translateY: [
                { value: this.randomMovementY },
                { value: this.randomMovementY },
                { value: this.randomMovementY }
            ],
            opacity: [
                { value: 1 },
                { value: 0.5 },
                { value: 1 },
            ],
            duration: this.randomSpeed
        });
    });

    randomMovementY = (() => {
        return anime.random(-50, 50) + 'vh'
    });

    randomMovementX = (() => {
        return anime.random(-50, 50) + 'vw'
    });

    randomSpeed = (() => {
        return anime.random(1000, 5000) + 'rem'
    });

    componentDidMount() {
        this.dot = document.getElementById('autoDot');
        console.log(this.dot);
    }

}

export default RandomDot;
