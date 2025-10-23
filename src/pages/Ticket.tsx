import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { CheckCircle2, Download, QrCode, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import { toast } from 'sonner';

const Ticket = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { match, selection, selectedGallery, totalPrice } = location.state || {};
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    if (match && id) {
      const ticketCode = `BCB-${id?.toUpperCase()}`;
      QRCode.toDataURL(ticketCode, { width: 300, margin: 2 })
        .then(url => setQrCodeUrl(url))
        .catch(err => console.error(err));
    }
  }, [match, id]);

  if (!match || !selectedGallery || !selection) {
    navigate('/matches');
    return null;
  }

  const ticketCode = `BCB-${id?.toUpperCase()}`;

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    
    setIsDownloading(true);
    toast.info('Generating your ticket PDF...');
    
    try {
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        backgroundColor: '#0E0E10',
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ticket-${ticketCode}.pdf`);
      
      toast.success('Ticket downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to download ticket. Please try again.');
    } finally {
      setIsDownloading(false);
    }
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
          <div ref={ticketRef} className="glass-card rounded-3xl p-8 mb-6 relative overflow-hidden animate-slide-up">
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

              {/* Ticket Code & QR */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Ticket Code</div>
                    <div className="text-2xl font-bold font-mono gradient-text">
                      {ticketCode}
                    </div>
                  </div>
                  <div className="w-32 h-32 glass-card rounded-xl flex items-center justify-center p-2">
                    {qrCodeUrl ? (
                      <img src={qrCodeUrl} alt="Ticket QR Code" className="w-full h-full object-contain" />
                    ) : (
                      <QrCode className="w-24 h-24 text-muted-foreground animate-pulse" />
                    )}
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
          <div className="flex gap-4 animate-fade-in">
            <Button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 gradient-primary glow-primary hover-glow"
              size="lg"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Ticket
                </>
              )}
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
    </div>
  );
};

export default Ticket;
