import React from 'react';

interface IconProps {
  icon: string; // assuming icon is a classname for a web font or similar
}

const Icon: React.FC<IconProps> = ({ icon }) => {
  return <i className={`icon ${icon}`}></i>;
};

export default Icon;
