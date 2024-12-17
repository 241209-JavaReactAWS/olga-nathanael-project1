// @ts-ignore
import produceImage from '../../images/fresh-produce.jpg'
import './ForgotPassword.css'
import {useState} from 'react'
import Button, {ButtonStyle} from '../../components/button/Button'
import {postman} from '../../postman'
import {useNavigate} from 'react-router-dom'

export default function ForgotPassword() {
    const [username, setUsername] = useState('')
    const [securityQuestion, setSecurityQuestion] = useState('')
    const [securityAnswer, setSecurityAnswer] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

    const fetchSecurityQuestion = () => {
        if (username.length === 0) setError('Please enter a valid username')
        else {
            postman.get(`/resetPassword/${username}`)
                .then((res) => {
                    setSecurityQuestion(res.data)
                }).catch((error) => {
                    if (error.response && error.response.status === 404)
                        setError('User not found')
                    else if (error.response && error.response.status === 500)
                        setError('An internal server error occurred. Please try again.')
                    else setError('Something\'s not working right now, please try again later.')
            })
        }
    }

    const resetPassword = () => {
        if (securityAnswer.length === 0) setError('Security question must be answered.')
        else if (newPassword !== confirmNewPassword)
            setError('Passwords must match')
        else {
            postman.post(`/resetPassword/${username}`, {
                answer: securityAnswer,
                newPassword: newPassword
            }).then(() => {
                setSuccess(true)
                setTimeout(() => navigate('/login'), 5000)
            }).catch((error) => {
                if (error.response && error.response.status === 401)
                    setError('Password reset failed. Incorrect answer to security question.')
                else if (error.response && error.response.status === 500)
                    setError('An internal server error occurred.')
                else setError('Something\'s not working right now.')
            })
        }
    }

    const inputUsernameView = <>
        <div className="formField">
            <label id="usernameFieldLabel" htmlFor="username">Username</label>
            <input id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <Button style={ButtonStyle.PRIMARY} onClick={fetchSecurityQuestion}>Next</Button>
    </>

    const securityQuestionView = <>
        <div className="formField">
            <label id="securityQuestionLabel" htmlFor="securityQuestion"><strong>Security Question</strong></label>
            <p>{securityQuestion}</p>
            <input id="securityQuestion" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)}/>
        </div>
        <div className="formField">
            <label htmlFor="password">New Password</label>
            <input id="password" type="password" value={newPassword}
                   onChange={(e) => setNewPassword(e.target.value)}/>
        </div>
        <div className="formField">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" type="password" value={confirmNewPassword}
                   onChange={(e) => setConfirmNewPassword(e.target.value)}/>
        </div>
        <Button style={ButtonStyle.PRIMARY} onClick={resetPassword}>Reset</Button>
    </>

    return <div id="forgotPassword" style={{backgroundImage: `url(${produceImage})`}}>
        <div id="forgotPasswordDiv">
            <h2>Reset Password</h2>
            {Boolean(securityQuestion) ? securityQuestionView : inputUsernameView}
            {success && <div id='successDiv'>
                <p>Password reset successfully.</p>
            </div>}
            {error && <div id='errorDiv'>
                <p>Error: {error}</p>
            </div>}
        </div>
    </div>
}
