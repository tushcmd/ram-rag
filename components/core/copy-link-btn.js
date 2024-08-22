'use client'
import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CopyLinkButton() {
  const [clicked, setClicked] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (copySuccess) {
      const timeout = setTimeout(() => {
        setCopySuccess(false);
      }, 2000); // Adjust the timeout as needed
      return () => clearTimeout(timeout);
    }
  }, [copySuccess]);

  const handleCopy = () => {
    // Get the current URL
    const currentUrl = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        setClicked(true);
        setCopySuccess(true);
      })
      .catch((error) => {
        console.error('Error copying URL to clipboard:', error);
      });
  };

  return (
    <Button variant="secondary" onClick={handleCopy}>
      {clicked && copySuccess ? (
        <p className="flex flex-row">
            Link Copied!
          <Check className="w-4 h-4 mr-2" />
          
        </p>
      ) : (
        <p className="flex flex-row">
          <Copy className="w-4 h-4 mr-2" />
          Copy Profile Link
        </p>
      )}
    </Button>
  );
}
// import { useState } from 'react'
// import { Copy } from 'lucide-react'
// import { Button } from "@/components/ui/button"


// export function CopyLinkButton() {

//     const [clicked, setClicked] = useState();

//     return (
//         <Button variant="secondary" onClick={() => setClicked(true)} >
//             {clicked ? <p className='flex flex-row'><Copy className="w-4 h-4 mr-2" />Link Copied!</p> : <p className='flex flex-row'><Copy className="w-4 h-4 mr-2" /> Copy Profile Link</p> }
//         </Button>
//     )
// }
