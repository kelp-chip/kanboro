import "../styles/Modal.scss";
function Modal({ task }) {
  return (
    <>
      <div className="overlay"></div>
      <div id="modal"></div>
    </>
  );
}

export default Modal;
