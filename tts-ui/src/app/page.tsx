"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Download,
  Languages,
  Mic,
  Users,
  Music,
  FileText,
  Copy,
  Menu,
  X,
} from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import { Listbox } from "@headlessui/react";

// Languages for dropdown
const languages = [
  { code: "en", label: "English", flag: "US" },
  { code: "ar", label: "Arabic", flag: "SA" },
];

export default function Home(): React.ReactElement {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch audio URLs from Django API
  useEffect(() => {
    const fetchAudioUrls = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/audio/');
        const data = await response.json();
        setAudioUrls(data);
      } catch (error) {
        console.error('Failed to fetch audio URLs:', error);
        // Fallback to sample URLs if API is not available
        setAudioUrls({
          en: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          ar: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
        });
      }
    };

    fetchAudioUrls();
  }, []);

  const handlePlay = async () => {
    if (!audioUrls[selectedLang.code]) {
      console.error('No audio URL for selected language');
      return;
    }

    try {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.src = audioUrls[selectedLang.code];
          await audioRef.current.play();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleDownload = () => {
    if (!audioUrls[selectedLang.code]) {
      console.error('No audio URL for selected language');
      return;
    }

    // Create a temporary anchor element to trigger download
    const a = document.createElement('a');
    a.href = audioUrls[selectedLang.code];
    a.download = `audio-${selectedLang.code}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
      />
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-12">
          <div className="h-4 w-32">  <img src="elevenlabsblack.svg" alt="logo" className=""/></div>
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-4 lg:space-x-6 text-sm font-medium">
          <li className="hover:text-gray-700 cursor-pointer">Creative Platform</li>
          <li className="hover:text-gray-700 cursor-pointer">Agents Platform</li>
          <li className="hover:text-gray-700 cursor-pointer">Developers</li>
          <li className="hover:text-gray-700 cursor-pointer">Resources</li>
          <li className="hover:text-gray-700 cursor-pointer">Enterprise</li>
          <li className="hover:text-gray-700 cursor-pointer">Pricing</li>
        </ul>
        
        <div className="hidden md:flex space-x-4">
          <button className="px-4 py-2 text-sm hover:rounded-full hover:bg-[#f2f2f2]">
            Log in
          </button>
          <button className="px-4 py-2 text-sm bg-black text-white rounded-full">
            Sign Up
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <ul className="space-y-3 text-sm font-medium">
            <li className="py-2 hover:text-gray-700 cursor-pointer">Creative Platform</li>
            <li className="py-2 hover:text-gray-700 cursor-pointer">Agents Platform</li>
            <li className="py-2 hover:text-gray-700 cursor-pointer">Developers</li>
            <li className="py-2 hover:text-gray-700 cursor-pointer">Resources</li>
            <li className="py-2 hover:text-gray-700 cursor-pointer">Enterprise</li>
            <li className="py-2 hover:text-gray-700 cursor-pointer">Pricing</li>
          </ul>
          <div className="flex flex-col space-y-3 mt-4">
            <button className="px-4 py-2 text-sm text-center hover:rounded-full hover:bg-[#f2f2f2]">
              Log in
            </button>
            <button className="px-4 py-2 text-sm bg-black text-white rounded-full text-center">
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="px-4 py-8 text-center sm:px-6 md:px-8 lg:py-10">
        <h1 className="text-2xl font-extrabold mb-4 sm:text-3xl md:text-4xl">
          The most realistic voice AI platform
        </h1>
        <p className="text-gray-700 text-sm sm:text-base">
          AI voice models and products powering millions of developers,
          creators, and enterprises. <br className="hidden sm:inline" />
          From low-latency conversational agents to the leading AI voice
          generator for voiceovers and audiobooks.
        </p>
      </section>

      <div className="flex justify-center items-center gap-3 px-4 sm:gap-5">
        <button className="px-4 py-2 text-xs sm:text-sm bg-black text-white rounded-full">
          Sign Up
        </button>
        <button className="px-4 py-2 text-xs sm:text-sm bg-[#f2f2f2] text-black rounded-full">
          Contact Sales
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 px-4 mt-12 sm:px-6 sm:mt-16 sm:gap-0 sm:space-x-2 overflow-x-auto">
        {[
          { label: "Text to Speech", icon: Mic },
          { label: "Agents", icon: Users },
          { label: "Music", icon: Music },
          { label: "Speech to Text", icon: FileText },
          { label: "Dubbing", icon: Copy },
          { label: "Voice Cloning", icon: Languages },
          { label: "ElevenReader", icon: BookIcon },
        ].map(({ label, icon: Icon }, i) => (
          <button
            key={i}
            className={`flex items-center gap-1 py-2 px-3 text-xs sm:text-sm font-medium rounded-md border bg-[#f9f9f9] whitespace-nowrap ${
              i === 0
                ? "border border-gray-300 text-black"
                : "text-gray-500 border border-gray-200"
            }`}
          >
            <Icon size={14} className="sm:size-4" />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{label.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Card Wrapper */}
      <div className="bg-gradient-to-tr from-[#fd7336] via-[#d7a7ff] to-[#affaff] p-[1px] rounded-2xl mx-4 mt-6 sm:mx-6 md:mx-auto md:mt-8 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          {/* Textarea */}
          <textarea
            className="w-full p-4 text-base outline-none resize-none h-48 sm:p-6 sm:text-lg sm:h-60"
            defaultValue="In the ancient land of Eldoria, where skies shimmered and forests whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the 'burn it all down' kind… [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed."
          />

          {/* Voice Chips */}
          <div className="flex flex-wrap gap-2 px-4 pb-4 sm:px-6">
            {[
              "Samara",
              "Narrate a story",
              "Spuds",
              "Jessica",
              "Create dialogue",
              "Announcer",
              "Voiceover a game",
              "Sergeant",
              "Provide customer support",
            ].map((name, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs border rounded-full cursor-pointer hover:bg-gray-100 sm:px-3 sm:text-sm"
              >
                {name}
              </span>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between px-4 py-4 border-t border-gray-200 bg-gray-50 sm:px-6">
            {/* Language Dropdown */}
            <div className="relative w-full sm:w-44">
              <Listbox value={selectedLang} onChange={setSelectedLang}>
                <Listbox.Button className="flex items-center justify-between w-full px-3 py-2 border rounded-md text-sm bg-white shadow-sm">
                  <span className="flex items-center gap-2">
                    <ReactCountryFlag
                      countryCode={selectedLang.flag}
                      svg
                      style={{ width: "20px", height: "20px" }}
                    />
                    {selectedLang.label}
                  </span>
                  <span className="ml-2">▾</span>
                </Listbox.Button>

                <Listbox.Options className="relative z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  {languages.map((lang) => (
                    <Listbox.Option
                      key={lang.code}
                      value={lang}
                      className={({ active }) =>
                        `flex items-center gap-2 px-3 py-2 text-sm cursor-pointer ${
                          active ? "bg-gray-100" : ""
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <ReactCountryFlag
                            countryCode={lang.flag}
                            svg
                            style={{ width: "20px", height: "20px" }}
                          />
                          <span className={`${selected ? "font-semibold" : ""}`}>
                            {lang.label}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button 
                className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
                onClick={handlePlay}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <Play size={18} />
                )}
              </button>
              <button 
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center"
                onClick={handleDownload}
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs sm:text-sm text-black font-bold mt-4 mb-2">
          Powered by Eleven v3 (alpha)
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center mt-12 mb-10 gap-4 px-4 sm:flex-row sm:px-0 sm:mt-16">
        <h2 className="text-lg sm:text-xl font-semibold text-center sm:text-left">Experience the full Audio AI platform</h2>
        <button className="px-4 py-2 text-sm bg-black text-white rounded-full">
          Sign Up
        </button>
      </div>
    </main>
  );
}

// Custom simple Book icon
function BookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 7H20V21H6.5A2.5 2.5 0 0 1 4 18.5v-14z" />
    </svg>
  );
}