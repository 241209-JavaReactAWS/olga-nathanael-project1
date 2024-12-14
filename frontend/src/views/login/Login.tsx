import React, {useState} from 'react'
import "./Login.css"
import Button, {ButtonStyle} from '../../components/Button'
import {useNavigate} from 'react-router-dom'
import {postman} from '../../postman'
import {AxiosError} from 'axios'
import {JwtPayload} from 'jwt-decode'
import {useAuth} from '../../hooks/useAuth'
import {jwtDecode} from 'jwt-decode'

// @ts-ignore
import produceImage from "../../images/fresh-produce.jpg"

interface Props {}
interface IJwtPayload extends JwtPayload{
    role?: string,
}

const Login: React.FC<Props> = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = () => {
        if (username.length === 0) setError('Please enter a username.')
        else if (password.length === 0) setError('Please enter a password.')
        else {
            postman.post('/login', {
                username: username,
                password: password
            }).then((response) => {
                const token = response.data.token
                sessionStorage.setItem('token', token)
                auth.setAuthenticated(true)
                const decodedToken: IJwtPayload = jwtDecode(token)
                if (decodedToken.role != null) {
                    if (decodedToken.role === 'customer' || decodedToken.role === 'admin') auth.setRole(decodedToken.role)
                    else auth.setRole('default')
                }
                navigate('/')
            }).catch((error) => {
                if (error instanceof AxiosError) {
                    if (error.response && error.response.status === 400) setError(error.response.data)
                    else if (error.response && error.response.status === 401) setError('Invalid username or password')
                    else if (error.response && error.response.status === 500) setError('An internal server error occurred. Please try again later.')
                    else setError('An unexpected error occurred. Please try again later.')
                } setError('An unexpected error occurred. Please try again later.')
            })
        }
    }

    return (
        <div id="login" style={{backgroundImage: `url(${produceImage})`}}>
            <div id="loginForm">
                <h2>Login</h2>
                <div className="formField">
                    <label id="usernameFieldLabel" htmlFor="username">Username</label>
                    <input name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className="formField">
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                {/*<div id='rememberMeDiv'>*/}
                {/*    <input name="rememberMe" type="checkbox"/>*/}
                {/*    <label htmlFor="rememberMe">Remember me</label>*/}
                {/*</div>*/}

                {error && <div id='errorDiv'>
                    <p>Error: {error}</p>
                </div>}

                <Button style={ButtonStyle.SECONDARY} onClick={() => navigate('/forgot-password')}>Forgot Password</Button>
                <Button style={ButtonStyle.PRIMARY} onClick={handleSubmit}>Login</Button>
            </div>
        </div>
    );
};

export default Login;
