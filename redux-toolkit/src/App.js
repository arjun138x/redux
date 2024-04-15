import mobileData from "./data.json";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, removeProduct } from "./redux/reducer/cartSlice";
/**
 * redux toolkit has three major things
 *
 * 1. store
 * 2. createSlice(Actions+ReduceA)
 * 3. use state values and dispatch
 *
 */

const MobileCard = ({ product, onclickAdd, onclickRemove }) => {
  const { Brand, Model, Price } = product;
  return (
    <div className="bg-white w-1/4 h-52	 m-2 p-2 rounded">
      <p className="font-bold"> Brand: {Brand}</p>
      <p>Model: {Model}</p>
      <p className="font-bold">Price: {Price}</p>
      <div className="m-x-2">
        <button
          onClick={() => onclickAdd(product)}
          className="bg-blue-500 rounded p-1 text-white hover:bg-blue-700 me-2"
        >
          Add
        </button>
        <button
          onClick={() => onclickRemove(product)}
          className="bg-red-500 rounded p-1 text-white hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};
function App() {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const onclickAdd = (data) => dispatch(addProduct(data));

  const onclickRemove = (data) => dispatch(removeProduct(data));

  return (
    <div className="bg-red-200 min-h-screen p-2">
      <div className="bg-red-300 flex p-2 justify-center">
        <p className="font-bold me-4">Products: {cartProducts.length}</p>
        <p className="font-bold">
          Amount: {cartProducts.reduce((a, c) => a + c.Price, 0)}
        </p>
      </div>

      <div className="flex">
        {mobileData.map((data) => (
          <MobileCard
            product={data}
            key={data.Model}
            onclickAdd={onclickAdd}
            onclickRemove={onclickRemove}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
