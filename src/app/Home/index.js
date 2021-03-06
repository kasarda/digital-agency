import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { image, text, setTitle, preload, preventTouch } from '../../services/common'
import { getConfig, getPageById } from '../../services/pages'
import Letter from '../Letter'
import Side from '../Side'
import Wheel from '../Wheel'
import Navigator from '../Navigator'
import { onFakeScroll, onTouchStart, onArrow, registerFakeScroll, unregisterFakeScroll } from './fakeScroll'
import './Home.css'

class Home extends Component {

    constructor() {
        super()

        this.state = {
            to: 0,
            currentPage: 0,
            renderPage: 0,
            renderImage: 0,
            length: getConfig().length,
            sideReady: false,
            ready: false,
            down: undefined,
            from: undefined,
            fromLast: undefined,
            redirect: false,
            canRedirect: false,
            onFakeScroll: onFakeScroll.bind(this),
            onTouchStart: onTouchStart.bind(this),
            onArrow: onArrow.bind(this),
            startPosY: null,
            startPosX: null
        }



        preload(
            0,
            'project1.jpg',
            'project2.jpg',
            'project3.jpg',
            'project4.jpg'
        )
    }

    toPage(newPage) {
        const { to, ready, length } = this.state

        if (ready && to !== newPage) {
            this.setState({
                ready: false,
                sideReady: false,
                to: newPage,
                from: to,
                fromLast: to === length,
                down: !(to > newPage)
            })
        }
    }

    setPage(type) {
        const { to, length, ready } = this.state

        if (ready) {
            if (!(to === 0 && type === 'prev')) {
                this.setState({
                    sideReady: false,
                    ready: false
                })
            }

            if (type === 'next') {
                const nextPage = to + 1
                const newPage = nextPage <= length ? nextPage : 0
                this.setState({
                    to: newPage,
                    from: to,
                    fromLast: to === length,
                    down: true
                })
            }

            else if (type === 'prev' && to > 0) {
                const prevPage = to - 1
                this.setState({
                    to: prevPage,
                    from: to,
                    fromLast: false,
                    down: false
                })
            }
        }
    }

    animationEnd({ animationName }) {
        const { to } = this.state

        if (/-SideReady/.test(animationName))
            this.setState({ sideReady: true })

        if (/-Ready/.test(animationName))
            this.setState({ ready: true, currentPage: to })

        if (/-RenderPage/.test(animationName))
            this.setState({ renderPage: to })

        if (/-RenderImage/.test(animationName))
            this.setState({ renderImage: to })

        if (/-Redirect/.test(animationName))
            this.setState({ canRedirect: true })
    }

    animationStart({ animationName }) {
        const { to } = this.state

        if (/-StartRender/.test(animationName))
            this.setState({ renderPage: to })
    }

    onCanRedirect(link) {
        this.setState({ redirect: true, link })
    }

    shouldComponentUpdate(_, { to, renderImage }) {
        if (renderImage === 0 && to !== 0)
            this.setState({ renderImage: to })

        return true
    }

    componentWillReceiveProps({ toHomePage }) {
        if (toHomePage) {
            this.toPage(0)
            this.props.onHomePageTriggered()
        }
    }

    componentDidMount() {
        preventTouch(true)
        registerFakeScroll.call(this)
    }

    componentWillUnmount() {
        preventTouch(false)
        unregisterFakeScroll.call(this)
    }

    render() {
        setTitle('Digital Agency')
        const {
            to, down, from, fromLast,
            sideReady, ready,
            renderPage, currentPage, renderImage,
            redirect, canRedirect, link
        } = this.state

        const { fallbackTheme } = getPageById(renderImage || 1)

        const url = renderImage > 0 ? image(`project${renderImage}.jpg`, true) : null

        if (canRedirect)
            return <Redirect push to={{
                pathname: link,
                state: {
                    redirected: true
                }
            }} />

        return (
            <div
                id="Home" className="view"
                data-home={to === 0}
                data-down={down}
                data-side-ready={sideReady}
                data-ready={ready}
                data-from={from}
                data-from-last={fromLast}
                data-to={to}
                data-redirect={redirect}
                data-current-page={currentPage}
                onAnimationEnd={this.animationEnd.bind(this)}
                onAnimationStart={this.animationStart.bind(this)}
            >
                <Side renderPage={renderPage} onCanRedirect={this.onCanRedirect.bind(this)} />
                <Letter letter="C" id="Letter" />

                <div className="camera flex direction-col justify-end">
                    <div className="column flex">
                        <div className="rule">
                            <div
                                className="background"
                                style={{ backgroundImage: url, backgroundColor: fallbackTheme }}>
                            </div>
                        </div>
                        <h1>
                            <span className="block">{text('Digital', 'Digitálna')}</span>
                            <span className="block">{text('Creative Agency', 'Kreatívna Agentúra')}</span>
                        </h1>
                    </div>
                </div>

                <Wheel />
                <Navigator onPage={id => this.toPage(id)} currentPage={currentPage} />
            </div>
        )
    }
}

export default Home