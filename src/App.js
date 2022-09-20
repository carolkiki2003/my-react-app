import './App.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const {useState}=React

// InputBox
function InputBox({list,setList}){
  const [item,setItem]=useState("")
  function submitInputItem(){
    if(item.trim()!==''){
      setList([...list,{id:list.reduce((pre,current)=>Math.max(current.id,pre),0)+1,title:item,completed:false}])
      setItem('')
    }else{
      window.alert('代辦事項不能為空白')
    }
  }
  return (
    <div className="inputBox">
      <input type="text" value={item} onChange={(e)=>{setItem(e.target.value)}} placeholder="請輸入待辦事項"/>
      <a onClick={()=>submitInputItem()}><FontAwesomeIcon icon='plus' /></a>
    </div>)
}

// Item
function Item({id,title,completed,list,setList}){
  function removeItem({id}){
      list.forEach((el,idx)=>{
          if(el.id === id) {
          list.splice(idx, 1);
        }
      })
    setList([...list])
  }
  function completedItem({id}){
      list.forEach((el,idx)=>{
          if(el.id === id) {
          el.completed=!el.completed
        }
      })
    setList([...list])
  }
  return(
    <li>
      <label className="todoList_label">
        <input className="todoList_input" type="checkbox" checked={completed} onChange={()=>completedItem({id})}/>
        <span>{title}</span>
      </label>
      <a href="#" onClick={()=>removeItem({id})}>
      <FontAwesomeIcon icon='times' />
      </a>
    </li>)
}

// ItemList
function ItemList({renderList,list,setList,beCompletedNum,tab}){
    function removeCompletedItem({list}){
      const newList=list.filter(el=>el.completed === false)
      setList([...newList])
    }
    return(
        <div className="todoList_items">
        {beCompletedNum===0 && tab==='beCompleted'?<div className="info">
          目前尚無代辦事項
        </div>:<ul className="todoList_item">
          { renderList.map((item,idx)=>{ return <Item key={item.id} id={item.id} list={list} title={item.title} completed={item.completed} setList={setList}/> })}
        </ul>}
        <div className="list_footer">
            <span>{beCompletedNum}個待完成項目</span>
            <a onClick={()=>removeCompletedItem({list})}>清除已完成項目</a>
        </div>
      </div>
    )
}

function App() {
    const [tab,setTab]=useState('all')
    const [list,setList]=useState([
      {id:1,title:'洗臉',completed:false},
      {id:2,title:'刷牙',completed:false},
      {id:3,title:'吃早餐',completed:false},
      {id:4,title:'上班',completed:false}
      ])
    const beCompletedNum=list.filter(el=>el.completed===false).length
    function filterList({list}){
      if(tab==='beCompleted'){
        return list.filter(el=>el.completed===false)
      }
      else if (tab==='completed'){
        return list.filter(el=>el.completed===true)
      }else{
        return list
      }
    }
    return(
      <>
        <nav>
              <h1><a href="#">ONLINE TODO LIST</a></h1>         
          </nav>
          <div className="conatiner todoListPage vhContainer">
              <div className="todoList_Content">
                  <InputBox list={list} setList={setList} />
                  <div className="todoList_list">
                      <ul className="todoList_tab">
                          <li><a href="#" onClick={()=>{setTab('all')}} className={tab==='all'?'active':''}>全部</a></li>
                          <li><a href="#" onClick={()=>{setTab('beCompleted')}} className={tab==='beCompleted'?'active':''}>待完成</a></li>
                          <li><a href="#" onClick={()=>{setTab('completed')}} className={tab==='completed'?'active':''}>已完成</a></li>
                      </ul>
                    <ItemList renderList={filterList({list})} list={list} setList={setList} beCompletedNum={beCompletedNum} tab={tab}/>
                  </div>
              </div>
          </div>
      </>
    )
}

export default App;
