import { useState } from "react"
import './index.css'
import avatar from './images/avatar.png'
import { nanoid } from "nanoid"

function App () {
  // 假设这是后端传来的数据
  const [state, setState] = useState({
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot'
      },
      {
        id: 2,
        name: '时间',
        type: 'time'
      }
    ],
    active: 'hot',
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1
      }
    ]
  })

  let [comment, setComment] = useState("")

  function changeActive (newActive) {
    setState({ ...state, active: newActive })
  }
  function formatTime (data) {
    return `${data.getFullYear()}-${data.getMonth() + 1}-${data.getDate()}`
  }
  function changeComment (e) {
    setComment(e.target.value)
  }
  function addList () {
    setState({
      ...state, list: [...state.list, {
        id: nanoid(),
        author: 'wzk',
        comment,
        time: new Date(),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1
      }]
    })
    setComment("")
  }
  function deleteList (id) {
    setState({
      ...state, list: state.list.filter(val => {
        return val.id !== id
      })
    })
  }
  function changeLike (id) {
    setState({
      ...state, list: state.list.map(val => {
        if (val.id === id) {
          let cur = val.attitude
          return {
            ...val,
            attitude: cur !== 1 ? 1 : 0
          }
        } else {
          return val
        }
      })
    })
  }
  function changeHate (id) {
    setState({
      ...state, list: state.list.map(val => {
        if (val.id === id) {
          let cur = val.attitude
          return {
            ...val,
            attitude: cur !== -1 ? -1 : 0
          }
        } else {
          return val
        }
      })
    })
  }

  return (
    <div className="App">
      <div className="comment-container">
        {/* 评论数 */}
        <div className="comment-head">
          <span>{state.list.length}评论</span>
        </div>
        {/* 排序 */}
        <div className="tabs-order">
          <ul className="sort-container">
            {state.tabs.map(val => (
              <li key={nanoid()} className={val.type === state.active ? "on" : ""} onClick={() => changeActive(val.type)}>
                按{val.name}排序
              </li>
            ))}
          </ul>
        </div>

        {/* 添加评论 */}
        <div className="comment-send">
          <div className="user-face">
            <img className="user-head" src={avatar} alt="" />
          </div>
          <div className="textarea-container">
            <textarea
              cols="80"
              rows="5"
              placeholder="发条友善的评论"
              className="ipt-txt"
              value={comment}
              onChange={(e) => changeComment(e)}
            />
            <button className="comment-submit" onClick={addList}>发表评论</button>
          </div>
          <div className="comment-emoji">
            <i className="face"></i>
            <span className="text">表情</span>
          </div>
        </div>

        {/* 评论列表 */}
        <div className="comment-list">
          {
            state.list.map(val => (
              <div className="list-item" key={nanoid()}>
                <div className="user-face">
                  <img className="user-head" src={avatar} alt="" />
                </div>
                <div className="comment">
                  <div className="user">{val.author}</div>
                  <p className="text">{val.comment}</p>
                  <div className="info">
                    <span className="time">{formatTime(val.time)}</span>
                    <span className={val.attitude === 1 ? "like liked" : "like"}>
                      <i className="icon" onClick={() => changeLike(val.id)} />
                    </span>
                    <span className={val.attitude === -1 ? "hate hated" : "hate"}>
                      <i className="icon" onClick={() => changeHate(val.id)} />
                    </span>
                    <span className="reply btn-hover" onClick={() => deleteList(val.id)}>删除</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App
