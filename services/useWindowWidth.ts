'use client'

import { useState, useLayoutEffect } from 'react'

function useWindowWidth() {
  const [width, setWidth] = useState<number>(0)

  useLayoutEffect(() => {
    setWidth(window.innerWidth)

    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

export default useWindowWidth
