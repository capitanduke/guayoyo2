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

const Heart: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 24 24"
    stroke="#FFC300"
  >
    <path
      stroke="#FFC300"
      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    />
  </svg>
)

export { ArrowSVG, ArrowLeft, ArrowDown, Frame, Heart }
