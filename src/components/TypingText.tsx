
import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const TypingText: React.FC<TypingTextProps> = ({ 
  texts, 
  typingSpeed = 80, 
  deletingSpeed = 50, 
  pauseTime = 2000 
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedTexts, setDisplayedTexts] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Reset animation when component mounts or texts change
  useEffect(() => {
    setCurrentTextIndex(0);
    setDisplayedTexts([]);
    setCurrentText('');
    setIsCompleted(false);
  }, [texts]);

  useEffect(() => {
    if (isCompleted) {
      // Restart after completion
      const restartTimeout = setTimeout(() => {
        setCurrentTextIndex(0);
        setDisplayedTexts([]);
        setCurrentText('');
        setIsCompleted(false);
      }, 3000);
      
      return () => clearTimeout(restartTimeout);
    }

    const fullText = texts[currentTextIndex];
    
    const timeout = setTimeout(() => {
      if (currentText.length < fullText.length) {
        // Still typing current line
        setCurrentText(fullText.substring(0, currentText.length + 1));
      } else {
        // Finished typing current line
        setTimeout(() => {
          // Add completed text to displayed texts
          setDisplayedTexts(prev => [...prev, fullText]);
          setCurrentText('');
          
          if (currentTextIndex < texts.length - 1) {
            // Move to next text
            setCurrentTextIndex(prev => prev + 1);
          } else {
            // All texts completed
            setIsCompleted(true);
          }
        }, pauseTime);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, texts, typingSpeed, pauseTime, isCompleted]);

  return (
    <div className="space-y-1">
      {displayedTexts.map((text, index) => (
        <div key={index} className="text-sm text-gray-200">
          {index + 1}. {text}
        </div>
      ))}
      {!isCompleted && (
        <div className="text-sm text-gray-200">
          {displayedTexts.length + 1}. {currentText}
          <span className="animate-pulse">|</span>
        </div>
      )}
    </div>
  );
};

export default TypingText;
