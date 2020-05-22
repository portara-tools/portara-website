import React from 'react';
import { useSpring, animated } from 'react-spring';

export default function Title(props: any) {
  const { children } = props
  const spring = useSpring({
    opacity: 1,
    font: 'Roboto',
    fontSize: '60px',
    fontWeight: 'lighter',
    color: 'white',
    from: { opacity: 0, fontSize: '600px' },
    config: { duration: 500 },
  });

  return (
    <animated.div
      style={spring}
    >
      {children}
    </animated.div>
  )
}
