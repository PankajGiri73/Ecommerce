import React from 'react';
import { useSelector } from 'react-redux';
import { MdOutlineMailOutline, MdPerson } from 'react-icons/md';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <div className="bg-white shadow-2xl rounded-lg overflow-hidden max-w-4xl mx-auto">
                    <div className="md:flex select-none">
                        <div className="md:flex-shrink-0">
                            <img
                                className="h-full w-full object-cover md:w-48"
                                src={`${import.meta.env.VITE_API_URI}/${user?.userImage}`}
                                alt={`${user?.name || user?.FirstName}`}
                            />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                {user?.role}
                            </div>
                            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                {user?.name}
                            </h1>
                            <div className="mt-4 flex items-center text-gray-600">
                                <MdOutlineMailOutline className="flex-shrink-0 mr-2 h-5 w-5" />
                                <a href={`mailto:${user?.email}`} className="text-blue-600 hover:underline">
                                    {user?.email}
                                </a>
                            </div>
                            <div className="mt-4 flex items-center text-gray-600">
                                <MdPerson className="flex-shrink-0 mr-2 h-5 w-5" />
                                <span>{user?.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;