import { useEffect } from "react";
import Timeline from "./../components/timeline";
import Sidebar from "./../components/sidebar";
import Header from "./../components/header";

export default function Dashboard() {
	useEffect(() => {
		document.title = "Dashboard - Yem Photos";
	}, []);

	return (
		<>
			<Header />
			<main className='grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-x-6 md:gap-y-0 justify-between mx-auto max-w-screen-lg p-4'>
				<Timeline />
				<Sidebar />
			</main>
		</>
	);
}
