import React, { useState } from 'react'
import { useTrail, animated } from 'react-spring'
import { makeStyles } from '@material-ui/core/styles';

const config = {
  mass: 5,
  tension: 2000,
  friction: 200
}

export default function DecorateExpand(props) {
  const classes = useStyles(props)
  const { children } = props
  const [toggle, set] = useState(true)
  const trail = useTrail(children.length, {
    config,
    opacity: toggle ? 1 : 0,
    value: toggle ? 0 : 20,
    height: toggle ? 80 : 0,
    from: {
      opacity: 0,
      value: 20,
      height: 0
    }
  })

  return (
    <div className={classes.mainDiv} onClick={() => set(state => !state)}>
      <div className={classes.innerDiv}>
        {trail.map(({ value, height, ...rest }, index) => (
          <animated.div
            key={children[index]}
            style={{ ...rest, transform: value.interpolate((value) => `translat3d(0,${value}px,0)`) }}
          >
            <animated.div style={{ height }}>{children[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  mainDiv: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  innerDiv: {
    position: "relative",
    width: "100%",
    height: "80px",
    lineHeight: "80px",
    color: "voilet",
    fontSize: "5em",
    fontWeight: "bold",
    textTransform: "uppercase",
    willChange: "transform, opacity",
    overflow: "hidden"
  }
}))