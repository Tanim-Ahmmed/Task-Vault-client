import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const { userLogin, setUser, handleGoogleLogin } = useContext(AuthContext);
  const [err, setErr] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    userLogin(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error(` login failed! please try again. `, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };

  const handleLoginWithGoogle = () => {
    handleGoogleLogin()
      .then((res) => {
        const user = res.user;
        setUser(user);
        const userInfo = {
          uid: res.user?.uid,
          name: res.user?.displayName,
          email: res.user?.email,
        }

        axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data);
          navigate(location?.state ? location.state : "/");
          toast.success("Welcome ! SignIn with Google successfull ", {
            position: "top-center",
            autoClose: 3000,
          });  
        })

      })
      .catch((error) => {
        setErr(error.code);
      });
  };
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="text-gray-600 mt-2">Please sign in to your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                required
                name="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                required
                name="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>

            <div>
              {err && <p className="text-red-500 text-center">{err}</p>}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>

          <div
            onClick={handleLoginWithGoogle}
            className="flex mt-4 justify-center rounded-lg items-center gap-4 border py-3 w-full sm:w-10/12 mx-auto font-medium text-indigo-600 hover:text-indigo-500 hover:bg-purple-100 hover:cursor-pointer"
          >
            <FcGoogle />
            <button> Sign in with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
