import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import useMeasure from 'react-use-measure'
import { animated, useSpring, a } from '@react-spring/web'
import * as Icons from './icons'
import { useQuery } from 'react-query'

function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export const Container = styled(animated.div)`
  will-change: background-color;
  text-align: justify;
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
  align-items: center;
`

export const Frame = styled('div')`
  position: relative;
  padding: 20px 0px 0px 0px;
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
  margin-bottom: 1rem;
`

export const ContentText = styled('div')`
  position: relative;
  top: 1rem;
  display: block;
  word-wrap: break-word;
  width: 250px;
  white-space: normal;

  & > div {
    margin-bottom: 1rem;
  }
`

export const Price = styled('div')`
  display: inline-flex;
  & > div {
    display: flex;
    align-self: center;
    margin-right: 10px;
  }
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
          {name}
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

type Person = {
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
  featured_media_src_url: string
  excerpt: {
    rendered: string
  }
}

const Wrapper = () => {
  const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
    fetch(
      'http://guayoyoapi.souminimal.com/wp-json/wp/v2/posts?categories=2'
    ).then((res) => res.json())
  )
  const [isOpen2, setOpen2] = useState(false)

  const { backgroundColor } = useSpring({
    from: { backgroundColor: '#282c34' },
    to: {
      backgroundColor: isOpen2 ? 'red' : '#282c34',
    },
  })

  console.log('data menuuuuu --->>', data)

  // @ts-ignore
  return (
    <Container style={{ backgroundColor }}>
      <Tree openStatus={isOpen2} name="Carta" opening={setOpen2} defaultOpen>
        {!isLoading &&
          data.map((item: Person, i: number) => (
            <Tree
              key={i}
              openStatus={isOpen2}
              name={`${item.title.rendered}`}
              opening={setOpen2}
            >
              <ContentText
                dangerouslySetInnerHTML={{ __html: item.content.rendered }}
              />
              <Price>
                <div>Precio:</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.excerpt.rendered,
                  }}
                />
              </Price>
              {item.featured_media_src_url !== null && (
                <Tree openStatus={isOpen2} name="Image" opening={setOpen2}>
                  <div
                    style={{
                      position: 'relative',
                      width: 250,
                      height: 250,
                      padding: 10,
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${item.featured_media_src_url})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        borderRadius: 5,
                      }}
                    />
                  </div>
                </Tree>
              )}
            </Tree>
          ))}

        <Tree
          openStatus={isOpen2}
          name={<span>🙀 something something</span>}
          opening={setOpen2}
          style={{ color: '#37ceff' }}
        />
      </Tree>
    </Container>
  )
}

export const Menu: any = () => {
  return <Wrapper />
}
