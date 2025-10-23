import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Download, Printer } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Ticket = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { match, selection, selectedGallery, totalPrice } = location.state || {};

  if (!match || !selectedGallery || !selection) {
    navigate('/matches');
    return null;
  }

  const ticketCode = `BCB-${id?.toUpperCase()}`;

  const handlePrint = () => {
    window.print();
    toast.success('Opening print dialog...');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8 animate-scale-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary glow-primary mb-4 animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Your ticket has been confirmed. See you at the match!
            </p>
          </div>

          {/* Ticket Card */}
          <div className="glass-card rounded-3xl p-8 mb-6 relative overflow-hidden animate-slide-up">
            <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-10 blur-3xl"></div>
            
            <div className="relative z-10 space-y-6">
              {/* Match Details */}
              <div className="text-center pb-6 border-b border-white/10">
                <div className="text-sm text-muted-foreground mb-2">CRICKET MATCH TICKET</div>
                <h2 className="text-2xl font-bold mb-4">{match.title}</h2>
                <div className="flex justify-center items-center gap-6 mb-4">
                  <span className="text-3xl font-bold gradient-text">{match.team1}</span>
                  <span className="text-2xl text-muted-foreground">vs</span>
                  <span className="text-3xl font-bold gradient-text">{match.team2}</span>
                </div>
              </div>

              {/* Ticket Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Date</div>
                  <div className="font-semibold">{match.date}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Time</div>
                  <div className="font-semibold">{match.time}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Venue</div>
                  <div className="font-semibold">{match.venue}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Stadium</div>
                  <div className="font-semibold">{match.stadium}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Gallery</div>
                  <div className="font-semibold">{selectedGallery.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Level</div>
                  <div className="font-semibold">{selection.level}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Block</div>
                  <div className="font-semibold">{selection.block}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Tickets</div>
                  <div className="font-semibold">{selection.tickets}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                  <div className="font-semibold text-2xl gradient-text">৳{totalPrice.toFixed(2)}</div>
                </div>
              </div>

              {/* Ticket Code */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Ticket Code</div>
                  <div className="text-3xl font-bold font-mono gradient-text mb-4">
                    {ticketCode}
                  </div>
                  <div className="w-32 h-32 mx-auto glass-card rounded-xl flex items-center justify-center">
                    <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="white" opacity="0.1"/>
                      <rect x="10" y="10" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="30" y="10" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="50" y="10" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="70" y="10" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="10" y="30" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="70" y="30" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="10" y="50" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="30" y="50" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="50" y="50" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="70" y="50" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="10" y="70" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="70" y="70" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="10" y="80" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="30" y="80" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="50" y="80" width="10" height="10" fill="currentColor" opacity="0.7"/>
                      <rect x="70" y="80" width="10" height="10" fill="currentColor" opacity="0.7"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="text-xs text-muted-foreground text-center pt-4 border-t border-white/10">
                Please present this ticket at the venue entrance. Screenshots are accepted.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 animate-fade-in print:hidden">
            <Button 
              onClick={handlePrint}
              className="flex-1 gradient-primary glow-primary hover-glow"
              size="lg"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Ticket
            </Button>
            <Button 
              onClick={() => navigate('/matches')}
              variant="outline"
              className="flex-1 glass-card hover-lift"
              size="lg"
            >
              Browse More Matches
            </Button>
          </div>
        </div>
      </div>

      <Footer />
      
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .container * {
            visibility: visible;
          }
          .container {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Ticket;
