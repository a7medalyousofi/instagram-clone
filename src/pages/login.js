import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

export default function Login() {
	const navigate = useNavigate();
	const { firebase } = useContext(FirebaseContext);

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const isInvalid = password === "" || emailAddress === "";
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await firebase
				.auth()
				.signInWithEmailAndPassword(emailAddress, password);
			navigate(ROUTES.DASHBOARD);
		} catch (error) {
			setEmailAddress("");
			setPassword("");
			setError(error.message);
		}
	};

	useEffect(() => {
		document.title = "Login - Yemen Photos";
	}, []);

	return (
		<section className='container mx-auto flex items-center justify-center max-w-screen-md text-sm text-center text-gray-600 py-16 px-4 sm:px-6 lg:px-8'>
			<div className='w-full sm:w-2/4 space-y-4'>
				<div className='p-4 bg-white border border-gray-300 rounded-xl'>
					<img
						className='mx-auto mt-3 mb-6'
						width='206px'
						height='58px'
						src='/images/logo.svg'
						alt='Yemen Photos logo'
					/>

					{error && (
						<h1 className='mb-4 text-sm text-red-600'>{error}</h1>
					)}

					<form
						onSubmit={handleLogin}
						method='POST'
						className='space-y-4'>
						{/* Email Field */}
						<div>
							<label htmlFor='email-address' className='sr-only'>
								Email address
							</label>
							<input
								aria-label='Enter your email address'
								id='email-address'
								name='email'
								type='email'
								required
								placeholder='Email address'
								value={emailAddress}
								onChange={({ target }) =>
									setEmailAddress(target.value)
								}
								className='input__control'
							/>
						</div>
						{/* Password Field */}
						<div>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								aria-label='Enter your password'
								id='password'
								name='password'
								type='password'
								required
								placeholder='Password'
								value={password}
								onChange={({ target }) =>
									setPassword(target.value)
								}
								className='input__control'
							/>
						</div>
						<button
							disabled={isInvalid}
							type='submit'
							className='w-full btn btn__primary btn--focused btn--disabled'>
							Login
						</button>
					</form>
				</div>
				<footer className='p-4 bg-white border border-gray-300 rounded-xl text-sm text-center'>
					<div className='text-gray-900 flex items-center justify-center space-x-2'>
						<p>Don't have an account?</p>
						<Link
							to={ROUTES.SIGN_UP}
							className='text-blue-700 hover:text-blue-500 font-medium flex items-center justify-center mt-0'>
							Sign Up
							<svg
								aria-hidden='true'
								width='11'
								height='10'
								fill='none'
								className='flex-none ml-1.5'>
								<path
									d='M5.977 9.639L10.616 5 5.977.362l-.895.89L8.19 4.353H.384v1.292H8.19L5.082 8.754l.895.885z'
									fill='currentColor'></path>
							</svg>
						</Link>
					</div>
				</footer>
			</div>
		</section>
	);
}
