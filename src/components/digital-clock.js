'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

export default function DigitalClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="flex items-center gap-4">
      <Clock className="w-8 h-8 text-primary" />
      <div>
        <div className="text-4xl font-bold text-foreground tabular-nums">
          {formatTime(time)}
        </div>
        <div className="text-lg text-muted-foreground">
          {formatDate(time)}
        </div>
      </div>
    </div>
  )
}