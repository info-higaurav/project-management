export default function ProfileCard(data: {data: {firstName:string, lastName:string, emailAddress:string, profilePicture:string}}){
  const {firstName, lastName, emailAddress, profilePicture} = data.data;
  
  return(
    <>
     <div className="w-28 h-28 rounded-full ring-4 ring-purple-500/30 shadow-lg overflow-hidden">
            <img 
              src={profilePicture || "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-white">{firstName} {lastName}</h3>
          <p className="text-sm text-white/70">{emailAddress}</p>
          
    </>
  )
}