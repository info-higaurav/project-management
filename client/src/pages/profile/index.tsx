

export default function Profile(data:any){
    const {firstName,lastName,emailAddress,userRole,status , ...rest} = data.data;
    
    return <div className="space-y-6">
    <div className="bg-black/10 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-4">Profile Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-white/70 mb-1">Full Name</h3>
          <p className="text-white text-lg">{firstName} {lastName}</p>
        </div>
        
        <div>
          <h3 className="text-white/70 mb-1">Email</h3>
          <p className="text-white text-lg">{emailAddress}</p>
        </div>
        
        <div>
          <h3 className="text-white/70 mb-1">Role</h3>
          <p className="text-white text-lg capitalize">{userRole}</p>
        </div>
        
        <div>
          <h3 className="text-white/70 mb-1">Status</h3>
          <p className="text-white text-lg capitalize">{status || 'Active'}</p>
        </div>
        
        <div>
          <h3 className="text-white/70 mb-1">Member Since</h3>
          <p className="text-white text-lg">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
    </div>
}
