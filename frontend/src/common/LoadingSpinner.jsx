import React from 'react';


function LoadingSpinner({ 
  message = "Loading...", 
  subMessage = "Please wait while we fetch your data",
  variant = "advanced" // "simple", "dots", or "advanced"
}) {
  
  const renderSpinner = () => {
    switch (variant) {
      case "simple":
        return <div className="loading-spinner-simple"></div>;
      
      case "dots":
        return (
          <div className="loading-spinner-dots">
            <div className="loading-dot-simple"></div>
            <div className="loading-dot-simple"></div>
            <div className="loading-dot-simple"></div>
          </div>
        );
      
      case "advanced":
      default:
        return (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="loading-container">
      <div className="loading-content">
        {renderSpinner()}
        
        <div>
          <p className="loading-text">{message}</p>
          {subMessage && <p className="loading-subtext">{subMessage}</p>}
        </div>
        
        {variant === "advanced" && (
          <div className="loading-progress">
            <div className="loading-progress-bar"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoadingSpinner;