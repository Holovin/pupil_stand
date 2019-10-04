import React from 'react';
import './index.css';
import anime from 'animejs';
import { sample } from 'lodash';
import ZingTouch from 'zingtouch/src/ZingTouch';

class RandomDot extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeline: null,
        }
    }
    render() {
        if (this.state.timeline) {
            if (this.props.isActive) {
                console.log('[anim] play');
                this.state.timeline.play();

            } else {
                console.log('[anim] pause');
                this.state.timeline.pause();
            }
        }

        const style = {
            width: '15px',
            height: '15px',
            background: '#000',
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

    componentDidMount() {
        this.dot = document.getElementById('autoDot');
        this.activeRegion = ZingTouch.Region(this.dot.parentElement.parentElement);

        setTimeout(() => {
            this.activeRegion.bind(this.dot.parentElement, 'tap', this.handleDotClick);
        });

        this.setState({
            timeline: this.getAnime(),
        });
    }

    getAnime = () => {
        return anime({
            targets: this.dot,
            easing: 'easeInOutQuad',
            update: function (anim) {
                // console.log('%', anim.progress);
            },
            ...this.generateSteps(50),
        });
    };

    handleDotClick = () => {
        if (this.state.timeline.completed) {
            return this.setState({
                timeline: this.getAnime(),
            }, () => this.state.timeline.play());
        }

        if (this.state.timeline.paused) {
            return this.state.timeline.play();
        }

        this.state.timeline.pause();
    };

    generateSteps = ((count) => {
        const x = Array.from({ length: count }, () => ({
            value: anime.random(-48, 48) + 'vw',
            duration: this.getRandomTime(),
        }));

        const y = Array.from({ length: count }, () => ({
            value: anime.random(-48, 48) + 'vh',
            duration: this.getRandomTime(),
        }));

        const bg = Array.from({ length: count }, () => ({
            value: sample([
                '#e53935', '#D81B60', '#8E24AA',
                '#5E35B1', '#3949AB', '#1E88E5',
                '#00897B', '#7CB342', '#FB8C00',
                '#F4511E']
            ),
            duration: this.getRandomTime(),
        }));

        const sc = Array.from( { length: count }, () => ({
            value: sample([0.8, 1.3, 1.8, 2.5]),
            duration: this.getRandomTime(),
        }));

        x.push( { value: 0, duration: this.getRandomTime() });
        y.push( { value: 0, duration: this.getRandomTime() });
        bg.push( { value: '#000', duration: this.getRandomTime() });
        sc.push( { value: 1, duration: this.getRandomTime() });

        return {
            background: bg,
            translateX: x,
            translateY: y,
            scale: sc
        }
    });

    getRandomTime = (() => {
        return anime.random(800, 2200);
    });
}

export default RandomDot;
