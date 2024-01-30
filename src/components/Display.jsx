import { Entry } from "./Entry";
import { useDispatch, useSelector } from "react-redux";
import { editAction, searchPosts } from "../store/slice";
import { useState, useEffect } from "react";

export function Display() {
   const dispatch = useDispatch();
   const actions = useSelector(state => state.todos.actions);
   const [query, setQuery] = useState('');

   const inputChange = (e) => {
      setQuery(e.target.value);
   }

   useEffect(() => {
      dispatch(searchPosts({query}));
   }, [query, dispatch]);

   const red = (id) => {
      dispatch(editAction({id}));
   }

   return (
      <div className="main">
         <form className="search">
            <label className="label">Search</label>
            <input 
               className="field"
               id="search"
               name="search"
               value={query}
               onChange={inputChange}>
            </input>
         </form>
         <ul className="display">
            {actions.map((item) => (
               <Entry item={item} key={item.id} red={red}></Entry>
            ))}
         </ul>
      </div>
   )
}
