import {useState } from "react";
import CreateOrganization from "../create-orgnization";
import useGetNetwork from "@/utils/hooks/useNetwork/useGetNetwork";
import { Loader } from "@/helper/loader";

export default function Organization() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    // @ts-ignore
    const [loading, error, message, data] = useGetNetwork(`/api/v1/admin/organizations`);

    if(loading) return <Loader/>

    return (
        <div className="p-4 relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Organizations</h1>
                <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => setShowCreateForm(true)}
                >
                    Create Organization
                </button>
            </div>

            {showCreateForm && (
                <div className="fixed inset-0 z-50">
                    <CreateOrganization 
                        onClose={() => setShowCreateForm(false)}
                        setShowCreateForm={setShowCreateForm}
                    />
                </div>
            )}
            {/* @ts-ignore */}
            {!data || data.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    There is no organization
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* @ts-ignore */}
                    {data?.map((org:any) => (
                        <div 
                            key={org._id}
                            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl overflow-hidden border border-gray-700/30 hover:border-gray-600/50 shadow-lg hover:shadow-2xl transition-all duration-300 group"
                        >
                            <div className="px-6 py-5 border-b border-gray-700/30 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-bold text-xl text-gray-100 truncate group-hover:text-blue-400 transition-colors">{org.organizationName}</h2>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-gray-700/40 rounded-full transition-colors">
                                            <svg className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                        <button className="p-2 hover:bg-gray-700/40 rounded-full transition-colors">
                                            <svg className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <p className="mt-3 text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">{org.organizationDescription}</p>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-gray-800/30 to-gray-900/30">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-gray-700/30">
                                            <span className="text-white font-semibold">
                                                {org.organizationName[0].toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Created by</p>
                                            <p className="text-gray-300 font-medium">{org?.createdBy?.firstName} {org?.createdBy?.lastName}</p>
                                        </div>
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[1,2,3].map((_, i) => (
                                            <div key={i} className="w-8 h-8 rounded-full ring-2 ring-gray-800 bg-gradient-to-br from-gray-700 to-gray-600"></div>
                                        ))}
                                        <div className="w-8 h-8 rounded-full ring-2 ring-gray-800 bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                                            <span className="text-xs text-gray-300">+5</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm border-t border-gray-700/30 pt-4">
                                    <div className="flex items-center text-gray-500 hover:text-gray-300 transition-colors">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(org.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center text-gray-500 hover:text-gray-300 transition-colors">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            8 members
                                        </span>
                                        <span className="flex items-center text-gray-500 hover:text-gray-300 transition-colors">
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            5 projects
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}