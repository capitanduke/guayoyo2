import React from 'react'
import { useTrail, a } from '@react-spring/web'
import styled from 'styled-components'

const Block = styled(a.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;
  font-size: 5em;
  will-change: transform, opacity;
  text-shadow: 0px 2px 40px #00000020, 0px 2px 5px #00000030;
  -webkit-user-select: none;
  user-select: none;
  background-color: #ffffff;
`

const Logo = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SliderLeft: React.FC<{
  openLeft: boolean
  setOpenLeft: (state: boolean) => void
}> = ({ openLeft, children, setOpenLeft }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: !openLeft ? 1 : 0,
    x: !openLeft ? 0 : -2000,
    from: { opacity: 0, x: 0 },
  })
  return (
    <>
      {trail.map(({ ...style }, index) => (
        <Block key={index} style={style}>
          <Logo>
            <div
              style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/logo.png)`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                position: 'absolute',
                width: '10rem',
                height: '10rem',
                top: '0',
              }}
            />
          </Logo>
          <a.div>{children}</a.div>
          {''}
          <div onClick={() => setOpenLeft(!openLeft)}>X</div>
        </Block>
      ))}
    </>
  )
}

export default SliderLeft
