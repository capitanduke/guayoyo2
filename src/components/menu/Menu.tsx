import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import { animated, useSpring, a } from '@react-spring/web'
import * as Icons from './icons'

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export const Container = styled(animated.div)`
  will-change: background-color;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #282c34;
  overflow: hidden;
  font-family: ui-monospace, monospace;
  font-size: 14px;
  line-height: 21px;
  --webkit-user-select: none;
  user-select: none;
  display: flex;
  align-items: flex-start;
  min-height: 100%;
  justify-content: center;
  overflow: auto;
`

export const Frame = styled('div')`
  position: relative;
  padding: 4px 0px 0px 0px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow-x: hidden;
  vertical-align: middle;
  color: #fff;
  fill: #fff;
`

export const Title = styled('span')`
  vertical-align: middle;
`

export const Content = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 6px;
  padding: 0px 0px 0px 14px;
  border-left: 1px dashed rgba(255, 255, 255, 0.4);
  overflow: hidden;
`

export const toggle = {
  width: '1em',
  height: '1em',
  marginRight: 10,
  cursor: 'pointer',
  verticalAlign: 'middle',
}

interface TestProps {
  defaultOpen?: boolean
  name: string | JSX.Element
  openStatus: boolean
  opening: (openStatus: boolean) => void
}

const Tree = React.memo<React.HTMLAttributes<HTMLDivElement> & TestProps>(
  ({ children, name, style, defaultOpen = false, opening, openStatus }) => {
    const [isOpen, setOpen] = useState(defaultOpen)
    const previous = usePrevious(isOpen)
    const [ref, { height: viewHeight }] = useMeasure()
    const { height, opacity, y } = useSpring({
      from: { height: 0, opacity: 0, y: 0 },
      to: {
        height: isOpen ? viewHeight : 0,
        opacity: isOpen ? 1 : 0,
        y: isOpen ? 0 : 20,
      },
    })

    console.log(opening)

    // @ts-ignore
    const Icon =
      Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
    return (
      <Frame>
        <Icon
          style={{ ...toggle, opacity: children ? 1 : 0.3 }}
          onClick={() => setOpen(!isOpen)}
        />
        <Title style={style} onClick={() => opening(!openStatus)}>
          {name} - title
        </Title>
        <Content
          style={{
            opacity,
            height: isOpen && previous === isOpen ? 'auto' : height,
          }}
        >
          <a.div ref={ref} style={{ y }} children={children} />
        </Content>
      </Frame>
    )
  }
)

const Wrapper = () => {
  const [isOpen2, setOpen2] = useState(false)

  const { backgroundColor } = useSpring({
    from: { backgroundColor: '#282c34' },
    to: {
      backgroundColor: isOpen2 ? 'red' : '#282c34',
    },
  })

  // @ts-ignore
  return (
    <Container style={{ backgroundColor }}>
      <Tree openStatus={isOpen2} name="main" opening={setOpen2} defaultOpen>
        <Tree openStatus={isOpen2} name="hello222222" opening={setOpen2} />
        <Tree
          openStatus={isOpen2}
          name="subtree with children"
          opening={setOpen2}
        >
          <Tree openStatus={isOpen2} name="hello" opening={setOpen2} />
          <Tree
            openStatus={isOpen2}
            name="sub-subtree with children"
            opening={setOpen2}
          >
            <Tree
              openStatus={isOpen2}
              name="child 1"
              style={{ color: '#37ceff' }}
              opening={setOpen2}
            />
            <Tree
              openStatus={isOpen2}
              name="child 2"
              style={{ color: '#37ceff' }}
              opening={setOpen2}
            />
            <Tree
              openStatus={isOpen2}
              name="child 3"
              style={{ color: '#37ceff' }}
              opening={setOpen2}
            />
            <Tree openStatus={isOpen2} name="custom content" opening={setOpen2}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 200,
                  padding: 10,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'red',
                    borderRadius: 5,
                  }}
                />
              </div>
            </Tree>
          </Tree>
          <Tree openStatus={isOpen2} name="hello" opening={setOpen2} />
        </Tree>
        <Tree openStatus={isOpen2} name="world" opening={setOpen2} />
        <Tree
          openStatus={isOpen2}
          name={<span>🙀 something something</span>}
          opening={setOpen2}
        />
      </Tree>
    </Container>
  )
}

export const Menu: any = () => {
  return <Wrapper />
}
