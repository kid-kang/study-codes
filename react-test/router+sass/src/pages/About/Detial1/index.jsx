import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Detail1() {
  let [id, setId] = useState('')
  const nvigate = useNavigate()

  function goDetail2() {
    if(id === "") return
    nvigate(`/about/detail2/${id}`)
  }
  return (
    <div>
      <p>我是Detail1</p>
      <input type="text" onChange={(e) => setId(e.target.value)} />
      <button onClick={goDetail2}>携带参数去Detail2</button>
    </div>
  )
}
