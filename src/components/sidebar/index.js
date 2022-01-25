import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";

export default function Sidebar() {
	const {
		user: { username, fullName, emailAddress, userId },
	} = useUser();

	return (
		<section className='bg-slate-200 p-4 space-y-6 order-1 md:order-2'>
			<User
				username={username}
				emailAddress={emailAddress}
				fullName={fullName}
			/>
			<Suggestions userId={userId} />
		</section>
	);
}
