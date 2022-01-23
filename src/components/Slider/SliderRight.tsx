import React, { useEffect, useState } from 'react'
import { useTrail, a } from '@react-spring/web'
import styled from 'styled-components'
import { Menu } from '../menu/Menu'
import { ArrowSVG } from './ArrowSVG'

const Block = styled(a.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;
  font-size: 5em;
  will-change: transform, opacity;
  text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
  -webkit-user-select: none;
  user-select: none;
  background-color: greenyellow;
`

const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 2rem;
  z-index: 99999;
`

const SliderRight: React.FC<{
  open: boolean
  Index: number
  title: string | undefined
  setOpen: (state: boolean) => void
}> = ({ open, Index, setOpen, title }) => {
  //const items = React.Index.toArray(Index)
  const trail = useTrail(1, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: !open ? 1 : 0,
    y: !open ? 0 : -1200,
    from: { opacity: 0, y: 1200 },
  })

  const [finalIndex, setFinalIndex] = useState(2)

  useEffect(() => {
    if (Index === 0) {
      setFinalIndex(2)
    } else if (Index === 1) {
      setFinalIndex(5)
    } else if (Index === 2) {
      setFinalIndex(3)
    } else {
      setFinalIndex(6)
    }
  }, [Index])

  return (
    <>
      {trail.map(({ ...style }, index) => (
        <Block key={index} style={style}>
          <CloseButton onClick={() => setOpen(!open)}>
            <ArrowSVG />
          </CloseButton>
          <Menu index={finalIndex} title={title} />
        </Block>
      ))}
    </>
  )
}

export default SliderRight
