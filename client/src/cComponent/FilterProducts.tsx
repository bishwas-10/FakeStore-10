import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import React from "react";
import { TProductSchema } from "../components/pages/sub-components/add-products";
function valuetext(value: number) {
  return value > 5000 ? "$5000+" : `$${value}`;
}
function valueratetext(value: number) {
  return `${value}`;
}
const minPriceDistance = 50;
const minRateDistance = 1;
const FilterProducts = ({
  data,
  category,
  setCategory,
  price,
  setPrice,
  rating,
  setRating,
}: {
  data: TProductSchema[];
  category: string | null;
  setCategory: React.Dispatch<React.SetStateAction<string | null>>;
  price: number[];
  setPrice: React.Dispatch<React.SetStateAction<number[]>>;
  rating: number[];
  setRating: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory((event.target as HTMLInputElement).value);
  };

  const handlePriceRangeChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
console.log(event)
    if (newValue[1] - newValue[0] < minPriceDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 5000 - minPriceDistance);
        setPrice([clamped, clamped + minPriceDistance]);
      } else {
        const clamped = Math.max(newValue[1], minPriceDistance);
        setPrice([clamped - minPriceDistance, clamped]);
      }
    } else {
      setPrice(newValue as number[]);
    }
  };

  //rating

  const handleRateRangeChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    console.log(event)
    if (newValue[1] - newValue[0] < minRateDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 5 - minRateDistance);
        setRating([clamped, clamped + minRateDistance]);
      } else {
        const clamped = Math.max(newValue[1], minRateDistance);
        setRating([clamped - minRateDistance, clamped]);
      }
    } else {
      setRating(newValue as number[]);
    }
  };
  return (
    <>
      <FormControl>
        <FormLabel
          sx={{ fontSize: "18px", fontWeight: 600 }}
          id="radio-buttons-group"
        >
          Category
        </FormLabel>
        <RadioGroup
          sx={{ marginTop: "2px", display: "flex", flexDirection: "row" }}
          aria-labelledby="radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={category}
          onChange={handleCategoryChange}
        >
          {[...new Set(data?.map((items) => items.category))].map(
            (category, index) => (
              <FormControlLabel
                key={index}
                value={category}
                control={<Radio />}
                label={category}
              />
            )
          )}
          <FormControlLabel value="All" control={<Radio />} label="All" />
        </RadioGroup>
      </FormControl>
      <Box>
        <Typography fontWeight={600} fontSize={"18px"}>
          Price in $<br />
          <span className="text-md font-medium">
            {" "}
            ${price[0]}-${price[1]}
          </span>
        </Typography>
        <Slider
          getAriaLabel={() => "Range slider"}
          value={price}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={50}
          max={6000}
          step={50}
          disableSwap
        />
      </Box>
      <Box>
        <Typography fontWeight={600} fontSize={"18px"}>
          Rate <br />
          <span className="text-md font-medium">
            "{rating[0]}-{rating[1]}"
          </span>
        </Typography>
        <Slider
          getAriaLabel={() => "Range rate slider"}
          value={rating}
          onChange={handleRateRangeChange}
          valueLabelDisplay="auto"
          getAriaValueText={valueratetext}
          min={0}
          max={5}
          disableSwap
        />
      </Box>
    </>
  );
};

export default FilterProducts;
