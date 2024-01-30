import { useDispatch } from 'react-redux'
import { removeAction } from '../store/slice';

export function Entry({ item, red }) {
  const dispatch = useDispatch();
  const {action, cost, id} = item;

  return (
    <li className="entry">
      <p className="action">{action}</p>
      <p className="cost">{cost}</p>
      <button className="btn red" onClick={() => red(id)}></button>
      <button className="btn del" onClick={() => dispatch(removeAction({id}))}></button>
    </li>
  )
}
