import React, { useState, useCallback, useContext } from 'react';
import { Link, useHistory } from "react-router-dom";
import logo from './star-wars-logo.png';
import './index.css';
import { HiSearch } from "react-icons/hi";
import { IoIosClose } from "react-icons/io"
import { AppContext } from "../../Context/AppContextProvider"
import axios from "axios"
import { useKeyDown, useKeyUp, useEnter } from "../../Custom_Hooks/hooks"

function HomePage() {

      const [str, setStr] = useState("")
      const { state, setState } = useContext( AppContext ) 
      const [count, setCount ] = useState(-1)
      const history = useHistory()
      
      //  handle for down arrow key press
      const handleDown=()=>{
        if(state.results.length >count)
        {
          setCount(prev =>prev = prev+1)
        }
      }

      //  handle for up arrow key press
      const handleUp=()=>{
        
        if(count !==-1)
        {
          setCount(prev =>prev = prev-1)
        }
      }
      
      //  handle for Enter key press
      const handleEnter=()=>{
        let id = state.results[count]?.url.split("/")[5]
        history.push(`person/${ id }`)
      }
      
      useKeyDown("ArrowDown", handleDown)
      useKeyUp("ArrowUp", handleUp)
      useEnter("Enter", handleEnter)

      const handleClose = () =>{
        setStr("")
      }

      const debounce=(func)=>{
         let timer
         return function(e) {
          let arg  = e.target.value
          
          if(timer)
          {
            clearTimeout(timer)
          }
          timer = setTimeout(()=>{

            func(arg)
          },500)
        }
      }

      const handleChange = (event)=>{
        setStr(event)
        if(event !=="")
        {
          setState({...state,isLoading:true})
          axios.get(`https://swapi.dev/api/people/?search=${event}`)
          .then(res =>{
          setState({...state, ...res.data,isLoading:false})

        })
        }
      }

      const opt = useCallback(debounce((e) => handleChange(e)),[]);
    

  return (
    <div>

      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
      
      <div className="searchBox">
        <div className="searchBox__main">
            <input className = "searchInput" type="text" placeholder = "Search by name"   onKeyUp ={ (e)=>opt(e) } />
            
            {/* close  */}
            { str && ( <span className="searchBox__close" onClick={ handleClose }> <IoIosClose style={{cursor:"pointer"}}/> </span>) }
            
            {/* search button */}
            {state.isLoading ? <div className="searchBox__loader"></div> : <button className="searchBtn" > <HiSearch /></button>}

        </div>

          {/* search results */}
        
          <div className="searchBox__results" style={str == false ? {display:"none"}:{display:"block"}}>

            {
              state?.results?.map((item,ind) => (

                <Link key = { ind } to = { `/person/${ item.url.split("/")[5] }` } className="searchBox__link">

                  <div  style = { count ==ind?{backgroundColor:"#ffffcc",color:"black"  }:null}>

                    <div>
                        <h4> { item.name }
                            <p className="searchBox__results__birthyear"> { item.birth_year } </p>
                        </h4>
                    </div>

                    <div>
                        <p className="searchBox__results__gender">{item.gender}</p>
                    </div>

                  </div>
              </Link>)
              )
            }
          </div>
      </div>
    </div>
  );
}

export default HomePage;
