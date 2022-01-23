import React from 'react'
import { useTrail, a } from '@react-spring/web'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { ArrowLeft, Frame } from './ArrowSVG'

const Container = styled('div')`
  display: grid;
  grid-template-rows: 200px 1fr 100px;
  width: 100%;

  @media screen and (max-width: 480px) {
    grid-template-rows: 150px 1fr;
  }
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

const InnerContainer = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 480px) {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  & > a > h1 {
    margin: 0;
    font-weight: 700;
  }
`

const Link = styled('a')`
  display: flex;
  justify-content: center;

  @media screen and (max-width: 480px) {
    display: flex;
    justify-content: center;
  }
`

const Map = styled('div')`
  display: flex;
  align-self: center;
  width: 30rem;
  height: 100%;

  @media screen and (max-width: 480px) {
    width: 20rem;
    height: 20rem;
  }
`

const Address = styled('div')`
  position: relative;

  @media screen and (max-width: 480px) {
  }
`

const Tagline = styled('div')`
  display: flex;
  width: 100%;
  background-color: #000000;
  color: #fff;
  justify-content: center;
  align-items: center;
  height: 4rem;
  position: absolute;
  bottom: 0;

  @media screen and (max-width: 480px) {
    height: 2rem;
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
                    <Link
                      href="https://www.google.com/maps/place/Guayoyo/@41.4035428,2.1362907,15z/data=!4m2!3m1!1s0x0:0xfd6bb89a33744458?sa=X&ved=2ahUKEwiHloH9pMj1AhV5if0HHUpkAlwQ_BJ6BAgjEAU"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Map
                        style={{
                          backgroundImage: `url(${item.featured_media_src_url})`,
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'contain',
                        }}
                      >
                        <Frame />
                      </Map>
                    </Link>
                    <Address
                      dangerouslySetInnerHTML={{
                        __html: item.excerpt.rendered,
                      }}
                    />
                    <InnerContainer>
                      <a
                        href="https://www.instagram.com/guayoyobarcelona/?hl=es"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <h1>INSTAGRAM</h1>
                      </a>
                      <a
                        href="https://www.thefork.es/restaurante/guayoyo-r296109"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <h1>EL TENEDOR</h1>
                      </a>
                    </InnerContainer>
                  </>
                ))}
            </Content>
            <Tagline>HELLO</Tagline>
          </Container>
        </Block>
      ))}
    </>
  )
}

export default SliderLeft
