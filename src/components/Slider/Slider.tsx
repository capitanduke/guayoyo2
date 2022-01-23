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
  display: flex;
  flex-direction: column;
`
const Left = styled('div')`
  display: flex;
`
const ContainerTitle = styled('div')`
  display: flex;
  align-items: start;
  justify-content: center;
  height: 100%;
`

const UpperTitle = styled('h1')`
  font-size: 6rem;
  color: #ffc300;
  font-weight: 900;

  @media screen and (max-width: 480px) {
    font-size: 4rem;
  }
`

const Right = styled('div')`
  display: flex;
  justify-content: end;
  position: relative;
  top: 5rem;
  right: 2rem;
`
const Arrow = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

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
    set((state) => (state + 1) % 4)
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

  const [titles, setTitles] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])

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

  const [title, setTitle] = useState<string>()

  const OpenMenu = (i: number) => {
    setTitle(titles[i])
    setOpen((state) => !state)
  }

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
              <Right onClick={() => OpenMenu(i)}>
                <ArrowSVG />
              </Right>
              <ContainerTitle>
                <UpperTitle>{titles[i]}</UpperTitle>
              </ContainerTitle>
            </Container>
            <Arrow>
              <div onClick={onClick}>
                <ArrowDown />
              </div>
            </Arrow>
          </MainContainer>
        </animated.div>
      ))}
      <SliderRight Index={index} open={open} setOpen={setOpen} title={title} />
      <SliderLeft openLeft={openLeft} setOpenLeft={setOpenLeft}>
        {index}
      </SliderLeft>
    </>
  )
}

export default Slider
