import React, { useState } from 'react'
import { useSpring, animated as a } from 'react-spring'
import { makeStyles } from '@material-ui/core/styles'

export default function Card() {
  const classes = useStyles();
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  return (
    <div onClick={() => set(state => !state)}>
      <a.div className={classes.front} style={{ opacity: opacity.interpolate(o => 1 - o), transform }} />
      <a.div className={classes.back} style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} />
    </div>
  )
}

const useStyles = makeStyles(() => {
  back: {
    backgroundImage: url('https://images.unsplash.com/photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i&auto=format&fit=crop')
    position: 'absolute'
    maxWidth: '500px'
    maHeight: '500px'
    width: '50ch'
    height: '50ch'
    cursor: 'pointer'
    willChange: 'transform, opacity'
  }

  front: {
    backgroundImage: url('https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop')
    position: 'absolute'
    maxWidth: '500px'
    maHeight: '500px'
    width: '50ch'
    height: '50ch'
    cursor: 'pointer'
    willChange: 'transform, opacity'
  }

})