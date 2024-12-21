import axios from "axios";
import { useState } from "react";

interface CreateOrganizationProps {
    onClose: () => void;
    setShowCreateForm: (show: boolean) => void;
}

export default function CreateOrganization({ onClose, setShowCreateForm }: CreateOrganizationProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setMessage('');
            setError('');
            setLoading(true);
            const endpoint = import.meta.env.VITE_API_URL;
            const response =await axios.post(`${endpoint}/api/v1/admin/organizations`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            setMessage(response?.data.message);
            setFormData({ name: '', description: '' });
            setTimeout(()=>{
                setMessage('');
                setShowCreateForm(false);
            },3000)
        } catch (err: any) {
            setError(err.response?.data.message || 'Failed to create organization');
        } finally {
            setLoading(false);

        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg relative">
                <button
                    onClick={() => setShowCreateForm(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                
                <h2 className="text-2xl font-bold mb-6">{loading ? "Loading..." : "Create Organization"}</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Organization Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required
                            rows={4}
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Create Organization
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowCreateForm(false)}
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                            Cancel
                        </button>
                       
                    </div>
                    {message && (
                            <div className="mt-4 p-3  text-green-700 rounded text-center">
                                {message}
                            </div>
                        )}
                </form>
            </div>
        </div>
    );
}