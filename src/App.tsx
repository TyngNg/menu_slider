import { cn } from './utils/cn';

function App() {
  const name = 'a';
  return (
    <>
      <p
        className={cn(
          'text-red-500 font-bold text-2xl',
          name === 'a' && 'text-blue-500',
        )}
      >
        template
      </p>
    </>
  );
}

export default App;
