import React, { useState, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import { Sparkles, AlertCircle, Ghost } from 'lucide-react';
import { useGifs } from './hooks/useGifs';
import SearchBar from './components/SearchBar';
import GifCard from './components/GifCard';
import GifSkeleton from './components/GifSkeleton';
import Pagination from './components/Pagination';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  
  const { gifs, loading, error, totalCount } = useGifs(searchTerm, page);

  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    setPage(1); 
  }, []);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-purple-500/30">
      <header className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6 animate-fade-in">
            <Sparkles size={16} />
            <span>Powered by Giphy API</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-8 tracking-tight bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent">
            Find the perfect <span className="text-purple-500">GIF</span>
          </h1>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        {error && (
          <div className="max-w-2xl mx-auto p-6 mb-12 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 flex items-center gap-4">
            <AlertCircle className="shrink-0" size={24} />
            <div>
              <p className="font-bold text-lg">Oops! Something went wrong</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            [...Array(12)].map((_, i) => <GifSkeleton key={i} />)
          ) : (
            gifs.map((gif) => <GifCard key={gif.id} gif={gif} />)
          )}
        </div>
        {!loading && gifs.length === 0 && !error && (
          <div className="text-center py-32 flex flex-col items-center gap-4 opacity-50">
            <Ghost size={64} className="text-slate-600" />
            <div className="space-y-1">
              <p className="text-2xl font-bold italic">No GIFs found</p>
              <p className="text-slate-400">Try searching for something else!</p>
            </div>
          </div>
        )}
        {!loading && gifs.length > 0 && (
          <Pagination 
            currentPage={page} 
            totalCount={totalCount} 
            onPageChange={handlePageChange} 
          />
        )}
      </main>

      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{ 
          backgroundColor: '#1e293b', 
          border: '1px solid #334155',
          borderRadius: '12px'
        }}
      />
    </div>
  );
};

export default App;