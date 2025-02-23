import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const [err, setErr] = useState("");
  const { createUser, setUser, updateUsersProfile, handleGoogleLogin } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    const user = { name, email, password, confirm };
    console.log(user);

    if (password.length < 6) {
      setErr("Passward must contain atleast 6 character.");
      return;
    }

    if (password !== confirm) {
      setErr("Passward didn't match");
      return;
    }

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);

        updateUsersProfile({ displayName: name })
          .then((res) => {
            const userInfo = {
              uid: user?.uid,
              name: user?.displayName,
              email: user?.email,
            };
            axiosPublic.post("/users", userInfo).then((res) => {
              if (res.data.insertedId) {
                navigate("/");
                toast.success("Welcome ! Your Sign up successfull ", {
                  position: "top-center",
                  autoClose: 3000,
                });
              }
            });
          })
          .catch((error) => {
            setErr(error.message);
          });
      })
      .catch((error) => {
        setErr(error.code);
      });
  };

  const handleLoginWithGoogle = () => {
    handleGoogleLogin().then((res) => {
      const user = res.user;
      setUser(user);
      const userInfo = {
        uid: res.user?.uid,
        name: res.user?.displayName,
        email: res.user?.email,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
        toast.success("Welcome ! SignIn with Google successfull ", {
          position: "top-center",
          autoClose: 3000,
        });
      });
    });
  };
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Create an Account
            </h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full name
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
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
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm password
              </label>
              <input
                name="confirm"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>

            <div>
              {err && <p className="text-red-500 text-center">{err}</p>}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-[1.02] transition-all"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
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

export default Register;
