import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { match, category } = location.state || {};
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (!match || !category) {
      navigate('/matches');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error('Session expired. Please try again.');
          navigate(`/match/${match.id}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [match, category, navigate]);

  if (!match || !category) {
    return null;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = Math.random().toString(36).substring(7);
    toast.success('Payment successful!');
    navigate(`/ticket/${ticketId}`, { 
      state: { match, category } 
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/match/${match.id}`)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Match
        </Button>

        <div className="max-w-4xl mx-auto">
          {/* Timer Alert */}
          <div className="glass-card rounded-xl p-4 mb-6 border-warning/50">
            <div className="flex items-center justify-center gap-2 text-warning">
              <Clock className="w-5 h-5" />
              <span className="font-semibold">
                Time remaining: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-2xl p-8">
                <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-accent" />
                  Payment Details
                </h1>

                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input 
                      id="cardName"
                      placeholder="John Doe"
                      required
                      className="glass-card"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                      className="glass-card"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input 
                        id="expiry"
                        placeholder="MM/YY"
                        required
                        className="glass-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input 
                        id="cvv"
                        placeholder="123"
                        required
                        className="glass-card"
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full gradient-primary glow-primary"
                    size="lg"
                  >
                    Confirm Payment
                  </Button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Match</div>
                    <div className="font-semibold">{match.title}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Date & Time</div>
                    <div className="font-semibold">{match.date} • {match.time}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Venue</div>
                    <div className="font-semibold">{match.venue}</div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="text-sm text-muted-foreground mb-1">Seat Category</div>
                    <div className="font-semibold">{category.name}</div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold">Total Amount</span>
                      <span className="text-2xl font-bold gradient-text">
                        ৳{category.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
