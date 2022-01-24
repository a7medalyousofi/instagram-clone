import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiHome, FiUser } from "react-icons/fi";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";

export default function Header() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const { firebase } = useContext(FirebaseContext);
	const { user } = useContext(UserContext);

	return (
		<div className='h-[60px] bg-white border-b border-slate-200 shadow-md shadow-slate-50'>
			<div className='container mx-auto max-w-5xl'>
				<div className='flex justify-between items-center h-[60px]'>
					<Link to={ROUTES.DASHBOARD}>
						<img
							className='h-7'
							src='/images/logo.svg'
							alt='Yemen Photos Logo'
						/>
					</Link>
					<div className='flex justify-center items-center gap-6'>
						{user ? (
							<>
								<Link to={ROUTES.DASHBOARD} className=''>
									<FiHome className='h-6 w-6' />
								</Link>
								<div className='relative w-8 h-8'>
									<button
										type='button'
										className={`bg-slate-100 rounded-full ring-2 ring-offset-2 ring-slate-200 overflow-hidden ${
											isOpen ? "!ring-blue-500" : ""
										}`}
										onClick={() => setIsOpen(!isOpen)}>
										{user.displayName ? (
											<img
												className='select-none h-full w-full'
												src={`/images/avatars/${user.displayName}.jpg`}
												alt={`${user.displayName}`}
											/>
										) : (
											<img
												className='select-none w-full h-full'
												src={`/images/avatars/default.png`}
												alt='default avatar'
											/>
										)}
									</button>
									{/* Dropdown menu */}
									{isOpen && (
										<div className='absolute top-10 right-0 min-w-[150px] flex flex-col items-center bg-white rounded-md shadow-sm border border-slate-200 text-left overflow-hidden z-10'>
											<div className='flex items-center py-2 px-4 w-full hover:bg-slate-50 cursor-pointer'>
												<FiUser className='mr-2 h-4 w-4' />{" "}
												Profile
											</div>
											<div
												className='flex items-center py-2 px-4 border-t w-full hover:bg-slate-50 cursor-pointer'
												onClick={() =>
													firebase.auth().signOut()
												}
												onKeyDown={(e) => {
													if (e.key === "Enter")
														firebase
															.auth()
															.signOut();
												}}>
												<FiLogOut className='mr-2 h-4 w-4' />
												Log out
											</div>
										</div>
									)}
								</div>
							</>
						) : (
							<>
								<button
									type='button'
									className='btn btn__sm btn__primary btn--focused'
									onClick={() => navigate(ROUTES.LOGIN)}>
									Log In
								</button>
								<button type='button' className='btn__sm'>
									Sign Up
								</button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
