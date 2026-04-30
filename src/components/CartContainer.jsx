import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { openModal } from "../redux/modalSlice";

export default function CartContainer() {
  const dispatch = useDispatch();
  const { cartItems, amount, total } = useSelector(store => store.cart);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  const cartElements = cartItems.map(cartItem => {
    return (
      <CartItem
        key={cartItem.id}
        {...cartItem}
      />
    );
  });

  return (
    <section className="cart">
      <header>
        <h2>Your bag</h2>
      </header>
      <div>{cartElements}</div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>Total <span>${total.toFixed(2)}</span></h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
          Clear cart
        </button>
      </footer>
    </section>
  );
}
