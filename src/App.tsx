import { useState } from 'react'
import CSS from 'csstype'
import './App.css'

const textAreaStyle: CSS.Properties = {
  minHeight: '15em',
  minWidth: '15em',
  backgroundColor: 'black',
  color: 'white',
  outline: 'none',
  margin: '10px',
}

const mainDiv: CSS.Properties = {
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
const button: CSS.Properties = {
  color: '#0099CC',
  backgroundColor: 'transparent',
  border: '2px solid #0099CC',
  borderRadius: '5px',
  textTransform: 'uppercase',
  padding: '5px 10px',
  margin: '20px 0',
}
function parser(text: string): string {
  try {
    try {
      const isJson = JSON.parse(text)
      if (isJson) return JSON.stringify(isJson, null, 2)
    } catch (error) {
      // basically do nothing
    }
    const result: any = {}
    text.split('\n').forEach((line) => {
      if (!line) return
      const [key, ...splitValue] = line.split(':')
      const value = splitValue.join(':')
      result[key.trim()] = value.trim()
    })

    return JSON.stringify(result, null, 2)
  } catch (e) {
    return 'invalid input'
  }
}

function copy(text: string): void {
  let textArea = document.createElement('textarea')
  textArea.value = text

  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand('copy')
    const msg = successful ? 'successful' : 'unsuccessful'
    document.body.removeChild(textArea)
    alert(msg)
  } catch (err) {
    console.error(err)
    alert('unable to copy')
  }
}

function App() {
  const initialValue = 'you:cutie\nI:like you\n\nso: take care'
  const [text, setText] = useState(parser(initialValue))
  return (
    <div style={mainDiv}>
      <div>
        <div>
          <textarea
            style={textAreaStyle}
            onChange={(event) => setText(parser(event.target.value))}
            onFocus={(event) => {
              if (event.target.value === initialValue) {
                event.target.value = ''
                setText('{}')
              }
            }}
          >
            {initialValue}
          </textarea>
        </div>
        <div>
          <textarea id="result" value={text} style={textAreaStyle}></textarea>
        </div>
        <div style={mainDiv}>
          <button style={button} onClick={() => copy(text)}>
            Copy Result
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
