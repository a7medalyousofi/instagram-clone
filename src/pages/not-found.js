import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Not Found - Yem Photos";
	}, []);

	return (
		<div className='container mx-auto flex flex-col justify-center items-center min-h-screen'>
			<img
				className='max-w-md'
				src='/images/404_page_not_found.svg'
				alt=''
			/>
			<button
				onClick={() => navigate("/")}
				className='mt-10 btn btn__primary btn--focused btn--disabled'>
				<FiArrowLeft className='mr-2' /> Back to home
			</button>
		</div>
	);
}
