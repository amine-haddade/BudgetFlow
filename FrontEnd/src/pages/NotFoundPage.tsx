import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col items-center justify-center">
      <div className="text-center max-w-lg">
        <svg 
          viewBox="0 0 512 350"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-md mx-auto mb-8"
        >
          <path d="M256 34.25C133.25 34.25 34.25 133.25 34.25 256S133.25 477.75 256 477.75 477.75 378.75 477.75 256 378.75 34.25 256 34.25Z" fill="#f8fafc" stroke="#e2e8f0" stroke-width="4"></path>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="120" font-weight="bold" fill="#0f172a">404</text>
          <g transform="translate(100 280)">
            <path d="M0 0L10 20L-10 20Z" fill="#C8EE44" transform="rotate(15)"/>
            <circle cx="30" cy="10" r="5" fill="#C8EE44"/>
          </g>
          <g transform="translate(400 80)">
            <path d="M0 0L8 16L-8 16Z" fill="#C8EE44" transform="rotate(-25)"/>
            <circle cx="-25" cy="15" r="4" fill="#C8EE44"/>
          </g>
          <text x="50%" y="75%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#64748b">Page Not Found</text>
        </svg>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! It looks like you're lost.</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <NavLink 
          to="/"
          className="bg-primary  hover:bg-primary-hover  text-black font-semibold px-6 py-3 rounded-lg shadow-md  transition-colors duration-300"
        >
          Go to Dashboard
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;
