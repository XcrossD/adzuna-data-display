import { useState } from 'react';
import type { NextPage } from 'next'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout';

const drawerWidth = 240;

const Home: NextPage = () => {
  return (
    <Layout>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Typography variant="h1">
          Welcome to Adzuna data display!
        </Typography>
        <Typography variant="h2">
          Select a category to get started
        </Typography>
      </Box>
    </Layout>
  )
}

export default Home