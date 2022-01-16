import React, { useState, useCallback, CSSProperties, useEffect } from 'react'
import {
  useTransition,
  animated,
  AnimatedProps,
  useSpringRef,
} from '@react-spring/web'
import styled from 'styled-components'
import SliderRight from './SliderRight'

export const MainContainer = styled('div')`
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
export const Container = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: end;
`
export const Left = styled('div')`
  display: grid;
`
export const Title = styled('div')`
  display: grid;
`
export const Right = styled('div')`
  display: grid;
`
export const Arrow = styled('div')`
  display: grid;
  justify-content: center;
  align-content: center;

  & > div {
    cursor: pointer;
  }
`

const Slider = () => {
  const [index, set] = useState(0)
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
    transRef2.start()
  }, [index])

  const pages: ((
    props: AnimatedProps<{ style: CSSProperties }>
  ) => React.ReactElement)[] = [
    ({ style }) => (
      <animated.div
        style={{
          ...style,
          backgroundImage: `url(${process.env.PUBLIC_URL}/pizza.jpg)`,
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
            <Left>LEFT</Left>
            <Title>TITLE</Title>
            <Right onClick={() => setOpen((state) => !state)}>RIGHT</Right>
          </Container>
          <Arrow>
            <div onClick={onClick}>ARROW</div>
          </Arrow>
        </MainContainer>
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        style={{
          ...style,
          backgroundImage: `url(${process.env.PUBLIC_URL}/teques.jpg)`,
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
            <Left>LEFT</Left>
            <Title>TITLE</Title>
            <Right onClick={() => setOpen((state) => !state)}>RIGHT</Right>
          </Container>
          <Arrow>
            <div onClick={onClick}>ARROW</div>
          </Arrow>
        </MainContainer>
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        style={{
          ...style,
          backgroundImage: `url(${process.env.PUBLIC_URL}/nachos.jpg)`,
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
            <Left>LEFT</Left>
            <Title>TITLE</Title>
            <Right onClick={() => setOpen((state) => !state)}>RIGHT</Right>
          </Container>
          <Arrow>
            <div onClick={onClick}>ARROW</div>
          </Arrow>
        </MainContainer>
      </animated.div>
    ),
  ]

  const transRef2 = useSpringRef()
  const transitions2 = useTransition(index, {
    ref: transRef2,
    keys: null,
    from: { opacity: 0, transform: 'translate3d(100%, 0%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0%, 0)' },
    leave: { opacity: 0, transform: 'translate3d(-100%, 0%, 0)' },
  })

  const [open, setOpen] = useState(true)

  return (
    <>
      {transitions((style, i) => {
        const Page = pages[i]
        return <Page style={style} />
      })}
      {transitions2((style) => {
        return (
          <SliderRight open={open} setOpen={setOpen}>
            {index}
          </SliderRight>
        )
      })}
    </>
  )
}

export default Slider
