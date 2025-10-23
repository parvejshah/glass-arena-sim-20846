import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass-card sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg gradient-primary glow-primary">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              Cricket Tickets
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/matches" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Matches
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
