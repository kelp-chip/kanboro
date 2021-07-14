import Auth from "../components/Auth";

function Login({ setUserData, getLists, setPage }) {
  return (
    <div>
      <Auth setUserData={setUserData} getLists={getLists} setPage={setPage} />
    </div>
  );
}

export default Login;
