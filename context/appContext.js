import { createContext, useContext, useState } from "react"


const Context = createContext()
const AppProvider = ({children}) => {
    
    const [openSidebar, setOpenSidebar] = useState(false)
    const [openRightSidebar, setOpenRightSidebar] = useState(false)
    const [accountTerm, setAccountTerm] = useState(null)
    const [dataCandidates, setDataCandidates] = useState(null)
    const [messageTerm, setMessageTerm] = useState(null)
    const [postTerm, setPostTerm] = useState(null)

    const handleOpenSidebar = () => setOpenSidebar(true)
    const handleCloseSidebar = () => setOpenSidebar(false)
    const handleOpenRightSidebar = () => setOpenRightSidebar(true)
    const handleCloseRightSidebar = () => setOpenRightSidebar(false)
    const handleAccountTerm = (data) => setAccountTerm(data)
    const handleMessageTerm = (data) => setMessageTerm(data)
    const handlePostTerm = (data) => setPostTerm(data)

    const handleCandidate = (candidates) => {
        setDataCandidates(candidates)
    }

    const value = {
        openSidebar,
        openRightSidebar,
        accountTerm,
        dataCandidates,
        messageTerm,
        postTerm,
        handleOpenSidebar,
        handleCloseSidebar,
        handleOpenRightSidebar,
        handleCloseRightSidebar,
        handleAccountTerm,
        handleCandidate,
        handleMessageTerm,
        handlePostTerm
    }
    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

const useData = () => useContext(Context)
export { AppProvider, useData}