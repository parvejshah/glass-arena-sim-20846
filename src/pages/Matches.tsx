import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MatchCard from '@/components/MatchCard';
import { Button } from '@/components/ui/button';
import { matchesData } from '@/data/matches';
import { toast } from 'sonner';

const Matches = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const comingSoonMatches = matchesData.filter(m => m.status === 'coming-soon');
  const upcomingMatches = matchesData.filter(m => m.status === 'upcoming');

  const handleEdit = (id: string) => {
    toast.info(`Edit match ${id} (Admin feature)`);
  };

  const handleDelete = (id: string) => {
    toast.error(`Delete match ${id} (Admin feature)`);
  };

  const handleAddMatch = () => {
    toast.success('Add new match (Admin feature)');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 gradient-text">All Matches</h1>
            <p className="text-muted-foreground">Browse and book your favorite cricket matches</p>
          </div>
          
          {isAdmin && (
            <Button 
              onClick={handleAddMatch}
              className="gradient-primary glow-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Match
            </Button>
          )}
        </div>

        {/* Coming Soon Section */}
        {comingSoonMatches.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Coming Soon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {comingSoonMatches.map((match) => (
                <MatchCard 
                  key={match.id} 
                  match={match}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Matches Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Upcoming Matches</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upcomingMatches.map((match) => (
              <MatchCard 
                key={match.id} 
                match={match}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Matches;
