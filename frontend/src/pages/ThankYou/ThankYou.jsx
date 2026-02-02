import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import "./ThankYou.css"; 

const ThankYou = () => {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowMessage(true), 500);
  }, []);

  return (
    <div className="thankyou-container">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        run={showMessage}
        numberOfPieces={200}
      />
      <div className="thankyou-card">
        <div className="thankyou-content">
          <h1 className={`thankyou-title ${showMessage ? "show" : ""}`}>
            🎉 Thank You! 🎉
          </h1>
          <p className={`thankyou-text ${showMessage ? "show" : ""}`}>
            Thank you for using our service! We appreciate your support.
          </p>
          <button
            className="thankyou-button"
            onClick={() => navigate("/")}
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
