import React, { useState, useCallback, CSSProperties, useEffect } from 'react'
import {
  useTransition,
  animated,
  AnimatedProps,
  useSpringRef,
} from '@react-spring/web'
import styled from 'styled-components'
import SliderRight from './SliderRight'
import SliderLeft from './SliderLeft'
import { useQuery } from 'react-query'
import { ArrowSVG, ArrowLeft, ArrowDown } from './ArrowSVG'

const MainContainer = styled('div')`
  display: grid;
  width: 100%;
  height: 100%;
  color: white;
  font-weight: 400;
  font-size: 2em;
  will-change: transform, opacity;
  text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
  -webkit-user-select: none;
  user-select: none;
`
const Container = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: end;
`
const Left = styled('div')`
  display: grid;
  justify-content: center;
`
const Title = styled('div')`
  display: grid;
  color: #ffc300;
`
const Right = styled('div')`
  display: grid;
  justify-content: left;
  bottom: 10rem;
  position: relative;
`
const Arrow = styled('div')`
  display: grid;
  justify-content: center;
  align-content: center;

  & > div {
    cursor: pointer;
  }
`

interface StylingTypes {
  style: {
    opacity: number
    transform: string
  }
}

const Slider = () => {
  const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
    fetch('http://guayoyoapi.souminimal.com/wp-json/wp/v2/pages').then((res) =>
      res.json()
    )
  )
  const [index, set] = useState(0)
  const [open, setOpen] = useState(true)
  const [openLeft, setOpenLeft] = useState(true)

  const onClick = useCallback(() => {
    set((state) => (state + 1) % 3)
  }, [])

  const transRef = useSpringRef()
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: 'translate3d(0%, 100%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0%, 0)' },
    leave: { opacity: 0, transform: 'translate3d(0%, -50%, 0)' },
  })

  useEffect(() => {
    transRef.start()
  }, [index])

  const [titles, setTitles] = useState<React.ReactElement[]>([])
  const [images, setImages] = useState<React.ReactElement[]>([])

  useEffect(() => {
    !isLoading &&
      data.map((item: any) => {
        setTitles((currentArray) => [...currentArray, item.title.rendered])
        setImages((currentArray) => [
          ...currentArray,
          item.featured_media_src_url,
        ])
      })
  }, [!isLoading])

  return (
    <>
      {transitions((style, i) => (
        <animated.div
          style={{
            ...style,
            backgroundImage: `url(${images[i]})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <MainContainer>
            <Container>
              <Left onClick={() => setOpenLeft((state) => !state)}>
                <ArrowLeft />
              </Left>
              <Title>
                <h1>{titles[i]}</h1>
              </Title>
              <Right onClick={() => setOpen((state) => !state)}>
                <ArrowSVG />
              </Right>
            </Container>
            <Arrow>
              <div onClick={onClick}>
                <ArrowDown />
              </div>
            </Arrow>
          </MainContainer>
        </animated.div>
      ))}
      <SliderRight Index={index} open={open} setOpen={setOpen} />
      <SliderLeft openLeft={openLeft} setOpenLeft={setOpenLeft}>
        {index}
      </SliderLeft>
    </>
  )
}

export default Slider
