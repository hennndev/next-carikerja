import Sidebar from "./Sidebar"

const Layout = ({children}) => {
    return (
        <div className="min-h-screen bg-white">
           <div className="flex">
                <Sidebar/>
                {children}
            </div>
        </div>
    )
}


export default Layout