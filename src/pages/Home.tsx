import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MatchCard from '@/components/MatchCard';
import { matchesData } from '@/data/matches';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { useRef } from 'react';

const Home = () => {
  const upcomingMatches = matchesData.filter(m => m.status === 'upcoming').slice(0, 3);
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass-card rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 gradient-primary opacity-10"></div>
          <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Experience Live Cricket Like Never Before</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="gradient-text">
                Book Your Cricket
              </span>
              <br />
              <span className="text-foreground">
                Match Tickets
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Secure your seats for the most thrilling cricket matches. 
              Premium viewing experience with easy online booking.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/matches">
                <Button size="lg" className="gradient-primary glow-primary text-lg px-8">
                  Book Your Seat Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Matches Carousel */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Upcoming Matches</h2>
            <p className="text-muted-foreground">Don't miss out on the action</p>
          </div>
          <Link to="/matches">
            <Button variant="outline" className="glass-card">
              View All Matches
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full"
        >
          <CarouselContent>
            {upcomingMatches.map((match) => (
              <CarouselItem key={match.id} className="md:basis-1/2 lg:basis-1/3">
                <MatchCard match={match} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="glass-card" />
          <CarouselNext className="glass-card" />
        </Carousel>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
