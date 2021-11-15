import './styles.css'
import React, { useEffect, useRef, useState } from 'react'
import images from '../../data'
import styled from 'styled-components'
import { device } from '../UI/breakpoints'
import { useTrail, a } from '@react-spring/web'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'snap-tabs': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >
    }
  }
}

export interface StoriesTypes {
  img: {
    path: string
  }
  storyTitle: string
  subtitleCover: string
  id: number
  path: string
}

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  inset: 0;
  user-select: none;
`

const ContainerHeader = styled.div`
  display: block;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
`

const NavItem = styled.a`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  width: 10rem;
  flex-grow: 1;
  text-decoration: none;
  color: #000;
`

const Imagen = styled.div`
  width: 100%;
  height: auto;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: relative;
`

const BorderImage = styled.div`
  border: 1px solid #000;
  width: 100%;
  height: 100%;
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`

const ImgSnapTab = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const ContainerNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10rem;
  gap: 1rem;
  width: 50%;
`

const ConatinerContent = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  align-content: center;
  justify-items: center;
`

const ProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;
  left: 2rem;
  height: 100%;
  width: 100%;

  @media ${device.laptop} {
    left: 10rem;
  }

  & > a {
    color: red;
  }
`

const Forward = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`

const Logo = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`

const Trailer = styled.div`
  position: relative;
  width: 100%;
  height: 80px;
  line-height: 80px;
  color: black;
  font-size: 6em;
  font-weight: 800;
  letter-spacing: -0.05em;
  will-change: transform, opacity;
  overflow: hidden;
  text-align: left;

  & > div {
    padding-right: 0.05em;
    overflow: hidden;
  }
`

export const Slider = (): JSX.Element => {
  const curIdx = useRef(0)
  const lengthing = useRef(0)
  const curAnimation = useRef<Animation | null>(null)
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const scroll = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState<number>(0)
  const [open, set] = useState(true)

  lengthing.current = images.length

  const callback = (idx: number) => {
    curIdx.current = idx
    // cancel current animation
    if (curAnimation.current) {
      curAnimation.current.cancel()
      curAnimation.current = null
    }

    const progress = document.getElementById(`nav${curIdx.current}`)

    if (progress) {
      curAnimation.current = progress.animate(
        [{ transform: 'scale3d(1, 0, 1)' }, { transform: 'scale3d(1, 1, 1)' }],
        {
          duration: 5000,
          iterations: 1,
          easing: 'linear',
        }
      )
      curAnimation.current.onfinish = () => {
        const nextIdx =
          curIdx.current + 1 >= lengthing.current ? 0 : curIdx.current + 1
        document.getElementById(nextIdx.toString())?.scrollIntoView()
        callback(nextIdx)
      }
    }

    setTimeout(function () {
      set((state) => !state)
    }, 1000)
  }

  useEffect(() => {
    setTimeout(function () {
      callback(curIdx.current)
    }, 1000)
    return () => {
      curAnimation.current?.cancel()
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [])

  useEffect(() => {
    scroll.current?.addEventListener('scroll', () => {
      if (scroll.current) {
        const i = scroll.current.scrollLeft / scroll.current?.clientWidth
        curAnimation.current?.cancel()
        // cancel previous timeout
        if (timeout.current) {
          clearTimeout(timeout.current)
        }
        // sets a new timeout to continue with autoscroll
        setIndex(Math.ceil(i))
        timeout.current = setTimeout(() => callback(i), 100)
        /*images.map((content, key) => {
            if (key === i) {
              //here sending index IMPORTANT
            }
          })*/
      }
    })
  }, [scroll.current])

  return (
    <Container>
      <Inner>
        <snap-tabs
          onTouchStart={() => {
            // cancel current timeline
            curAnimation.current?.cancel()
            // cancel previous timeout
            if (timeout.current) {
              clearTimeout(timeout.current)
            }
            // sets a new timeout to continue with autoscroll
            timeout.current = setTimeout(() => callback(curIdx.current), 20000)
          }}
        >
          <ContainerHeader>
            <header className="scroll-snap-x header-snap-tabs">
              <ContainerNav>
                {images.map((img: any, i: number) => (
                  <SnapLink key={i} index={i} callback={callback} />
                ))}
              </ContainerNav>
              <span className="snap-indicator"></span>
            </header>
          </ContainerHeader>
          <section
            ref={scroll}
            className="scroll-snap-x section-snap-tabs rounded-b-2xl "
          >
            {images.map((img: any, i: number) => (
              <article
                className="item-snap-tabs relative"
                key={i}
                id={`${img.id}`}
              >
                <ImgSnapTab>
                  <Imagen
                    style={{ backgroundImage: `url("${img.img}")` }}
                    id={`${img.id}`}
                    className="object-cover w-full h-full"
                  >
                    <BorderImage />
                  </Imagen>
                </ImgSnapTab>
                <ConatinerContent>
                  <Logo>
                    <Trail open={!open}>
                      <span>Lorem</span>
                      <span>Ipsum</span>
                      <span>Dolor</span>
                      <span>Sit</span>
                    </Trail>
                  </Logo>
                  <ProgressBar>
                    <div className="item-line2">
                      <div id={`nav${i}`} className="progress2"></div>
                    </div>
                  </ProgressBar>
                  <Forward>
                    <a href={`#${img.id + 1}`} onClick={() => callback(index)}>
                      Move Forward
                    </a>
                  </Forward>
                </ConatinerContent>
              </article>
            ))}
          </section>
        </snap-tabs>
      </Inner>
    </Container>
  )
}

interface SnapLinkProps {
  index: number
  callback: (n: number) => void
}

export const SnapLink = ({ index, callback }: SnapLinkProps) => {
  return (
    <NavItem href={`#${index}`} onClick={() => callback(index)}>
      <span className="pl-1 text-gray-300">Topic {index}</span>
    </NavItem>
  )
}

const Trail: React.FC<{ open: boolean }> = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <Trailer>
          <a.div key={index} style={style}>
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        </Trailer>
      ))}
    </div>
  )
}
