import React from 'react'
import { useTrail, a } from '@react-spring/web'
import styled from 'styled-components'
import { Menu } from '../menu/Menu'

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
  top: 0;
`

const SliderRight: React.FC<{
  open: boolean
  Index: number
  setOpen: (state: boolean) => void
}> = ({ open, Index, setOpen }) => {
  //const items = React.Index.toArray(Index)
  const trail = useTrail(1, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: !open ? 1 : 0,
    x: !open ? 0 : 2000,
    from: { opacity: 0, x: -2000 },
  })
  return (
    <>
      {trail.map(({ ...style }, index) => (
        <Block key={index} style={style}>
          <CloseButton onClick={() => setOpen(!open)}>X</CloseButton>
          <Menu />
        </Block>
      ))}
    </>
  )
}

export default SliderRight