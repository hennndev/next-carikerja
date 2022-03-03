import '../styles/globals.css'
import Layout from '../components/UI/Layout'
import { AppProvider } from 'context/appContext'
import { AuthProvider } from 'context/authContext'

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <AppProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AppProvider>
        </AuthProvider>
    )
}

export default MyApp
