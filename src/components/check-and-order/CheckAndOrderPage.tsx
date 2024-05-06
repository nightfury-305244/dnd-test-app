import { Button, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react";
import Product from "../Product";
import { useAppDispatch } from "../../store/store";
import { createOrder } from "../../features/order/orderActions";
import useLocalStorage from "../../store/useLocalStorage";
import { DraggableItemType, StoneType } from "../../types/types";
import { createProduct } from "../../features/product/productActions";

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  deliveryAddress: string;
  deliveryLocationName: string;
  deliveryNumber: string;
  deliveryTime: string;
}

interface CheckAndOrderPageProps {
  onNavigateNext: () => void;
  onNavigatePrevious: () => void;
}

const CheckAndOrderPage: React.FC<CheckAndOrderPageProps> = ({
  onNavigateNext,
  onNavigatePrevious,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();


  const dispatch = useAppDispatch();
  const [selectedStone] = useLocalStorage<StoneType>("selectedStone");
  const [currentPrice] = useLocalStorage<number>("currentPrice");
  const [items] = useLocalStorage<DraggableItemType[]>("items");
  const [fTextOnPlate] = useLocalStorage<string>("fTextOnPlate");
  const [fDateOnPlate] = useLocalStorage<string>("fDateOnPlate");
  const [_productId, setProductId] = useLocalStorage<string>("productId");

  const onSubmit = async (data: FormValues) => {
    const productInfo = {
      stoneId: selectedStone ? selectedStone._id : "",
      droppedSymbols: items ? items : [],
      textOnPlate: fTextOnPlate ? fTextOnPlate : "",
      dateOnPlate: fDateOnPlate ? fDateOnPlate : "",
      price: currentPrice ? currentPrice : 0,
    };
    const product = await dispatch(createProduct(productInfo)).unwrap();
    
    const orderData = {
      subscriberInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
      },
      deliveryInfo: {
        address: data.deliveryAddress,
        locationName: data.deliveryLocationName,
        deliveryNumber: data.deliveryNumber,
        deliveryTime: data.deliveryTime,
      },
      productId: product._id,
    };
    dispatch(createOrder(orderData));
    localStorage.removeItem("fTextOnPlate");
    localStorage.removeItem("fDateOnPlate");
    localStorage.removeItem("currentPrice");
    setProductId(product._id ? product._id : "");
    onNavigateNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-20">
      <Grid
        container
        className="!w-9/12 !mx-auto"
        direction={"column"}
        spacing={3}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <Grid
          container
          item
          direction={"row"}
          spacing={1}
          justifyContent={"center"}
        >
          <Grid
            container
            item
            sm={12}
            md={5}
            order={{ xs: 2, md: 1 }}
            spacing={4}
          >
            <Grid item>
              <Typography variant="h6">
                Tilaajan tiedot (Subscriber Information)
              </Typography>
            </Grid>
            <Grid item container direction="row" spacing={3}>
              <Grid item sm={6} md={6}>
                <TextField
                  label="Nimi (First Name)"
                  variant="outlined"
                  {...register("firstName", { required: true })}
                  error={!!errors.firstName}
                  helperText={errors.firstName ? "First name is required" : ""}
                  className="w-full"
                />
              </Grid>
              <Grid item sm={6} md={6}>
                <TextField
                  label="Sukunimi (Last Name)"
                  variant="outlined"
                  {...register("lastName", { required: true })}
                  error={!!errors.lastName}
                  helperText={errors.lastName ? "Last name is required" : ""}
                  className="w-full"
                />
              </Grid>
              <Grid item sm={6} md={6}>
                <TextField
                  label="Puhelinnmero (Phone Number)"
                  variant="outlined"
                  {...register("phoneNumber", { required: true })}
                  error={!!errors.phoneNumber}
                  helperText={
                    errors.phoneNumber ? "Phone number is required" : ""
                  }
                  className="w-full"
                />
              </Grid>
              <Grid item sm={6} md={6}>
                <TextField
                  label="Sähköpostiosoite (Email Address)"
                  variant="outlined"
                  {...register("email", { required: true })}
                  error={!!errors.email}
                  helperText={errors.email ? "Email is required" : ""}
                  className="w-full"
                />
              </Grid>
            </Grid>

            <Grid item>
              <Typography variant="h6">
                Toimitustiedot (Delivery Information)
              </Typography>
            </Grid>
            <Grid item container direction="row" spacing={3}>
              <Grid item sm={6} md={6}>
                <TextField
                  label="Toimitusosoite (Delivery Address)"
                  variant="outlined"
                  {...register("deliveryAddress", { required: true })}
                  error={!!errors.deliveryAddress}
                  helperText={
                    errors.deliveryAddress ? "Delivery address is required" : ""
                  }
                  className="w-full"
                />
              </Grid>
              <Grid item sm={6} md={6}>
                <TextField
                  label="Toimituspaikan nimi (Delivery Location Name)"
                  variant="outlined"
                  {...register("deliveryLocationName")}
                  className="w-full"
                />
              </Grid>
              <Grid item sm={6} md={6}>
                <TextField
                  label="Toimitusnumero (Delivery Number)"
                  variant="outlined"
                  className="w-full"
                  {...register("deliveryNumber")}
                />
              </Grid>
              <Grid item sm={6} md={6}>
                <TextField
                  label="Toivottu toimitusajankohta"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  {...register("deliveryTime")}
                  className="w-full"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            sm={12}
            md={7}
            order={{ xs: 1, md: 2 }}
            direction={"column"}
            alignItems={"center"}
          >
            <Product
              selectedStone={selectedStone}
              items={items}
              textOnPlate={fTextOnPlate}
              dateOnPlate={fDateOnPlate}
            />
          </Grid>
        </Grid>
        <Grid item container justifyContent="center">
          <Button
            type="button"
            variant="contained"
            onClick={onNavigatePrevious}
            className="!mr-10"
          >
            Previous
          </Button>
          <Button type="submit" variant="contained">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CheckAndOrderPage;
