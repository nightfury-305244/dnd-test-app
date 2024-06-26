import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Grid, CircularProgress } from "@mui/material";
import theme from "../../theme";
import { getFullImageUrl } from "../../utils/utils";

interface GravestoneCardProps {
  url: {
    frontUrl: string;
    leftUrl: string;
    rightUrl: string;
    backUrl: string;
  };
  title: string;
  selected?: boolean;
  onSelect: () => void;
  price?: string;
  description?: string;
}

const ImageContainer = styled("div")({
  width: "100%",
  height: "auto",
  textAlign: "center",
  marginBottom: "16px",
  position: "relative",
});

const CarouselButtonGroup = styled(ButtonGroup)({
  marginBottom: "8px",
  justifyContent: "center",
});

const GravestoneCard: React.FC<GravestoneCardProps> = ({
  url,
  title,
  price,
  selected = false,
  onSelect,
  description,
}) => {
  const [currentUrl, setCurrentUrl] = React.useState(url.frontUrl);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSetImage = (newUrl: string) => {
    if (currentUrl !== newUrl) {
      setIsLoading(true);
      setCurrentUrl(newUrl);
    }
  };

  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const cardStyles = {
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
    padding: "20px 30px",
    border: selected ? `3px solid ${theme.palette.secondary.light}` : "none",
    borderRadius: "8px",
    minWidth: "350px",
  };

  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      style={cardStyles}
    >
      <Grid item>
        <Typography variant="h6" align="center" gutterBottom>
          {title} {price && `€${price}`}
        </Typography>
      </Grid>
      <Grid item>
        <ImageContainer>
          {isLoading && (
            <CircularProgress
              size={32}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
          <img
            src={getFullImageUrl(currentUrl)}
            alt={`${title}`}
            style={{ width: "auto", maxHeight: "300px" }}
            onLoad={handleImageLoaded}
          />
        </ImageContainer>
      </Grid>

      <Grid item>
        <CarouselButtonGroup variant="outlined">
          <Button variant="text" onClick={() => handleSetImage(url.frontUrl)}>
            Front
          </Button>
          <Button variant="text" onClick={() => handleSetImage(url.leftUrl)}>
            Left
          </Button>
          <Button variant="text" onClick={() => handleSetImage(url.rightUrl)}>
            Right
          </Button>
          <Button variant="text" onClick={() => handleSetImage(url.backUrl)}>
            Back
          </Button>
        </CarouselButtonGroup>
      </Grid>

      <Grid item>
        <Typography className="!mb-4">{description}</Typography>
      </Grid>
      <Grid item>
        <ButtonGroup variant="contained">
          <Button onClick={onSelect}>Select</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default GravestoneCard;
