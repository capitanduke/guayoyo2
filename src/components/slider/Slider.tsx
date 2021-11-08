import './styles.css'
import React, { useEffect, useRef, useState } from 'react'
import images from '../../data'
//import { useHistory, useParams } from 'react-router-dom'
//import { useQuery } from 'react-query'
//import * as api from "../../CockData";
import styled from 'styled-components'

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

const Imagen = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  position: relative;
  top: -10rem;
  left: 2rem;
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
  width: 100%;
`

const ConatinerContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  align-content: center;
  justify-items: center;
`

const BackTouch = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`

const Forward = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`

const ContentSwipe = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`

export const Slider = (): JSX.Element => {
  const curIdx = useRef(0)
  const lengthing = useRef(0)
  const curAnimation = useRef<Animation | null>(null)
  const timeout = useRef<NodeJS.Timeout | null>(null)
  const scroll = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState<number>(0)

  console.log(images.length)
  lengthing.current = images.length

  const callback = (idx: number) => {
    console.log('index Real ->', idx)

    curIdx.current = idx
    // cancel current animation
    if (curAnimation.current) {
      curAnimation.current.cancel()
      curAnimation.current = null
    }

    const progress = document.getElementById(`nav${curIdx.current}`)

    if (progress) {
      curAnimation.current = progress.animate(
        [{ transform: 'scale3d(0, 1, 1)' }, { transform: 'scale3d(1, 1, 1)' }],
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
          //console.log(content.content)
        }
      })*/
    }
  })

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
          <div className="container-header">
            <header className="scroll-snap-x header-snap-tabs">
              <ContainerNav>
                {images.map((img: any, i: number) => (
                  <SnapLink key={i} index={i} callback={callback} />
                ))}
              </ContainerNav>
              <span className="snap-indicator"></span>
            </header>
          </div>
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
                    src={img.img}
                    id={`${img.id}`}
                    alt={`${img.id}`}
                    className="object-cover w-full h-full"
                  />
                </ImgSnapTab>
                <ConatinerContent>
                  <BackTouch>
                    <a
                      href={`#${i > 0 ? img.id - 1 : ''}`}
                      onClick={() => callback(index)}
                    >
                      Move left
                    </a>
                  </BackTouch>
                  <ContentSwipe>Swipeing</ContentSwipe>
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

type ImageType = typeof images[0]

interface SnapLinkProps {
  //img: ImageType
  index: number
  callback: (n: number) => void
}

export const SnapLink = ({ index, callback }: SnapLinkProps) => {
  return (
    <a className="nav-items" href={`#${index}`} onClick={() => callback(index)}>
      <span className="pl-1 text-gray-300">Topic {index}</span>
      <div className="item-line mb-9">
        <div id={`nav${index}`} className="progress"></div>
      </div>
    </a>
  )
}
