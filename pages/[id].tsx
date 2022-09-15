import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Layout from "../components/layout";
import HistoricalData from '../components/historicalData';
import { getHistoricalData, getHistogramData } from '../lib/api';
import { getAllJobTypeIds } from "../lib/jobType";
import { Historical, Histogram } from '../types/data';
import { drawerWidth } from '../constants';
import HistogramData from '../components/histogramData';

interface IJobTypeProps {
  historicalDataRaw: Historical[];
  histogramDataRaw: Histogram[];
}

export default function JobType({
  historicalDataRaw,
  histogramDataRaw
}: IJobTypeProps) {
  const parsedHistoricalData = historicalDataRaw.map((elem) => {
    return {
      month: new Date(elem.month),
      average: elem.average
    };
  });
  return (
    <Layout>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <HistoricalData
              data={parsedHistoricalData}
              height={500}
              color="steelblue"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <HistogramData
              data={histogramDataRaw}
              height={500}
              color="steelblue"
            />
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllJobTypeIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const jobType = params?.id || "";
  const historicalDataRaw = await getHistoricalData(jobType);
  const histogramDataRaw = await getHistogramData(jobType);
  return {
    props: {
      historicalDataRaw,
      histogramDataRaw
    },
  };
}