import styles from "./AlertMessage.module.scss";
import { useContext } from "react";
import { AlertContext } from "../../context/AlertContext";
export default function AlertMessage() {
  const { alert, setAlert } = useContext(AlertContext);

  const handleAlert = async () => {
    await setAlert("kg_usagi account has been created");
    await setTimeout(() => setAlert(null), 3000);
  };

  return (
    <>
      <button onClick={() => setAlert(handleAlert)}></button>
      <div
        className={`${styles.wrapper}`}
        styles={{ animate: `${alert ? styles.slide : styles.slideAway} 3s` }}
      >
        <h5>{alert}</h5>
      </div>
    </>
  );
}
