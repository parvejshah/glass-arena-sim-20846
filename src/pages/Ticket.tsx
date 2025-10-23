import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, Printer, MapPin, Calendar, Clock } from 'lucide-react';
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

  const ticketCode = id?.toUpperCase() || '';

  const handlePrint = () => {
    window.print();
    toast.success('Opening print dialog...');
  };

  return (
    <div className="min-h-screen">
      <div className="print:hidden">
        <Navbar />
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Header - Hidden on print */}
          <div className="text-center mb-8 animate-scale-in print:hidden">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary glow-primary mb-4 animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Your ticket has been confirmed. See you at the match!
            </p>
          </div>

          {/* Ticket Card - Clean Print Design */}
          <div className="bg-white text-gray-900 rounded-lg shadow-2xl overflow-hidden animate-slide-up print:shadow-none print:rounded-none">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-600 to-red-600 text-white py-4 px-6 print:from-gray-800 print:to-gray-900">
              <div className="text-center">
                <div className="text-sm font-semibold mb-1">BANGLADESH CRICKET BOARD</div>
                <div className="text-xs">Official Match Ticket</div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8 print:p-6">
              {/* Match Title */}
              <div className="text-center mb-6 pb-6 border-b-2 border-gray-200">
                <h2 className="text-3xl font-bold mb-3 print:text-2xl">{match.title}</h2>
                <div className="flex items-center justify-center gap-4 text-2xl font-bold print:text-xl">
                  <span className="text-green-700">{match.team1}</span>
                  <span className="text-gray-400">VS</span>
                  <span className="text-red-700">{match.team2}</span>
                </div>
              </div>

              {/* Match Details */}
              <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200 print:gap-4 print:mb-4 print:pb-4">
                <div className="text-center">
                  <Calendar className="w-5 h-5 mx-auto mb-2 text-gray-600 print:w-4 print:h-4" />
                  <div className="text-xs text-gray-600 mb-1">DATE</div>
                  <div className="font-bold text-sm print:text-xs">{new Date(match.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                </div>
                <div className="text-center">
                  <Clock className="w-5 h-5 mx-auto mb-2 text-gray-600 print:w-4 print:h-4" />
                  <div className="text-xs text-gray-600 mb-1">TIME</div>
                  <div className="font-bold text-sm print:text-xs">{match.time}</div>
                </div>
                <div className="text-center">
                  <MapPin className="w-5 h-5 mx-auto mb-2 text-gray-600 print:w-4 print:h-4" />
                  <div className="text-xs text-gray-600 mb-1">VENUE</div>
                  <div className="font-bold text-sm print:text-xs">{match.stadium}</div>
                </div>
              </div>

              {/* Ticket Details Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6 print:gap-4 print:mb-4">
                {/* Left Column */}
                <div className="space-y-4 print:space-y-3">
                  <div className="border-l-4 border-green-600 pl-4 print:pl-3">
                    <div className="text-xs text-gray-600 mb-1">TICKET PRICE (Incl. VAT)</div>
                    <div className="text-xl font-bold print:text-lg">৳ {totalPrice.toFixed(2)}</div>
                  </div>
                  
                  <div className="border-l-4 border-green-600 pl-4 print:pl-3">
                    <div className="text-xs text-gray-600 mb-1">GALLERY</div>
                    <div className="font-bold print:text-sm">{selectedGallery.name}</div>
                  </div>

                  <div className="border-l-4 border-green-600 pl-4 print:pl-3">
                    <div className="text-xs text-gray-600 mb-1">LEVEL</div>
                    <div className="font-bold print:text-sm">{selection.level}</div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 print:space-y-3">
                  <div className="border-l-4 border-red-600 pl-4 print:pl-3">
                    <div className="text-xs text-gray-600 mb-1">ENTRY GATE</div>
                    <div className="font-bold print:text-sm">Gate - {selection.block}</div>
                  </div>

                  <div className="border-l-4 border-red-600 pl-4 print:pl-3">
                    <div className="text-xs text-gray-600 mb-1">BLOCK</div>
                    <div className="font-bold print:text-sm">{selection.block}</div>
                  </div>

                  <div className="border-l-4 border-red-600 pl-4 print:pl-3">
                    <div className="text-xs text-gray-600 mb-1">NUMBER OF TICKETS</div>
                    <div className="font-bold print:text-sm">{selection.tickets}</div>
                  </div>
                </div>
              </div>

              {/* Ticket Code and QR Section */}
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 print:bg-white print:p-4">
                <div className="grid grid-cols-2 gap-6 items-center print:gap-4">
                  <div>
                    <div className="text-xs text-gray-600 mb-2">TICKET CODE</div>
                    <div className="text-2xl font-bold font-mono tracking-wider mb-3 print:text-xl">
                      BCB-{ticketCode}
                    </div>
                    {selection.ticketHolderName && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-600 mb-1">TICKET HOLDER</div>
                        <div className="font-semibold print:text-sm">{selection.ticketHolderName}</div>
                        {selection.phone && (
                          <div className="text-sm text-gray-600 print:text-xs">{selection.phone}</div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="border-4 border-gray-300 p-3 bg-white rounded-lg">
                      <svg className="w-32 h-32 print:w-28 print:h-28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100" height="100" fill="white"/>
                        <rect x="8" y="8" width="8" height="8" fill="black"/>
                        <rect x="24" y="8" width="8" height="8" fill="black"/>
                        <rect x="40" y="8" width="8" height="8" fill="black"/>
                        <rect x="56" y="8" width="8" height="8" fill="black"/>
                        <rect x="72" y="8" width="8" height="8" fill="black"/>
                        <rect x="84" y="8" width="8" height="8" fill="black"/>
                        <rect x="8" y="24" width="8" height="8" fill="black"/>
                        <rect x="84" y="24" width="8" height="8" fill="black"/>
                        <rect x="8" y="40" width="8" height="8" fill="black"/>
                        <rect x="24" y="40" width="8" height="8" fill="black"/>
                        <rect x="40" y="40" width="8" height="8" fill="black"/>
                        <rect x="56" y="40" width="8" height="8" fill="black"/>
                        <rect x="72" y="40" width="8" height="8" fill="black"/>
                        <rect x="84" y="40" width="8" height="8" fill="black"/>
                        <rect x="8" y="56" width="8" height="8" fill="black"/>
                        <rect x="24" y="56" width="8" height="8" fill="black"/>
                        <rect x="56" y="56" width="8" height="8" fill="black"/>
                        <rect x="84" y="56" width="8" height="8" fill="black"/>
                        <rect x="8" y="72" width="8" height="8" fill="black"/>
                        <rect x="40" y="72" width="8" height="8" fill="black"/>
                        <rect x="84" y="72" width="8" height="8" fill="black"/>
                        <rect x="8" y="84" width="8" height="8" fill="black"/>
                        <rect x="24" y="84" width="8" height="8" fill="black"/>
                        <rect x="40" y="84" width="8" height="8" fill="black"/>
                        <rect x="56" y="84" width="8" height="8" fill="black"/>
                        <rect x="72" y="84" width="8" height="8" fill="black"/>
                        <rect x="84" y="84" width="8" height="8" fill="black"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="mt-6 pt-6 border-t border-gray-200 print:mt-4 print:pt-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 print:bg-white print:border-gray-300">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400 print:text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-800 print:text-gray-700">
                        <strong>Important:</strong> Please present this ticket at the venue entrance. Keep this ticket safe. Screenshots or printed copies are acceptable. Entry is subject to security checks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-100 py-3 px-6 text-center border-t border-gray-200 print:bg-white">
              <div className="text-xs text-gray-600">
                Bangladesh Cricket Board • {match.venue} • For queries: support@bcb.com.bd
              </div>
            </div>
          </div>

          {/* Action Buttons - Hidden on print */}
          <div className="flex gap-4 mt-8 animate-fade-in print:hidden">
            <Button 
              onClick={handlePrint}
              className="flex-1 gradient-primary glow-primary hover-glow"
              size="lg"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print / Save as PDF
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

      <div className="print:hidden">
        <Footer />
      </div>
      
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          
          .print\\:from-gray-800 {
            --tw-gradient-from: #1f2937 !important;
          }
          
          .print\\:to-gray-900 {
            --tw-gradient-to: #111827 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Ticket;
