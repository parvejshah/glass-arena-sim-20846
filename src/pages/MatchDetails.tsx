import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';
import { Button } from '@/components/ui/button';
import { matchesData } from '@/data/matches';
import { StadiumMap } from '@/components/seat-booking/StadiumMap';
import { BookingForm } from '@/components/seat-booking/BookingForm';
import { galleryData } from '@/data/galleryData';
import type { Gallery, Selection } from '@/types/seatBooking';

const MatchDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const match = matchesData.find(m => m.id === id);
  
  const [selection, setSelection] = useState<Selection>({
    galleryId: '',
    level: '',
    block: '',
    tickets: 1,
    ticketHolderName: '',
    phone: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const selectedGallery = galleryData.find(g => g.id === selection.galleryId);
    if (selectedGallery) {
      const unitPrice = selectedGallery.price;
      const subTotal = unitPrice * selection.tickets;
      const vat = subTotal * 0.15;
      setTotalPrice(subTotal + vat);
    } else {
      setTotalPrice(0);
    }
  }, [selection]);

  if (!match) {
    return <div>Match not found</div>;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSelectionChange = (newSelectionPart: Partial<Selection>) => {
    setSelection(currentSelection => {
        const updatedSelection = { ...currentSelection, ...newSelectionPart };

        if ('galleryId' in newSelectionPart && newSelectionPart.galleryId !== currentSelection.galleryId) {
            const newGalleryId = newSelectionPart.galleryId;
            const newGallery = galleryData.find(g => g.id === newGalleryId);
            
            if (newGallery) {
                const newLevel = ('level' in newSelectionPart && newSelectionPart.level && newGallery.levels.includes(newSelectionPart.level))
                    ? newSelectionPart.level
                    : newGallery.levels[0];

                const newBlock = newGallery.blocks[0];
                
                return {
                    ...updatedSelection,
                    galleryId: newGalleryId,
                    level: newLevel,
                    block: newBlock,
                };
            } 
            else {
                 return {
                    ...updatedSelection,
                    galleryId: newGalleryId || '',
                    level: '',
                    block: '',
                };
            }
        }
        
        return updatedSelection;
    });
  };

  const handleGalleryClick = (galleryId: string, level: string) => {
    handleSelectionChange({ galleryId, level });
  };

  const handleProceedToPayment = () => {
    const selectedGallery = galleryData.find(g => g.id === selection.galleryId);
    if (!selectedGallery) {
      return;
    }
    navigate('/payment', { 
      state: { 
        match, 
        selection,
        selectedGallery,
        totalPrice
      } 
    });
  };

  const selectedGallery: Gallery | undefined = galleryData.find(g => g.id === selection.galleryId);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/matches')}
          className="mb-6 hover-lift animate-fade-in"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Matches
        </Button>

        {/* Match Header */}
        <div className="glass-card rounded-2xl p-8 mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-6">
                    <span className="text-4xl font-bold gradient-text">{match.team1}</span>
                    <span className="text-3xl text-muted-foreground">vs</span>
                    <span className="text-4xl font-bold gradient-text">{match.team2}</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{match.title}</h1>
              <div className="space-y-2 text-muted-foreground">
                <p className="text-lg">{formatDate(match.date)} • {match.time}</p>
                <p className="text-lg">{match.venue}, {match.stadium}</p>
              </div>
            </div>

            <div className="lg:w-96">
              <CountdownTimer targetDate={`${match.date}T${match.time}`} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Interactive Stadium Map */}
          <div className="lg:col-span-3 animate-slide-up">
            <div className="glass-card rounded-2xl p-6 h-full hover-lift">
              <h2 className="text-2xl font-bold mb-6">Interactive Seat Layout</h2>
              <div className="w-full h-[500px] flex justify-center items-center">
                <StadiumMap 
                  selectedGalleryId={selection.galleryId} 
                  selectedLevel={selection.level}
                  onGalleryClick={handleGalleryClick} 
                />
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <BookingForm 
                galleries={galleryData}
                selection={selection}
                onSelectionChange={handleSelectionChange}
                totalPrice={totalPrice}
                selectedGallery={selectedGallery}
                onProceedToPayment={handleProceedToPayment}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MatchDetails;
