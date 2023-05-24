import { useParams } from 'react-router-dom'

export default function Detail2() {
  let params = useParams()
  return <div>Detail{params.id}</div>
}
