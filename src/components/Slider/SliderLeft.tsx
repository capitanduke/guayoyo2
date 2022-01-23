import React from 'react'
import { useTrail, a } from '@react-spring/web'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { ArrowLeft } from './ArrowSVG'

const Container = styled('div')`
  display: grid;
  grid-template-rows: 250px 1fr;
  width: 100%;
`

const Block = styled(a.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  -webkit-user-select: none;
  user-select: none;
  background-color: #ffffff;
`

const HeaderContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
`

const Back = styled('div')`
  display: grid;
  transform: rotate(180deg);
  align-content: end;
`

const LogoContainer = styled('div')`
  display: flex;
  width: 100%;
  justify-content: center;
`

const Logo = styled('div')`
  display: flex;

  @media screen and (max-width: 480px) {
    left: 3rem;
  }
`

const Space = styled('div')`
  width: 100%;
`

const Content = styled('div')`
  display: flex;
  flex-direction: column;
`

const ContainerText = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Text = styled('div')`
  display: flex;
  justify-content: center;
  width: 65%;

  @media screen and (max-width: 480px) {
    width: 80%;
  }
`

const Map = styled('div')`
  display: flex;
  align-self: center;
  width: 30rem;
  height: 100%;

  @media screen and (max-width: 480px) {
    width: 20rem;
    height: 100%;
  }
`

const Address = styled('div')`
  position: relative;
  top: -6rem;

  @media screen and (max-width: 480px) {
    top: -4rem;
  }
`

const SliderLeft: React.FC<{
  openLeft: boolean
  setOpenLeft: (state: boolean) => void
}> = ({ openLeft, children, setOpenLeft }) => {
  const { isLoading, error, data, isFetching } = useQuery(['posts'], () =>
    fetch(
      `http://guayoyoapi.souminimal.com/wp-json/wp/v2/posts?categories=4`
    ).then((res) => res.json())
  )
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: !openLeft ? 1 : 0,
    x: !openLeft ? 0 : -2000,
    from: { opacity: 0, x: 0 },
  })
  console.log(data)
  return (
    <>
      {trail.map(({ ...style }, index) => (
        <Block key={index} style={style}>
          <Container>
            <HeaderContainer>
              <Space />
              <LogoContainer>
                <Logo
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
              </LogoContainer>
              <Back onClick={() => setOpenLeft(!openLeft)}>
                <ArrowLeft />
              </Back>
            </HeaderContainer>
            <Content>
              {!isLoading &&
                data.map((item: any, i: number) => (
                  <>
                    <ContainerText>
                      <Text
                        dangerouslySetInnerHTML={{
                          __html: item.content.rendered,
                        }}
                      />
                    </ContainerText>
                    <Map
                      style={{
                        backgroundImage: `url(${item.featured_media_src_url})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                      }}
                    />
                    <Address
                      dangerouslySetInnerHTML={{
                        __html: item.excerpt.rendered,
                      }}
                    />
                    <div>X</div>
                  </>
                ))}
            </Content>
          </Container>
        </Block>
      ))}
    </>
  )
}

export default SliderLeft
