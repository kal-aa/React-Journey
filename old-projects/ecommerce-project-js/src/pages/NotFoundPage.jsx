import { Link } from 'react-router';
import Header from '../components/Header';

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        backgroundColor: '#f5f5f5'
    },
    content: {
        textAlign: 'center',
        padding: '40px'
    },
    code: {
        fontSize: '120px',
        fontWeight: 'bold',
        margin: '0',
        color: '#333'
    },
    title: {
        fontSize: '32px',
        margin: '20px 0',
        color: '#333'
    },
    description: {
        fontSize: '16px',
        color: '#666',
        margin: '20px 0'
    },
    button: {
        display: 'inline-block',
        padding: '12px 30px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        marginTop: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    }
};

export default function NotFoundPage() {
    return (<>
    <Header/>
    <div style={styles.container}>
        <div style={styles.content}>
            <h1 style={styles.code}>404</h1>
            <h2 style={styles.title}>Page Not Found</h2>
            <p style={styles.description}>Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" style={styles.button}>Back to Home</Link>
        </div>
    </div>
    </>)
}