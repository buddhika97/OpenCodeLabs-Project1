import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import AdminHeader from "../../components/AdminHeader";

const Bar = () => {
  return (
    <Box m="20px">
      <AdminHeader title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;