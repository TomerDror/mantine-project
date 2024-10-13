
import React from 'react';
import { MantineProvider, Text, Button, Paper, Anchor, Box, Code, Title, PinInput } from '@mantine/core';
const App: React.FC = () => {
    const handlePinChange = (value: string) => {
      console.log('PIN:', value);
    };
  
    return (
      <div>
        <h1>Pin Input Example</h1>
        <PinInput onChange={handlePinChange} />
      </div>
    );
  };
  
  export default App;