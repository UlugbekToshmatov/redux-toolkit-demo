import { clearCart } from "../redux/cartSlice";
import { closeModal } from "../redux/modalSlice";
import { useDispatch } from "react-redux";

export default function Modal() {
  const dispatch = useDispatch();

  function handleModalConfirmBtn() {
    dispatch(clearCart());
    dispatch(closeModal());
  }

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Remove all items from your shopping cart?</h4>
        <div className="btn-container">
          <button className="btn confirm-btn" onClick={handleModalConfirmBtn}>
            Confirm
          </button>
          <button className="btn clear-btn" onClick={() => dispatch(closeModal())}>
            Cancel
          </button>
        </div>
      </div>
    </aside>
  )
}