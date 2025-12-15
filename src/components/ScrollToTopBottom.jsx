import React, { useState, useEffect } from 'react';

const ScrollToTopBottom = () => {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      // Show "scroll to top" when scrolled down more than 300px
      setShowTop(scrollTop > 300);
      
      // Show "scroll to bottom" when not at the bottom (with 100px threshold)
      setShowBottom(scrollTop + clientHeight < scrollHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const buttonStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#2D5A47',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    fontSize: '20px',
  };

  const containerStyle = {
    position: 'fixed',
    right: '24px',
    bottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    zIndex: 1000,
  };

  return (
    <div style={containerStyle}>
      {showTop && (
        <button
          onClick={scrollToTop}
          style={buttonStyle}
          title="Scroll to top"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1E7B8C';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#2D5A47';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ↑
        </button>
      )}
      {showBottom && (
        <button
          onClick={scrollToBottom}
          style={buttonStyle}
          title="Scroll to bottom"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1E7B8C';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#2D5A47';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          ↓
        </button>
      )}
    </div>
  );
};

export default ScrollToTopBottom;
