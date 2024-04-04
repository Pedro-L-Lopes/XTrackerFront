import { useState, useEffect } from "react";

interface MessageProps {
  text: string;
  type: "error" | "success";
}

const Message: React.FC<MessageProps> = ({ text, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isVisible && (
        <div
          className={`fixed top-0 left-0 m-4 p-4 rounded-md ${
            type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Message;
