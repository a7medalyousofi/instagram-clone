import { useEffect } from "react";
import Timeline from "./../components/timeline";
import Sidebar from "./../components/sidebar";
import Header from "./../components/header";

export default function Dashboard() {
	useEffect(() => {
		document.title = "Dashboard - Yem Photos";
	}, []);

	return (
		<div className=''>
			<Header />
			<div>
				<Timeline />
				<Sidebar />
			</div>
		</div>
	);
}
