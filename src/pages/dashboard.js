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
      <main className="mx-auto grid max-w-screen-lg grid-cols-1 justify-between gap-y-6 p-4 pt-20 md:grid-cols-3 md:gap-x-6 md:gap-y-0">
        <Timeline />
        <Sidebar />
      </main>
    </>
  );
}
