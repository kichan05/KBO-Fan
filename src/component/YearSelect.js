import React, {useEffect, useRef, useState} from 'react';
import style from "./YearSelect.css"

function YearSelect() {
  const [startInfo, setStartInfo] = useState({
    isMode: false, x: 0, width: 50
  })
  const [endInfo, setEndInfo] = useState({
    isMode: false, x: 100, width: 50
  })

  const root = useRef()
  useEffect(() => {
    setEndInfo({...endInfo, x : root.current.offsetWidth})
  }, [])

  const handleMouseMove = e => {
    if (startInfo.isMode && !endInfo.isMode) {
      let nextX = startInfo.x + e.movementX
      if(nextX <= 0)
        nextX = 0
      else if(nextX + startInfo.width * 2 >= endInfo.x){
        nextX = endInfo.x - startInfo.width * 2
        setStartInfo({
          ...startInfo, x: nextX,
          isMode: e.buttons === 1
        })
        return
      }

      setStartInfo({
        ...startInfo,
        x: nextX,
        isMode: e.buttons === 1
      })
    }

    if (endInfo.isMode && !startInfo.isMode) {
      let nextX = endInfo.x + e.movementX
      if(nextX >= root.current.offsetWidth)
        nextX = root.current.offsetWidth
      else if(nextX - endInfo.width * 2 <= startInfo.x){
        nextX = startInfo.x + endInfo.width * 2
        setEndInfo({
          ...endInfo,
          x: nextX,
          isMode: e.buttons === 1
        })
        return
      }

      setEndInfo({
        ...endInfo,
        x: nextX,
        isMode: e.buttons === 1
      })
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [startInfo, endInfo])

  return (
    <div className="year-select">
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
            left : startInfo.x,
            width : endInfo.x - startInfo.x
          }}
        ></div>
      </div>
    </div>
  );
}

export default YearSelect;