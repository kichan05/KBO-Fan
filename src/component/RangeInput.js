import React, {useEffect, useMemo, useRef, useState} from 'react';
import style from "./RangeInput.css"
import {renderToPipeableStream} from "react-dom/server";

function RangeInput({max, min, onStartChange, onEndChange}) {
  const [startInfo, setStartInfo] = useState({
    isMode: false, x: 0, width: 50
  })
  const [endInfo, setEndInfo] = useState({
    isMode: false, x: 0, width: 50
  })

  function getValue(flag) {
    const singleSize = root.current?.offsetWidth / (max - min + 1)
    return Math.min(Math.floor(flag / singleSize) + min, 2023)
  }

  const root = useRef()

  const _start = useMemo(() => {
    return getValue(startInfo.x)
  }, [startInfo])

  const _end = useMemo(() => {
    return getValue(endInfo.x)
  }, [endInfo])

  useEffect(() => {
    setEndInfo({...endInfo, x: root.current.offsetWidth})
  }, [])

  const handleMouseMove = e => {
    if (startInfo.isMode && !endInfo.isMode) {
      let nextX = startInfo.x + e.movementX
      if (nextX <= 0)
        nextX = 0
      else if (nextX + startInfo.width * 2 >= endInfo.x)
        nextX = endInfo.x - startInfo.width * 2

      setStartInfo({
        ...startInfo,
        x: nextX,
        isMode: e.buttons === 1
      })
      onStartChange(_start)
    }

    if (endInfo.isMode && !startInfo.isMode) {
      let nextX = endInfo.x + e.movementX
      if (nextX >= root.current.offsetWidth)
        nextX = root.current.offsetWidth
      else if (nextX - endInfo.width * 2 <= startInfo.x)
        nextX = startInfo.x + endInfo.width * 2

      setEndInfo({
        ...endInfo,
        x: nextX,
        isMode: e.buttons === 1
      })
      onEndChange(_end)
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [startInfo, endInfo])

  return (
    <div className="range-input">
      <div className="bar" ref={root}>
        <div
          className="start"
          style={{left: startInfo.x, width: startInfo.width}}
          onMouseMove={e => {
            setStartInfo({...startInfo, isMode: e.buttons === 1})
          }}
        ></div>
        <div
          className="end"
          style={{left: endInfo.x, width: endInfo.width}}
          onMouseMove={e => {
            setEndInfo({...endInfo, isMode: e.buttons === 1})
          }}
        ></div>
        <div
          className="parent"
          style={{
            left: startInfo.x,
            width: endInfo.x - startInfo.x
          }}
        ></div>
      </div>
    </div>
  );
}

RangeInput.defaultProps = {
  max: 100,
  min: 0,
  onStartChange : () => {},
  onEndChange : () => {}
}

export default RangeInput;