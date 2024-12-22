import { Link } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
    const auth = useAuth()

    const logout = () => {
        auth.setAuthenticated(false)
        auth.setRole('default')
        sessionStorage.removeItem('token')
    }

    return <nav>
        <ul>
            {auth.isAuthenticated && <li><Link to='/' onClick={logout}>Logout</Link></li>}
            {!auth.isAuthenticated && <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </>}
            {auth.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
            {auth.isAuthenticated && <li><Link to='/cart'>Cart</Link></li>}
            <li><Link to='/'>Home</Link></li>
        </ul>
    </nav>
}
