import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, {FunctionComponent} from "react";

interface ISectionHeading {
  id?: string
  title: React.ReactElement | string,
  subTitle?: React.ReactElement | string,
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify',
}

const SectionHeading: FunctionComponent<ISectionHeading> = ({title, subTitle, align, ...props}) => {
  return (
    <Box sx={{pt: 10}} {...props}>
      <Typography
        gutterBottom={false}
        variant={"h3"}
        color={"primary"}
        align={align}
        sx={{mb: 1}}
      >
        {title}
      </Typography>
      {subTitle && (
        <Typography
          gutterBottom={false}
          variant={"subtitle1"}
          color={"secondary"}
          align={align}
        >
          {subTitle}
        </Typography>
      )}
    </Box>
  );
};

SectionHeading.defaultProps = {
  align: "left",
};

export default SectionHeading;
