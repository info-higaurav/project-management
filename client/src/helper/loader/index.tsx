import { PropagateLoader } from 'react-spinners'
export const Loader = () => {
    return (

        <div className='w-full h-dvh flex justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 backdrop-blur-sm'>
            <PropagateLoader
                color="#5701ff"
                cssOverride={{
                    backgroundColor: 'transparent'
                }}
            />
        </div>
    )
}