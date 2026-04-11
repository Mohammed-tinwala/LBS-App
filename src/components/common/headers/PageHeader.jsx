import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 mb-6">

      <button onClick={() => navigate(-1)}>
        <ArrowLeft size={22} />
      </button>

      <h2 className="text-lg font-semibold">{title}</h2>

    </div>
  );
};

export default PageHeader;