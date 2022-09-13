import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Layout from "../components/layout";
import LineChart from '../components/lineChart';
import { getHistoricalData } from '../lib/api';
import { getAllJobTypeIds } from "../lib/jobType";
import { Historical } from '../types/data';
import { drawerWidth } from '../constants';

interface IJobTypeProps {
  historicalDataRaw: Historical[];
}

export default function JobType({ historicalDataRaw }: IJobTypeProps) {
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
        <LineChart
          data={parsedHistoricalData}
          height={500}
          color="steelblue"
        />
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
  return {
    props: {
      historicalDataRaw
    },
  };
}