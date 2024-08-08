import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { FaArrowRight } from 'react-icons/fa';

const Login = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(formData));
    }

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
    }, [auth, navigate]);

    return (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-zinc-950 p-10 rounded-xl shadow-2xl">
                <div>
                    <div className="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80" color="#ffff" fill="none">
                            <path d="M2.9668 10.4961V15.4979C2.9668 18.3273 2.9668 19.742 3.84548 20.621C4.72416 21.5001 6.13837 21.5001 8.9668 21.5001H14.9668C17.7952 21.5001 19.2094 21.5001 20.0881 20.621C20.9668 19.742 20.9668 18.3273 20.9668 15.4979V10.4961" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M14.9668 16.9932C14.2827 17.6004 13.1936 17.9932 11.9668 17.9932C10.74 17.9932 9.65089 17.6004 8.9668 16.9932" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M10.1038 8.41848C9.82182 9.43688 8.79628 11.1936 6.84777 11.4482C5.12733 11.673 3.82246 10.922 3.48916 10.608C3.12168 10.3534 2.28416 9.53872 2.07906 9.02952C1.87395 8.52032 2.11324 7.41706 2.28416 6.96726L2.96743 4.98888C3.13423 4.49196 3.5247 3.31666 3.92501 2.91913C4.32533 2.5216 5.13581 2.5043 5.4694 2.5043H12.4749C14.2781 2.52978 18.2209 2.48822 19.0003 2.50431C19.7797 2.52039 20.2481 3.17373 20.3848 3.45379C21.5477 6.27061 22 7.88382 22 8.57124C21.8482 9.30456 21.22 10.6873 19.0003 11.2955C16.6933 11.9275 15.3854 10.6981 14.9751 10.2261M9.15522 10.2261C9.47997 10.625 10.4987 11.4279 11.9754 11.4482C13.4522 11.4686 14.7273 10.4383 15.1802 9.92062C15.3084 9.76786 15.5853 9.31467 15.8725 8.41848" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Login to your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-orange-400 hover:text-orange-300 transition duration-150 ease-in-out">
                            Create a free account
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px ">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm bg-zinc-900"
                                placeholder="Email address"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm bg-zinc-900"
                                placeholder="Password"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-black bg-orange-400 hover:bg-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <FaArrowRight className="h-5 w-5 text-orange-600 group-hover:text-orange-700" aria-hidden="true" />
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;