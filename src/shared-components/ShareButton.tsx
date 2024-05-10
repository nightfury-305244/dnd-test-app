import React from "react";
import { Button, Box, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

interface ShareButtonProps {
  shareUrl: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ shareUrl }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          url: shareUrl,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content", error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl).then(
        () => {
          alert("Link copied to clipboard!");
        },
        (err) => {
          alert(`Failed to copy the link: ${err}`);
        }
      );
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;

  return (
    <Box display="flex" gap={2}>
      <Tooltip title="Share via WhatsApp">
        <Button
          component="a"
          size="large"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="success"
          startIcon={<WhatsAppIcon />}
        >
          WhatsApp
        </Button>
      </Tooltip>
      <Tooltip title="Share link">
        <Button
          onClick={handleShare}
          color="primary"
          size="large"
          startIcon={<ShareIcon />}
        >
          Share Link
        </Button>
      </Tooltip>
    </Box>
  );
};

export default ShareButton;
