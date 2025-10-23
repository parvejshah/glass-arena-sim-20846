import { Link } from 'react-router-dom';
import { Calendar, MapPin, Edit, Trash2 } from 'lucide-react';
import { Match } from '@/data/matches';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface MatchCardProps {
  match: Match;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const MatchCard = ({ match, onEdit, onDelete }: MatchCardProps) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="glass-card-hover rounded-xl overflow-hidden group hover-lift">
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-2 transform transition-transform duration-300 group-hover:scale-105">
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl font-bold gradient-text">{match.team1}</span>
              <span className="text-2xl text-muted-foreground">vs</span>
              <span className="text-3xl font-bold gradient-text">{match.team2}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold transition-colors duration-300 group-hover:text-primary">{match.title}</h3>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 transition-all duration-300 group-hover:translate-x-1">
            <Calendar className="w-4 h-4 text-accent" />
            <span>{formatDate(match.date)} • {match.time}</span>
          </div>
          <div className="flex items-center gap-2 transition-all duration-300 group-hover:translate-x-1">
            <MapPin className="w-4 h-4 text-accent" />
            <span>{match.venue}, {match.stadium}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {match.status === 'upcoming' ? (
            <Link to={`/match/${match.id}`} className="flex-1">
              <Button className="w-full gradient-primary glow-primary hover-glow">
                View Details
              </Button>
            </Link>
          ) : (
            <Button className="w-full" variant="secondary" disabled>
              Coming Soon
            </Button>
          )}
          
          {isAdmin && onEdit && onDelete && (
            <>
              <Button 
                size="icon" 
                variant="outline"
                onClick={() => onEdit(match.id)}
                className="glass-card hover-lift"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                size="icon" 
                variant="destructive"
                onClick={() => onDelete(match.id)}
                className="hover-lift"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
