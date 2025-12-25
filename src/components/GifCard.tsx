import React from 'react';
import { toast } from 'react-toastify';
import { Copy, Download, User, Calendar } from 'lucide-react';
import type { GiphyData } from '../types/giphy';


interface GifCardProps {
  gif: GiphyData;
}

const GifCard: React.FC<GifCardProps> = ({ gif }) => {
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(gif.images.original.url);
      toast.success('Link copied to clipboard!', {
        icon: <Copy size={16} />
      });
    } catch (err) {
      console.log(err)
      toast.error('Failed to copy link');
    }
  };

  const handleDownload = async () => {
    const loadingToast = toast.loading('Preparing download...');
    try {
      const response = await fetch(gif.images.original.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${gif.title || 'giphy'}.gif`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.update(loadingToast, { 
        render: 'Download started!', 
        type: 'success', 
        isLoading: false, 
        autoClose: 2000 
      });
    } catch (err) {
      console.log(err)
      toast.update(loadingToast, { 
        render: 'Download failed', 
        type: 'error', 
        isLoading: false, 
        autoClose: 2000 
      });
    }
  };

  return (
    <div className="group flex flex-col bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all duration-300 shadow-lg">
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        <img 
          src={gif.images.fixed_height.url} 
          alt={gif.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-slate-100 truncate mb-3" title={gif.title}>
          {gif.title || 'Untitled GIF'}
        </h3>
        <div className="space-y-1.5 mb-4 flex-1">
          <div className="flex items-center text-xs text-slate-400 gap-2">
            <User size={14} className="text-purple-400" />
            <span className="truncate">@{gif.username || 'anonymous'}</span>
          </div>
          <div className="flex items-center text-xs text-slate-400 gap-2">
            <Calendar size={14} className="text-purple-400" />
            <span>{new Date(gif.import_datetime).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
        </div>
        <div className="flex gap-2 mt-auto">
          <button 
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 flex-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
          >
            <Copy size={14} />
            Copy
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 flex-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
          >
            <Download size={14} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default GifCard;