import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Not Found - Yem Photos";
  }, []);

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <img className="max-w-md" src="/images/404_page_not_found.svg" alt="" />
      <button
        onClick={() => navigate("/")}
        className="btn btn__lg btn__primary btn--focused btn--disabled mt-10"
      >
        <FiArrowLeft className="mr-2" /> Back to home
      </button>
    </div>
  );
}
