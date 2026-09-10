import React from 'react';
import HeroSection from './components/HeroSection';
import SeasonToggleSection from './components/SeasonToggleSection';
import AboutSection from './components/AboutSection';
import TrainersSection from './components/TrainersSection';
import RoomsSection from './components/RoomsSection';
import GallerySection from './components/GallerySection';
import CampsSection from './components/CampsSection';
import RegistrationSection from './components/RegistrationSection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CursorSparkle from './components/CursorSparkle';
import LoadingScreen from './components/LoadingScreen';

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <CursorSparkle />
      <div className="noise-texture" />
      <Header />
      <main>
        <HeroSection />
        <SeasonToggleSection />
        <AboutSection />
        <TrainersSection />
        <RoomsSection />
        <GallerySection />
        <CampsSection />
        <RegistrationSection />
      </main>
      <Footer />
    </>
  );
}