
import CreateProject from "../create-project";

export default function Project({userRole}:{userRole:string}) {
  
    const projects = [
        {
            id: 1,
            title: "Website Redesign",
            description: "Complete overhaul of company website with modern design and improved user experience. Implementing new features and optimizing performance across all devices.",
            startDate: "2024-01-15", 
            endDate: "2024-03-30",
            createdAt: "2024-01-10",
            status: "In Progress",
            progress: 65
        },
        {
            id: 2,
            title: "Mobile App Development", 
            description: "Building a new mobile app for customer engagement with real-time notifications, user analytics, and seamless payment integration.",
            startDate: "2024-02-01",
            endDate: "2024-05-31",
            createdAt: "2024-01-25",
            status: "Planning",
            progress: 20
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br bg-black/10 backdrop-blur-xl p-6 rounded-2xl  border-white/10">
           
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Projects</h1>
                    {userRole === "admin" && <CreateProject />}
                </div>

                <div className="flex flex-col gap-6">
                    {projects.map(project => (
                        <div 
                            key={project.id} 
                            className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/10 p-6 w-full hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                                        <span className={`px-3 py-1 rounded-full text-sm text-white ${
                                            project.status === "In Progress" 
                                                ? "bg-gradient-to-r from-blue-500/30 to-blue-600/30" 
                                                : "bg-gradient-to-r from-purple-500/30 to-purple-600/30"
                                        }`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    
                                    <p className="text-white/70 text-sm mb-4">
                                        {project.description.length > 150 
                                            ? `${project.description.substring(0, 150)}...` 
                                            : project.description}
                                        {project.description.length > 150 && (
                                            <button className="text-purple-400 hover:text-purple-300 ml-2">
                                                Read more
                                            </button>
                                        )}
                                    </p>
                                </div>

                                <div className="md:w-[300px] space-y-3">
                                    <div className="w-full bg-black/20 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-violet-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                                            style={{width: `${project.progress}%`}}
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-white/50">Start Date</p>
                                            <p className="text-white">{project.startDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/50">End Date</p>
                                            <p className="text-white">{project.endDate}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="text-xs text-white/40">
                                        Created on {project.createdAt}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}