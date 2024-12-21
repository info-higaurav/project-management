import {useState } from "react";
import CreateOrganization from "../create-orgnization";
import useGetNetwork from "@/utils/hooks/useNetwork/useGetNetwork";

export default function Organization() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [loading, error, message, data] = useGetNetwork(`/api/v1/admin/organizations`);

    if(loading) return <div>Loading...</div>
   
    return (
        <div className="p-4 relative">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Organizations</h1>
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

            {data?.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    There is no organization
                </div>
            ) : (
                <div className="grid gap-4">
                    {data?.map((org) => (
                        <div 
                            key={org.id} 
                            className="border rounded p-4 flex justify-between items-center"
                        >
                            <div>
                                <h2 className="font-semibold text-lg">{org.name}</h2>
                                <p className="text-gray-600">Manager: {org.managerName}</p>
                                <p className="text-gray-500 text-sm">
                                    Created at: {new Date(org.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}