import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type SeatState = 'free' | 'reserved' | 'booked';

export interface Seat {
  id: string;
  row: number;
  number: number;
  state: SeatState;
  block: string;
}

interface SeatGridProps {
  seats: Seat[];
  selectedSeats: string[];
  onSeatClick: (seatId: string) => void;
  maxSelection: number;
}

export const SeatGrid = ({ seats, selectedSeats, onSeatClick, maxSelection }: SeatGridProps) => {
  const blocks = [...new Set(seats.map(s => s.block))];
  
  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.includes(seat.id)) return 'bg-primary text-primary-foreground';
    if (seat.state === 'free') return 'bg-green-500 hover:bg-green-600 text-white';
    if (seat.state === 'reserved') return 'bg-yellow-500 text-white cursor-not-allowed';
    if (seat.state === 'booked') return 'bg-red-500 text-white cursor-not-allowed';
  };

  const canSelect = (seat: Seat) => {
    if (seat.state !== 'free') return false;
    if (selectedSeats.includes(seat.id)) return true;
    return selectedSeats.length < maxSelection;
  };

  return (
    <div className="space-y-8">
      {blocks.map((block, blockIndex) => {
        const blockSeats = seats.filter(s => s.block === block);
        const rows = [...new Set(blockSeats.map(s => s.row))].sort((a, b) => a - b);
        
        return (
          <motion.div
            key={block}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: blockIndex * 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-center">Block {block}</h3>
            <div className="space-y-2">
              {rows.map((row, rowIndex) => {
                const rowSeats = blockSeats.filter(s => s.row === row).sort((a, b) => a.number - b.number);
                
                return (
                  <div key={row} className="flex justify-center gap-2">
                    <span className="w-8 text-sm text-muted-foreground flex items-center justify-center">
                      {row}
                    </span>
                    {rowSeats.map((seat, seatIndex) => (
                      <motion.button
                        key={seat.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                          delay: blockIndex * 0.1 + rowIndex * 0.05 + seatIndex * 0.01,
                          type: 'spring',
                          stiffness: 300,
                          damping: 20
                        }}
                        whileHover={canSelect(seat) ? { scale: 1.1 } : {}}
                        whileTap={canSelect(seat) ? { scale: 0.95 } : {}}
                        onClick={() => canSelect(seat) && onSeatClick(seat.id)}
                        disabled={!canSelect(seat)}
                        className={cn(
                          'w-10 h-10 rounded-lg text-xs font-medium transition-colors duration-200',
                          getSeatColor(seat)
                        )}
                      >
                        {seat.number}
                      </motion.button>
                    ))}
                  </div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
