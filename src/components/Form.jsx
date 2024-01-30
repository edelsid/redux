import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { addAction, editAction, recallEdit } from "../store/slice";

export function Form() {
   const dispatch = useDispatch();
   const redInAction = useSelector(state => state.todos.red);
   const chosenPost = useSelector(state => state.todos.chosenPost);
   const [data, setData] = useState({
      action: '',
      cost: '',
   });

   useEffect((() => {
      if (redInAction) {
         setData({action: chosenPost.action, cost: chosenPost.cost});
      }
   }), [redInAction, chosenPost.action, chosenPost.cost]);

   const {action, cost} = data;

   const submitChange = (e) => {
      e.preventDefault();
      setData({action: '', cost: ''});
      if (redInAction) {
         dispatch(editAction({data}));
      } else {
         dispatch(addAction({data}));
      }
   }

   const inputChange = (e) => {
      const {name, value} = e.target;
      setData ((prevForm) => ({
         ...prevForm,
         action: name === 'action' ? value : prevForm.action,
         cost: name === 'cost' ? value : prevForm.cost,
      }));
   }

   const recall = () => {
      setData({action: '', cost: ''});
      dispatch(recallEdit());
   }

   return (
      <form className="form" onSubmit={submitChange}>
         <input 
            className="field"
            id="action"
            name="action"
            value={action}
            onChange={inputChange}
            type="text">
         </input>
         <input 
            className="field"
            id="cost"
            name="cost"
            value={cost}
            onChange={inputChange}
            type="number">
         </input>
         <button className="btn formBtn" type="submit">Save</button>
         {redInAction && <button className="btn formBtn" type="button" onClick={recall}>Cancel</button>}
      </form>
   )
}
