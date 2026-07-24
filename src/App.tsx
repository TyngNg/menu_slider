import { useState } from 'react';
import Content from './components/Content';
import CustomCursor from './components/CustomCursor';
import TopNOverLay from './components/TopNOverLay';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="w-full min-h-screen">
      <CustomCursor isOpen={isOpen} />
      <TopNOverLay isOpen={isOpen} setIsOpen={setIsOpen} />
      <Content />
    </main>
  );
}

export default App;
