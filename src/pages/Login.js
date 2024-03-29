import './styling/registration.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function LoginForm() {

// States for login
const [name, setName] = useState('');
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Checking Name
const handleName = (e) => {
setName(e.target.value);
setSubmitted(false);
};


// Checking password
const handlePassword = (e) => {
setPassword(e.target.value);
setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
e.preventDefault();
if (name === '' || password === '') {
setError(true);
} else {
setSubmitted(true);
setError(false);
}
};

// Showing success message
const successMessage = () => {
return (
<div
className="success"
style={{
display: submitted ? '' : 'none',
}}>
<h1>User {name} successfully logged in!!</h1>
</div>
);
};

// Showing error message if error is true
const errorMessage = () => {
return (
<div
className="error"
style={{
display: error ? '' : 'none',
}}>
<h1>Please enter all the fields</h1>
</div>
);
};

return (
<div className="form">
<div>
<h1>User Login</h1>
</div>

{/* Calling to the methods */}
<div className="messages">
{errorMessage()}
{successMessage()}
</div>

<form>
    <div class = "full-page-container">
    <div class="circle-container">
    <div class="form-elements">
{/* Labels and inputs for form data */}
<label className="label">Username</label>
<input onChange={handleName} className="input"
value={name} type="text" />

<label className="label">Password</label>
<input onChange={handlePassword} className="input"
value={password} type="password" />

<button onClick={handleSubmit} className="btn" type="submit">
Submit
</button>
<p class = "swap">Don't have an account yet? <Link to = "/register"> Click Here</Link></p>
    </div>
    </div>
    </div>  
</form>
</div>
);
}