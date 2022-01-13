import React, { useState, useCallback, CSSProperties, useEffect } from 'react'
import {
  useTransition,
  animated,
  AnimatedProps,
  useSpringRef,
} from '@react-spring/web'
import styled from 'styled-components'
import SliderRight from './SliderRight'

import styles from './styles.module.css'

export const MainContainer = styled('div')`
  display: grid;
  width: 100%;
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
  const [index2, set2] = useState(-1)
  const [show, setShow] = useState(false)
  const onClick = useCallback(() => {
    set((state) => (state + 1) % 3)
  }, [])
  /*const onClick2 = useCallback(() => {
    setShow(true)
    set2(index)
    console.log(index)
    console.log(index2)
  }, [])*/
  const onClick2 = () => {
    set2(index)
  }
  const close = () => {
    set2(-1)
  }

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
    if (index === index2) {
      transRef2.start()
    }
  }, [index, index2])

  const pages: ((
    props: AnimatedProps<{ style: CSSProperties }>
  ) => React.ReactElement)[] = [
    ({ style }) => (
      <animated.div
        style={{
          ...style,
          backgroundImage: `url(${process.env.PUBLIC_URL}/pizza.jpg)`,
          backgroundPosition: 'center',
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

  /*const pages2: ((
    props: AnimatedProps<{ style: CSSProperties }>
  ) => React.ReactElement)[] = [
    ({ style }) => (
      <animated.div style={{ ...style, background: 'red' }}>
        <div onClick={close}>A</div>
      </animated.div>
    ),
    ({ style }) => (
      <animated.div style={{ ...style, background: 'red' }}>
        <div onClick={close}>B</div>
      </animated.div>
    ),
    ({ style }) => (
      <animated.div style={{ ...style, background: 'red' }}>
        <div onClick={close}>C</div>
      </animated.div>
    ),
  ]*/

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
    <div className={`flex fill ${styles.containerSlider}`}>
      {transitions((style, i) => {
        const Page = pages[i]
        return <Page style={style} />
      })}
      {transitions2((style) => {
        //const Page2 = pages2[index]
        return (
          <SliderRight open={open} setOpen={setOpen}>
            {index}
          </SliderRight>
        )
      })}
    </div>
  )
}

export default Slider
