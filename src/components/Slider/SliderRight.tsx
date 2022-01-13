import React from 'react'
import { useTrail, a } from '@react-spring/web'

import styles from './styles.module.css'

const SliderRight: React.FC<{
  open: boolean
  setOpen: (state: boolean) => void
}> = ({ open, children, setOpen }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: !open ? 1 : 0,
    x: !open ? 0 : 2000,
    from: { opacity: 0, x: -2000 },
  })
  return (
    <>
      {trail.map(({ ...style }, index) => (
        <a.div key={index} className={styles.block2} style={style}>
          <a.div>{children}</a.div>
          {''}
          <div onClick={() => setOpen(!open)}>X</div>
        </a.div>
      ))}
    </>
  )
}

export default SliderRight
