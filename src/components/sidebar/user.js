import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const User = ({ username, fullName, emailAddress }) => (
	<Link
		to={`/p/${username}`}
		className='flex items-center gap-6 p-4 bg-white rounded-xl overflow-hidden'>
		{!username ? (
			<div className='avatar__sm'>
				<Skeleton
					circle
					height='100%'
					containerClassName='avatar-skeleton'
				/>
			</div>
		) : (
			<div className='w-14 h-14 shrink-0 select-none'>
				<img
					className='bg-slate-100 w-full h-full rounded-full ring-2 ring-blue-400 ring-offset-2'
					src={`/images/avatars/${username}.jpg`}
					alt='default avatar'
				/>
			</div>
		)}
		<div className='flex-grow'>
			{!fullName ? (
				<Skeleton height='18px' width='75%' count={1} />
			) : (
				<h3 className='text-gray-700 text-sm font-semibold capitalize'>
					{fullName}
				</h3>
			)}
			{!emailAddress ? (
				<Skeleton height='18px' count={1} />
			) : (
				<p className='text-gray-400 font-light text-sm '>
					{emailAddress}
				</p>
			)}
		</div>
	</Link>
);

export default User;

User.propTypes = {
	fullName: PropTypes.string,
	emailAddress: PropTypes.string,
};
