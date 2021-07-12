import Auth from "../components/Auth";

function Login({ setUserData, getLists }) {
  return (
    <div>
      <Auth setUserData={setUserData} getLists={getLists} />
    </div>
  );
}

export default Login;
