import { useState, useEffect, useRef } from 'react'
import { Lock, Globe, ChevronDown } from 'lucide-react'
import './PrivacyToggle.css'

const options = [
  { label: 'Private', icon: Lock },
  { label: 'Public', icon: Globe },
]

export default function PrivacyToggle() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('Private')
  const [switching, setSwitching] = useState(false)
  const containerRef = useRef(null)

  const ActiveIcon = options.find((o) => o.label === selected).icon

  function handleSwitch(label) {
    setOpen(false)
    if (label === selected) return

    setSelected(label)
    setSwitching(true)
    setTimeout(() => setSwitching(false), 150)
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="privacy-toggle-page">
      <div
        ref={containerRef}
        className={`privacy-container${open ? ' open' : ''}`}
      >
        {/* Floating modal */}
        <div className={`privacy-modal${open ? ' active' : ''}`}>
          {options.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="privacy-option"
              onClick={() => handleSwitch(label)}
            >
              <Icon size={20} className="privacy-option-icon" />
              {label}
            </button>
          ))}
        </div>

        {/* Main trigger button */}
        <button
          className="privacy-main-button"
          onClick={(e) => {
            e.stopPropagation()
            setOpen((prev) => !prev)
          }}
        >
          <div className="privacy-button-content">
            <div className={`privacy-active-icon${switching ? ' switching' : ''}`}>
              <ActiveIcon size={20} />
            </div>
            <span className="privacy-active-text">{selected}</span>
          </div>
          <ChevronDown
            size={18}
            className="privacy-chevron"
            strokeWidth={3}
          />
        </button>
      </div>
    </div>
  )
}
