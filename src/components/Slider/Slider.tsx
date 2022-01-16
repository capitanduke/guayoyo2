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
`
const Title = styled('div')`
  display: grid;
`
const Right = styled('div')`
  display: grid;
`
const Arrow = styled('div')`
  display: grid;
  justify-content: center;
  align-content: center;

  & > div {
    cursor: pointer;
  }
`

const Slider = () => {
  const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
    fetch('http://guayoyoapi.souminimal.com/wp-json/wp/v2/posts').then((res) =>
      res.json()
    )
  )
  console.log(data)
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
            <Left onClick={() => setOpenLeft((state) => !state)}>LEFT</Left>
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
            <Left onClick={() => setOpenLeft((state) => !state)}>LEFT</Left>
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
            <Left onClick={() => setOpenLeft((state) => !state)}>LEFT</Left>
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

  return (
    <>
      {transitions((style, i) => {
        const Page = pages[i]
        return <Page style={style} />
      })}
      <SliderRight Index={index} open={open} setOpen={setOpen} />
      <SliderLeft openLeft={openLeft} setOpenLeft={setOpenLeft}>
        {index}
      </SliderLeft>
    </>
  )
}

export default Slider
