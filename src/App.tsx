import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Button, Slider, Card } from '@geist-ui/core'
import { notification } from '@tauri-apps/api'
const minuteSeconds = 60

const renderTime = ({ remainingTime }: { remainingTime: number }) => {
  return (
    <div className="time-wrapper">
      <div className="time">{getTimeMinutes(remainingTime)}</div>
    </div>
  )
}


function getTimeMinutes(remainingTime: number) {
  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  )
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60
  return `${minutes}:${seconds}`
}

function genColorTime() {

}


function App() {
  const [duration, setDuration] = useState(30)
  const [key, setKey] = useState('')
  const [isPlaying, setIsPlaying] = useState(true)
  // 分钟参考 https://codesandbox.io/s/musing-davinci-mqssz?fontsize=14&hidenavigation=1&theme=dark&file=/src/App.js:199-271
  return (
    <div className='app'>
      <Card hoverable type={"secondary"}>
        <p>休息片刻, 用来提醒办公族们抬头远眺</p>
      </Card>
      <div className='timer-wrapper'>
        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          size={150}
          strokeWidth={10}
          duration={duration}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[25, 20, 10, 0]}
          onComplete={() => ({ shouldRepeat: true, delay: 1 })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <div className="control">
        <Button auto type="secondary-light"
          onClick={() => {
            setKey(prevkey => prevkey + 1)
          }}
        >
          重制
        </Button>
        <Button auto type="success-light"
          onClick={async () => {
            setIsPlaying(!isPlaying)
            // await notification.requestPermission()
            notify()
          }}
        >
          {isPlaying ? '暂停' : '继续'}
        </Button>

      </div>
      <div className='step'>
        <Slider
          step={10}
          max={60}
          min={10}
          initialValue={20}
          showMarkers={true}
          onChange={(value) => {
            setDuration(value)
          }}
        />
      </div >
    </div >
  )
}

function notify() {
  new Notification("Notification title", {
    body: "This is the notification body",
  })
}


export default App
