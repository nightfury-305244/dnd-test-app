import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Grid } from "@mui/material";
import { getFullImageUrl } from "../../../utils/utils";

interface GravestoneCardProps {
  url: {
    frontUrl: string;
    leftUrl: string;
    rightUrl: string;
    backUrl: string;
  };
  title: string;
  onEdit: () => void;
  price?: string;
  description?: string;
}

const ImageContainer = styled("div")({
  width: "100%",
  height: "auto",
  textAlign: "center",
  marginBottom: "16px",
});

const CarouselButtonGroup = styled(ButtonGroup)({
  marginBottom: "8px",
  justifyContent: "center",
});

const GravestoneCard: React.FC<GravestoneCardProps> = ({
  url,
  title,
  price,
  // onEdit,
  description,
}) => {
  const [currentUrl, setCurrentUrl] = React.useState(url.frontUrl);

  const handleSetImage = (url: string) => {
    setCurrentUrl(url);
  };

  const cardStyles = {
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
    padding: "20px 30px",
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
          <img
            className="mx-auto"
            src={getFullImageUrl(currentUrl)}
            alt={`${title}`}
            style={{ width: "auto", maxHeight: "300px" }}
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

      {/* <Grid item>
        <ButtonGroup variant="contained">
          <Button onClick={onEdit}>Edit</Button>
        </ButtonGroup>
      </Grid> */}
    </Grid>
  );
};

export default GravestoneCard;
