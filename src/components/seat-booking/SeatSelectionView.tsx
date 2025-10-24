import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SeatGrid, Seat, SeatState } from './SeatGrid';
import { toast } from 'sonner';
import type { Gallery } from '@/types/seatBooking';

interface SeatSelectionViewProps {
  gallery: Gallery;
  selectedLevel: string;
  onBack: () => void;
  onConfirmSeats: (seatIds: string[], totalPrice: number) => void;
}

// Generate mock seats for demonstration
const generateSeats = (blocks: string[], level: string): Seat[] => {
  const seats: Seat[] = [];
  const blockArray = blocks[0].split(',').map(b => b.trim());
  
  blockArray.forEach(block => {
    for (let row = 1; row <= 10; row++) {
      for (let seat = 1; seat <= 20; seat++) {
        // Randomly assign states for demonstration
        const random = Math.random();
        let state: SeatState = 'free';
        if (random > 0.85) state = 'booked';
        else if (random > 0.75) state = 'reserved';
        
        seats.push({
          id: `${block}-${level}-R${row}-S${seat}`,
          row,
          number: seat,
          state,
          block
        });
      }
    }
  });
  
  return seats;
};

export const SeatSelectionView = ({ 
  gallery, 
  selectedLevel, 
  onBack,
  onConfirmSeats 
}: SeatSelectionViewProps) => {
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const maxSelection = 4;

  useEffect(() => {
    const generatedSeats = generateSeats(gallery.blocks, selectedLevel);
    setSeats(generatedSeats);
  }, [gallery, selectedLevel]);

  useEffect(() => {
    if (selectedSeats.length > 0 && timeLeft === null) {
      setTimeLeft(300); // 5 minutes in seconds
      toast.info('You have 5 minutes to complete your booking');
    }
  }, [selectedSeats.length, timeLeft]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          // Time's up - release seats
          if (selectedSeats.length > 0) {
            toast.error('Time expired! Seats released.');
            setSelectedSeats([]);
          }
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, selectedSeats.length]);

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        const newSelection = prev.filter(id => id !== seatId);
        if (newSelection.length === 0) {
          setTimeLeft(null); // Reset timer if no seats selected
        }
        return newSelection;
      }
      if (prev.length >= maxSelection) {
        toast.warning(`Maximum ${maxSelection} seats allowed`);
        return prev;
      }
      return [...prev, seatId];
    });
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    const totalPrice = selectedSeats.length * gallery.price;
    onConfirmSeats(selectedSeats, totalPrice);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="min-h-screen bg-background py-8"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Stadium Map
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{gallery.name}</h1>
              <p className="text-muted-foreground">
                Level: {selectedLevel} | Price: ৳{gallery.price.toFixed(2)} per seat
              </p>
            </div>
            
            <AnimatePresence>
              {timeLeft !== null && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg font-semibold',
                    timeLeft < 60 ? 'bg-destructive text-destructive-foreground animate-pulse' : 'bg-primary text-primary-foreground'
                  )}
                >
                  <Clock className="h-5 w-5" />
                  {formatTime(timeLeft)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-6 mb-8 flex-wrap"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-500 rounded"></div>
            <span className="text-sm">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span className="text-sm">Booked</span>
          </div>
        </motion.div>

        {/* Seat Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-lg p-6 mb-6"
        >
          <SeatGrid
            seats={seats}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
            maxSelection={maxSelection}
          />
        </motion.div>

        {/* Footer with selection info */}
        <AnimatePresence>
          {selectedSeats.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg p-4"
            >
              <div className="container mx-auto flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {selectedSeats.length} of {maxSelection} seats selected
                  </p>
                  <p className="text-2xl font-bold">
                    Total: ৳{(selectedSeats.length * gallery.price).toFixed(2)}
                  </p>
                </div>
                <Button
                  onClick={handleConfirm}
                  size="lg"
                  className="hover-scale"
                >
                  Confirm & Continue
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
