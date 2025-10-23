import React from 'react';
import type { Gallery, Selection } from '@/types/seatBooking';
import { CustomSelect } from './CustomSelect';
import { Button } from '@/components/ui/button';

interface BookingFormProps {
  galleries: Gallery[];
  selection: Selection;
  onSelectionChange: (newSelection: Partial<Selection>) => void;
  totalPrice: number;
  selectedGallery: Gallery | undefined;
  onProceedToPayment: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ galleries, selection, onSelectionChange, totalPrice, selectedGallery, onProceedToPayment }) => {

  const handleTicketHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectionChange({ ticketHolderName: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSelectionChange({ phone: e.target.value });
  };
  
  const unitPrice = selectedGallery?.price || 0;
  const subTotal = unitPrice * selection.tickets;
  const vat = subTotal * 0.15;

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold">Choose Your Preferred Seats</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Select your gallery, block, and level to find the perfect view.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Pick a Gallery</label>
          <CustomSelect
            value={selection.galleryId}
            onChange={(value) => onSelectionChange({ galleryId: value })}
            options={galleries.map(g => ({ value: g.id, label: g.name }))}
            placeholder="Pick a Gallery"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Pick a Block</label>
          <CustomSelect
            value={selection.block}
            onChange={(value) => onSelectionChange({ block: value })}
            options={selectedGallery?.blocks.map(b => ({ value: b, label: b })) || []}
            disabled={!selectedGallery || selectedGallery.blocks.length <= 1}
            placeholder="Block"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Pick a Level</label>
          <CustomSelect
            value={selection.level}
            onChange={(value) => onSelectionChange({ level: value })}
            options={selectedGallery?.levels.map(l => ({ value: l, label: l })) || []}
            disabled={!selectedGallery || selectedGallery.levels.length <= 1}
            placeholder="Level"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">Number of Ticket</label>
          <CustomSelect
            value={String(selection.tickets)}
            onChange={(value) => onSelectionChange({ tickets: parseInt(value, 10) })}
            options={[...Array(10).keys()].map(i => ({ value: String(i+1), label: String(i+1) }))}
            placeholder='1'
          />
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <h3 className="text-base font-bold">Ticket Holders Names (Optional)</h3>
        <p className="text-sm text-muted-foreground mt-1">Provide the name for a personalized experience.</p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            placeholder="Ticket Holder Name"
            value={selection.ticketHolderName}
            onChange={handleTicketHolderChange}
            className="w-full px-3 py-2 bg-transparent border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={selection.phone}
            onChange={handlePhoneChange}
            className="w-full px-3 py-2 bg-transparent border border-border rounded-lg placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
      </div>
      
      <div className="mt-auto pt-6">
        <div className="border-t border-border pt-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unit Price:</span>
              <span className="font-medium">৳ {unitPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quantity:</span>
              <span className="font-medium">X {selection.tickets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sub Total:</span>
              <span className="font-medium">৳ {subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">VAT (15%):</span>
              <span className="font-medium">৳ {vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t border-dashed border-border pt-2 mt-2">
              <span>Total</span>
              <span>৳ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Button 
            onClick={onProceedToPayment}
            disabled={!selectedGallery}
            className="w-full gradient-primary glow-primary hover-glow"
            size="lg"
          >
            Confirm and make payment
          </Button>
        </div>
      </div>
    </div>
  );
};
