import Auth from "../components/Auth";

function Login({ setUserData }) {
  return (
    <div>
      <Auth setUserData={setUserData} />
    </div>
  );
}

export default Login;
