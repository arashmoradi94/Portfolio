import { useState } from 'react';
import './App.css';
import './i18n/config';
import Home from './pages/Home';
import Navbar from './components/layout/Navbar';
import AnimatedBackground from './components/common/AnimatedBackground';
import CursorGlow from './components/common/CursorGlow';
import CustomCursor from './components/common/CustomCursor';
import CommandPalette from './components/common/CommandPalette';
import { CursorProvider } from './contexts/CursorContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <ThemeProvider>
      <CursorProvider>
        <AnimatedBackground />
        <CursorGlow />
        <CustomCursor />
        <Navbar onSearchClick={() => setIsCommandPaletteOpen(true)} />
        <CommandPalette 
          open={isCommandPaletteOpen} 
          setOpen={setIsCommandPaletteOpen} 
        />
        <Home />
      </CursorProvider>
    </ThemeProvider>
  );
}

export default App;
