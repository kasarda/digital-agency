import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { image } from '../../services/local'
import { getPageByLink } from '../../services/pages'
import Letter from '../Letter'
import './Showcase.css'
import { scrollAnimation, resetScrollAnimation } from '../../services/animation'

class Showcase extends Component {

    scrollUp() {
        window.scrollTo(0, 0)
        resetScrollAnimation()
    }

    animationEnd({ animationName }) {
        if (/-Overflow/.test(animationName)) {
            scrollAnimation()
        }
    }

    componentDidMount() {
        scrollAnimation()
        document.body.style.overflowY = 'visible'
        document.documentElement.style.height = 'auto'
    }

    render() {
        const {
            id,
            title,
            letter,
            theme,
            paragraphs,
            next,
            prev
        } = getPageByLink(this.props.match.path)

        const { state } = this.props.location
        const redirected = (state && state.redirected) || false
        return (
            <div id="Showcase" onAnimationEnd={this.animationEnd.bind(this)} data-redirected={redirected}>
                <div
                    className="camera flex justify-center align-end"
                    data-active-navigation
                >
                    <Letter letter={letter} />
                </div>

                <section id="intro-section">
                    <div className="description">
                        <h3 data-animate="fadeUp" data-offset="200">{title}</h3>
                        <p data-animate="fadeUp" data-offset="100">
                            {paragraphs[0]}
                        </p>
                    </div>
                    <div
                        data-animate="fadeLeft" data-offset="-200"
                        className="mobile-showcase flex flex-center"
                        style={{
                            backgroundColor: theme,
                            backgroundImage: image(`bg${id}.jpg`, true)
                        }}>
                        <img src={image(`mobile${id}.png`)} alt="website on mobile" />
                    </div>
                </section>

                <section id="challenge-section">
                    <div className="description">
                        <h3 data-animate="fadeUp">Challenge</h3>
                        <p data-animate="fadeUp" data-offset="100">
                            {paragraphs[1]}
                        </p>
                    </div>
                    <div className="showcases">
                        <div data-animate="fadeLeft" data-offset="-200" className="desktop-showcase rect-after flex justify-center right">
                            <div className="row" style={{backgroundColor: theme}}>
                                <img src={image(`desktop${id}-1.jpg`)} alt="website on dekstop" />
                            </div>
                        </div>
                        <div data-animate="fadeUp" className="desktop-showcase flex justify-center left">
                            <div className="row" style={{backgroundColor: theme}}>
                                <img src={image(`desktop${id}-2.jpg`)} alt="website on dekstop" />
                            </div>
                        </div>
                        <div data-animate="fadeUp" data-offset="100" className="description between-showcases">
                            <p>
                                {paragraphs[2]}
                            </p>
                        </div>
                        <div data-animate="fadeLeft" data-offset="-200" className="desktop-showcase rect-after flex justify-center right">
                            <div className="row" style={{backgroundColor: theme}}>
                                <img src={image(`desktop${id}-3.jpg`)} alt="website on dekstop" />
                            </div>
                        </div>
                        <div data-animate="fadeUp" className="desktop-showcase flex justify-center left">
                            <div className="row" style={{backgroundColor: theme}}>
                                <img src={image(`desktop${id}-4.jpg`)} alt="website on dekstop" />
                            </div>
                        </div>
                    </div>
                </section>

                <footer>
                    <div className="consulation" style={{
                        backgroundColor: theme
                    }}>
                        <h4 className="inline-block primary-hover">
                            <a>Visit Website</a>
                        </h4>
                        <div className="container flex justify-center">
                            <div className="column next flex justify-end">
                                <Link to={prev || ''}>
                                    <div className="content primary-hover" onClick={this.scrollUp.bind(this)}>
                                        <span>previously</span>
                                        <h4>{prev}</h4>
                                    </div>
                                </Link>
                            </div>
                            <div className="column prev flex justify-start">
                                <Link to={next || ''}>
                                    <div className="content primary-hover" onClick={this.scrollUp.bind(this)}>
                                        <span>next</span>
                                        <h4>{next}</h4>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Showcase