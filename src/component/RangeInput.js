import React, {useEffect, useMemo, useRef, useState} from 'react';
import style from "./RangeInput.css"

function RangeInput({max, min, start, end, onChange}) {
  const [startInfo, setStartInfo] = useState({
    isMode: false, x: 0, width: 50
  })
  const [endInfo, setEndInfo] = useState({
    isMode: false, x: 0, width: 50
  })

  const root = useRef()
  let [_start, _end] = [0, 0]
  _start = useMemo(() => {
    if(root.current === undefined) return

    const width = Math.round(max * (endInfo.x - startInfo.x) / root.current.offsetWidth)
    return _end - width
    return Math.round(startInfo.x * max / root.current.offsetWidth)
  }, [startInfo])

  _end = useMemo(() => {
    if(root.current === undefined) return
    return Math.round(endInfo.x * max / root.current.offsetWidth)
  }, [endInfo])

  useEffect(() => {
    setEndInfo({...endInfo, x: root.current.offsetWidth})
  }, [])

  const handleMouseMove = e => {
    if (startInfo.isMode && !endInfo.isMode) {
      let nextX = startInfo.x + e.movementX
      if (nextX <= 0)
        nextX = 0
      else if (nextX + startInfo.width * 2 >= endInfo.x) {
        nextX = endInfo.x - startInfo.width * 2
        setStartInfo({
          ...startInfo, x: nextX,
          isMode: e.buttons === 1
        })
        onChange({_start, _end})
        return
      }

      setStartInfo({
        ...startInfo,
        x: nextX,
        isMode: e.buttons === 1
      })
      onChange({_start, _end})
    }

    if (endInfo.isMode && !startInfo.isMode) {
      let nextX = endInfo.x + e.movementX
      if (nextX >= root.current.offsetWidth)
        nextX = root.current.offsetWidth
      else if (nextX - endInfo.width * 2 <= startInfo.x) {
        nextX = startInfo.x + endInfo.width * 2
        setEndInfo({
          ...endInfo,
          x: nextX,
          isMode: e.buttons === 1
        })
        onChange({_start, _end})
        return
      }

      setEndInfo({
        ...endInfo,
        x: nextX,
        isMode: e.buttons === 1
      })
      onChange({_start, _end})
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
        >
          {_start}, {_end}
        </div>
      </div>
    </div>
  );
}

RangeInput.defaultProps = {
  max: 100,
  min: 0,
  start: 50,
  end: 60,
  onChange: () => {
  },
}

export default RangeInput;