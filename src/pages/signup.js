import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

export default function SignUp() {
	const navigate = useNavigate();
	const { firebase } = useContext(FirebaseContext);

	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	// errors state
	const [error, setError] = useState("");

	const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const isInvalid =
		fullName === "" ||
		fullName.length < 5 ||
		emailAddress === "" ||
		regex.test(emailAddress) === false ||
		username === "" ||
		username.length < 5 ||
		password === "" ||
		password.length < 5;

	const handleSignUp = async (e) => {
		e.preventDefault();

		const usernameExists = await doesUsernameExist(username);
		if (!usernameExists.length) {
			try {
				const createUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(emailAddress, password);

				// authentication
				// -> emailAddress & password & username ( displayName )
				await createUserResult.user.updateProfile({
					displayName: username,
				});

				// firebase user collection ( create a document )
				await firebase.firestore().collection("users").add({
					userId: createUserResult.user.uid,
					username: username.toLowerCase(),
					fullName,
					emailAddress: emailAddress.toLowerCase(),
					following: [],
					dateCreated: Date.now(),
				});
				navigate(ROUTES.DASHBOARD);
			} catch (error) {
				if (error.message.includes("The email address")) {
					setError(
						"The email address is already in use by another account"
					);
				} else {
					setError(error.message);
				}
			}
		} else {
			setUsername("");
			setError("This username isn't available, please try another.");
		}
	};

	useEffect(() => {
		document.title = "Sign Up - Yemen Photos";
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

					<p className='mb-6 text-base text-slate-600 text-center max-w-[250px] mx-auto dark:text-slate-400'>
						Sign up to see Yemen photos from your friends.
					</p>

					{error && (
						<p className='block mt-1 mb-4 text-xs text-red-600'>
							{error}
						</p>
					)}

					<form
						onSubmit={handleSignUp}
						method='POST'
						className='space-y-4'>
						{/* Email Field */}
						<div className='text-left'>
							<label htmlFor='email-address' className='sr-only'>
								Email address
							</label>
							<input
								a-label='Enter your email address'
								id='email-address'
								name='email'
								type='text'
								placeholder='Email address'
								className='input__control'
								value={emailAddress}
								onChange={({ target }) =>
									setEmailAddress(target.value)
								}
							/>
						</div>
						{/* Full Name Field */}
						<div className='text-left'>
							<label htmlFor='fullName' className='sr-only'>
								Full Name
							</label>
							<input
								aria-label='Enter your full name'
								id='fullName'
								name='fullName'
								type='fullName'
								placeholder='Full Name'
								className='input__control'
								value={fullName}
								onChange={({ target }) =>
									setFullName(target.value)
								}
							/>
						</div>
						{/* Username Field */}
						<div className='text-left'>
							<label htmlFor='username' className='sr-only'>
								Username
							</label>
							<input
								aria-label='Enter your username'
								id='username'
								name='username'
								type='username'
								placeholder='Username'
								className='input__control'
								value={username}
								onChange={({ target }) =>
									setUsername(target.value)
								}
							/>
						</div>
						{/* Password Field */}
						<div className='text-left'>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<input
								aria-label='Enter your password'
								id='password'
								name='password'
								type='password'
								placeholder='Password'
								className='input__control'
								value={password}
								onChange={({ target }) =>
									setPassword(target.value)
								}
							/>
						</div>

						<button
							disabled={isInvalid}
							type='submit'
							className={`w-full btn btn__sm btn__primary btn--focused ${
								isInvalid && "btn--disabled"
							}`}>
							Sign Up
						</button>
					</form>
				</div>
				<footer className='p-4 bg-white border border-gray-300 rounded-xl text-sm text-center'>
					<div className='text-gray-900 flex items-center justify-center space-x-2'>
						<p>Have an account?</p>
						<Link
							to={ROUTES.LOGIN}
							className='text-blue-700 hover:text-blue-500 font-medium flex items-center justify-center mt-0'>
							Login
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
