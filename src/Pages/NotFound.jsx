import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="eyebrow mb-4">404</p>
        <h1 className="display-section mb-4">
          That page{" "}
          <span className="font-serif italic font-normal">doesn&rsquo;t exist</span>
          .
        </h1>
        <p className="body-md mb-8">
          The link may be broken, or the page may have been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
