import { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import styles from "./UserSettings.module.scss";
import { UserContext } from "context/UserContext";
import axios from "axios";
import userRoutes from "api/userRoutes";
import backgrounds from "images/backgrounds";
import { useHistory } from "react-router-dom";

function UserSettings() {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [img, setImg] = useState(user.background_url);
  const [intervalTime, setIntervalTime] = useState(user.interval_time);
  const [shortBreak, setShortBreak] = useState(user.short_break_time);
  const [longBreak, setLongBreak] = useState(user.long_break_time);
  const [alarmSound, setAlarmSound] = useState(user.alarm_sound);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSrc, setPreviewSrc] = useState(user.avatar_url);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar_url);
  const [successMessage, setSuccessMessage] = useState("");

  const backgroundPreviews = Object.keys(backgrounds).map((key) => {
    return (
      <img
        src={backgrounds[key]}
        alt={key}
        onClick={(e) => setPrevImage(e, key, backgrounds[key])}
      ></img>
    );
  });

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    await previewImage(file);
    await setSelectedFile(file);
    await setFileInputState(e.target.value);
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSrc(reader.result);
    };
  };

  function setPrevImage(e, i, url) {
    setImg(url);
    document.body.style.backgroundImage = `url(${url})`;
    e.target.parentElement
      .querySelectorAll(".chosen")
      .forEach((e) => e.classList.remove("chosen"));
    e.target.classList.add("chosen");
  }

  async function uploadImage(file, cb) {
    const URL = `${process.env.REACT_APP_SERVER_URL}/api/upload`;
    const DATA = { data: file, id: user.id };
    const { data } = await axios.post(URL, DATA);
    cb(data);
  }

  async function handleImageSubmit(e, cb) {
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result, cb);
    };
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      await handleImageSubmit(e, async (avatar) => {
        let updatedAttributes = {
          interval_time: intervalTime,
          short_break_time: shortBreak,
          long_break_time: longBreak,
          alarm_sound: alarmSound,
          background_url: img,
          avatar_url: avatar,
        };

        const res = await userRoutes.patchUser(user.id, updatedAttributes);
        await setUser(res.user);
        localStorage.setItem("accessToken", res.accessToken);
        await setSelectedFile("");
        history.push("/dashboard");
      });
    } else {
      let updatedAttributes = {
        interval_time: intervalTime,
        short_break_time: shortBreak,
        long_break_time: longBreak,
        alarm_sound: alarmSound,
        background_url: img,
      };

      const res = await userRoutes.patchUser(user.id, updatedAttributes);
      await setUser(res.user);
      await setSuccessMessage("Changes saved!");
      history.push("/dashboard");
      localStorage.setItem("accessToken", res.accessToken);
    }
    //changing user in server but not applying changes unless you logout and log back in
  };

  return (
    <main className={styles.container}>
      <h2>User Settings</h2>
      <form className={styles.settingsForm} onSubmit={handleFormSubmit}>
        {/* <div>
          <label htmlFor="alarm">alarm sound</label>
          <input
            id="alarm"
            type="text"
            value={alarmSound}
            onChange={(e) => {
              setAlarmSound(e.target.value);
            }}
          ></input>
        </div> */}
        <article>
          <h4 className={styles.sectionTitle}>upload an avatar image</h4>
          <div>
            <input
              className={styles.avatarInput}
              id="avatar"
              alt="upload an avatar"
              type="file"
              value={fileInputState}
              onChange={handleFileInputChange}
            ></input>
            {previewSrc && (
              <section>
                <div className="avatarContainer">
                  <img src={previewSrc} alt="chosenImage" width="30px" />
                </div>
              </section>
            )}
          </div>
        </article>
        <h4 className={styles.sectionTitle}>change interval times</h4>
        <article className={styles.timerSection}>
          <div>
            <label htmlFor="intervalTime">pomodoro time</label>
            <input
              id="intervalTime"
              type="number"
              min="1"
              max="120"
              value={intervalTime}
              onChange={(e) => {
                setIntervalTime(Number(e.target.value));
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="shortBreak">short break</label>
            <input
              id="shortBreak"
              type="number"
              min="1"
              max="120"
              value={shortBreak}
              onChange={(e) => {
                setShortBreak(Number(e.target.value));
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="longBreak">long break</label>
            <input
              id="longBreak"
              type="number"
              min="1"
              max="120"
              value={longBreak}
              onChange={(e) => {
                setLongBreak(Number(e.target.value));
              }}
            ></input>
          </div>
        </article>

        <article>
          <h4 className={styles.sectionTitle}>choose a background image</h4>
          <div className={styles.bgPreviews}>{backgroundPreviews}</div>
        </article>
        <input type="submit" value="Save Changes"></input>
        <article>{successMessage && successMessage}</article>
      </form>
    </main>
  );
}

export default withRouter(UserSettings);
