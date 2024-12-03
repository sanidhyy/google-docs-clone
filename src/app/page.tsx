import { Button } from '@/components/ui/button';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-emerald-500">Hello, World!</h1>
      <Button variant="destructive" size="lg">
        Click me
      </Button>
    </div>
  );
};

export default HomePage;
