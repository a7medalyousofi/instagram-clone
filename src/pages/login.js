import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
// import logo from "/images/logo.png";
import { DASHBOARD } from "./../constants/routes";

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
		document.title = "Login - Instagram";
		navigate("/login");
	}, []);

	return (
		<section className='container mx-auto max-w-screen-md text-sm text-center text-gray-600 py-16 px-4 sm:px-6 lg:px-8 relative'>
			<section className='flex flex-col md:flex-row items-center justify-center'>
				<div className='flex sm:w-2/4 order-2 md:order-1'>
					<img src='/images/iphone-with-profile.jpg' alt='' />
				</div>
				<div className='flex flex-col w-9/12 sm:w-2/4 order-1 md:order-2'>
					<div className='p-4 bg-white border border-gray-300 rounded-xl mb-6'>
						<img
							className='mx-auto mb-12'
							src='/images/logo.png'
							alt='instagram logo'
						/>

						{error && (
							<h1 className='mb-4 text-sm text-red-600'>
								{error}
							</h1>
						)}

						<form onSubmit={handleLogin} method='POST'>
							<div>
								<label
									htmlFor='email-address'
									className='sr-only'>
									Email address
								</label>
								<input
									aria-label='Enter your email address'
									id='email-address'
									name='email'
									type='email'
									required
									placeholder='Email address'
									onChange={({ target }) =>
										setEmailAddress(target.value)
									}
									className='text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-4 focus:border-violet-500 focus:ring-violet-500 focus:outline-none'
								/>
							</div>
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
									onChange={({ target }) =>
										setPassword(target.value)
									}
									className='text-gray-900 ring-gray-900 ring-opacity-5 placeholder-gray-400 appearance-none bg-white rounded-md block w-full px-3 py-2 border border-transparent shadow ring-1 sm:text-sm mb-6 focus:border-violet-500 focus:ring-violet-500 focus:outline-none'
								/>
							</div>
							<button
								disabled={isInvalid}
								type='submit'
								className='disabled:opacity-75 disabled:cursor-not-allowed block w-full py-2 px-3 border border-transparent rounded-md text-white font-medium bg-gray-700 shadow-sm sm:text-sm hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50'>
								Sign in
							</button>
						</form>
					</div>
					<footer className='relative z-10 flex-none text-sm text-center mb-10 md:mb-0'>
						<div className='text-gray-900 sm:flex sm:items-center sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4'>
							<p>Don't have an account?</p>
							<Link
								to='/sign-up'
								className='rounded-md border border-gray-300 hover:border-gray-400 py-2 px-10 font-medium flex items-center justify-center'>
								Get access
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
		</section>
	);
}
