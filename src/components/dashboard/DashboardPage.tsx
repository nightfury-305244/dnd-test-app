import React from "react";
import { Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GradientButton from "../../shared-components/GradientButton";
import theme from "../../theme";

interface Image {
  id: number;
  src: string;
  title: string;
}

// Carousel settings with responsive adjustments
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 3000,
  lazyLoad: "ondemand" as const,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const images: Image[] = [
    { id: 1, src: "/sample1.jpg", title: "Gravestone 1" },
    { id: 2, src: "/sample2.jpg", title: "Gravestone 2" },
    { id: 3, src: "/sample3.jpg", title: "Gravestone 3" },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container direction={"row"} spacing={2}>
        <Grid item xs={12} md={6}>
          <Slider {...settings}>
            {images.map((image) => (
              <div
                key={image.id}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  style={{
                    maxHeight: "500px",
                    width: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
              </div>
            ))}
          </Slider>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <GradientButton
            label="DESIGN"
            onClick={() => navigate("/design")}
            gradientStart={theme.palette.primary.light}
            gradientEnd={theme.palette.primary.dark}
          />
          <GradientButton
            label="FAQs"
            onClick={() => navigate("/faq")}
            gradientStart={theme.palette.secondary.light}
            gradientEnd={theme.palette.secondary.dark}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
