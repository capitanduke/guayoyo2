import React from 'react'

interface Props {
  style?: {
    opacity?: number
    width?: string
    height?: string
    marginRight?: number
    cursor?: string
    verticalAlign?: string
    color?: string
  }
}

const ArrowSVG: React.FC<Props> = (props) => (
  <svg
    {...props}
    width="86"
    height="185"
    viewBox="0 0 186 185"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="75" x2="75" y2="185" stroke="#ffc300" strokeWidth="14" />
    <line
      x1="185.504"
      y1="94.3127"
      x2="0.504253"
      y2="94.6873"
      stroke="#ffc300"
      strokeWidth="14"
    />
  </svg>
)

const ArrowLeft: React.FC<Props> = (props) => (
  <svg
    {...props}
    width="88"
    height="145"
    viewBox="0 0 188 245"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="35.7024"
      y1="83.4781"
      x2="130.702"
      y2="2.4781"
      stroke="black"
      strokeWidth="8"
    />
    <line
      x1="0.522361"
      y1="82.6476"
      x2="185.514"
      y2="84.3526"
      stroke="black"
      strokeWidth="8"
    />
    <line
      x1="16.3707"
      y1="83.5436"
      x2="186.371"
      y2="243.544"
      stroke="black"
      strokeWidth="8"
    />
  </svg>
)

const ArrowDown: React.FC<Props> = (props) => (
  <svg
    {...props}
    width="92"
    height="92"
    viewBox="0 0 192 192"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="95.7024"
      y1="130.478"
      x2="190.702"
      y2="49.4781"
      stroke="black"
      strokeWidth="8"
    />
    <line
      x1="2.12806"
      y1="44.5828"
      x2="95.5262"
      y2="127.425"
      stroke="black"
      strokeWidth="8"
    />
    <line
      x1="95.7024"
      y1="190.478"
      x2="190.702"
      y2="109.478"
      stroke="black"
      strokeWidth="8"
    />
    <line
      x1="2.12806"
      y1="104.583"
      x2="95.5262"
      y2="187.425"
      stroke="black"
      strokeWidth="8"
    />
    <line x1="97" x2="97" y2="185" stroke="black" strokeWidth="8" />
  </svg>
)

const Frame: React.FC<Props> = (props) => (
  <svg
    {...props}
    width="100%"
    height="100%"
    viewBox="0 0 452 343"
    preserveAspectRatio="none"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="2.5"
      y1="45"
      x2="2.49408"
      y2="343"
      stroke="#FFC300"
      strokeWidth="3"
    />
    <line x1="54" y1="1.5" x2="449" y2="1.5" stroke="#FFC300" strokeWidth="3" />
    <line
      x1="1"
      y1="341.5"
      x2="438"
      y2="341.5"
      stroke="#FFC300"
      strokeWidth="3"
    />
    <line
      x1="450.5"
      y1="3"
      x2="450.5"
      y2="253"
      stroke="#FFC300"
      strokeWidth="3"
    />
  </svg>
)

export { ArrowSVG, ArrowLeft, ArrowDown, Frame }
