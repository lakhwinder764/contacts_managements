import React from 'react';
import { Box, Typography } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { blue, green, grey, red, yellow } from '@mui/material/colors';
import axios from 'axios';

const Line = ({ isDashboard, casesData, deathsData, recoveredData }) => {
  const mockLineData = [
    {
      id: 'cases',
      color: grey[100],
      data: casesData,
    },
    {
      id: 'deaths',
      color: yellow[100],
      data: deathsData,
    },
    {
      id: 'recovered',
      color: green[100],
      data: recoveredData,
    },
  ];
  return (
    <Box mt="20px">
      <Typography fontWeight="bold" mt={3}>
        Line Chart
      </Typography>
      <Box height="100vh">
        <Box
          height="75vh"
          // sx={{
          //   '@media(max-width: 600px)': {
          //     width: '100vh',
          //   },
          // }}
        >
          <ResponsiveLine
            data={mockLineData}
            margin={{ top: 50, right: 0, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 1,
              tickPadding: 1,
              tickRotation: 0,
              legend: 'dates',
              legendOffset: 26,
              legendPosition: 'middle',
            }}
            axisLeft={{
              tickSize: 1,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'count',
              legendOffset: -80,
              legendPosition: 'middle',
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 20,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 0,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemBackground: 'black',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Line;
