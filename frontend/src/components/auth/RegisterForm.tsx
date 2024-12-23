import React, { useState, FormEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { postman } from '../../postman'
import "./styles.css";

// @ts-ignore
import img from "../../images/register.png";

interface Props { }

interface FormData {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
    securityQuestion: number;
    securityAnswer: string;
}

interface ApiResponse {
    success: boolean;
    message: string;
}

interface SecurityQuestion {
    id: number,
    securityQuestion: string,
}

const RegisterForm: React.FC<Props> = () => {
    const [securityQuestions, setSecurityQuestions] = useState<Array<SecurityQuestion>>([])
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        confirmPassword: "",
        securityQuestion: 1,
        securityAnswer: ""
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    useEffect(() => {
        postman.get('/security-questions')
            .then((res) => {
                setSecurityQuestions((res.data))
            })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        let newErrors: Partial<FormData> = {};
        let isValid = true;

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
            isValid = false;
        }

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        if (!formData.securityAnswer) {
            newErrors.password = 'Security answer is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;

    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiError(null);

        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await fetch("http://localhost:8080/api/v1/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        username: formData.username,
                        password: formData.password,
                        securityQuestion: formData.securityQuestion,
                        securityAnswer: formData.securityAnswer,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: ApiResponse = await response.json();
                console.log(data);

                if (data.success) {
                    // Resset the form.
                    setFormData({
                        firstName: "",
                        lastName: "",
                        username: "",
                        password: "",
                        confirmPassword: "",
                        securityQuestion: 1,
                        securityAnswer: ""
                    });
                    navigate("/login");
                } else {
                    setApiError(data.message || 'Registration failed');
                }
            } catch (error) {
                console.error('An error occurred:', error);
                setApiError('An error occurred while registering. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="main-container" style={{ backgroundImage: `url(${img})` }}>
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Register</h2>

                    <div className="name-container">
                        <div className="name-input">
                            <label htmlFor="firstName">First name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div>

                        <div className="name-input">
                            <label htmlFor="lastName">Last name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                    </div>

                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <span className="error">{errors.username}</span>}

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

                    <label htmlFor="securityQuestion">Security Question</label>
                    <select name='securityQuestion' onChange={handleChange} id='securityQuestion' style={{ width: '100%' }}>
                        {securityQuestions.map((q) => <option key={q.id} value={q.id}>{q.securityQuestion}</option>)}
                    </select>

                    <label htmlFor="securityAnswer">Security Answer</label>
                    <input
                        type="password"
                        id="securityAnswer"
                        name="securityAnswer"
                        required
                        value={formData.securityAnswer}
                        onChange={handleChange}
                    />
                    {errors.securityAnswer && <span className="error">{errors.securityAnswer}</span>}

                    {apiError && <div className="error">{apiError}</div>}




                    <div className="form-actions">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Registering' : 'Register'}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
