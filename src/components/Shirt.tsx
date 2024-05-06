import * as React from "react";
import { styled } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

interface ImageButtonProps {
  url: string;
  title: string;
  selected?: boolean;
  onClick: () => void;
  price?: string;
}

const ImageButtonBase = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

function getEncodedBackgroundImage(url: string): string {
  const encodedUrl = encodeURI(url);
  return `url('${encodedUrl}')`;
}

const ShirtButton: React.FC<ImageButtonProps> = ({
  url,
  title,
  price,
  selected,
  onClick,
}) => {
  return (
    <ImageButtonBase
      onClick={onClick}
      focusRipple
      className="list-image-size text-center"
    >
      <ImageSrc style={{ backgroundImage: getEncodedBackgroundImage(url) }} />
      <ImageBackdrop className="MuiImageBackdrop-root" />
      <Image>
        <Typography
          component="span"
          variant="h6"
          sx={{
            position: "relative",
            p: 4,
            pt: 2,
            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
            border: selected ? `4px solid` : "none",
          }}
        >
          {title} <br /> {price && `€${price}`}
          <ImageMarked className="MuiImageMarked-root" />
        </Typography>
      </Image>
    </ImageButtonBase>
  );
};

export default ShirtButton;
