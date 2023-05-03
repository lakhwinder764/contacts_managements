import React from 'react'
import{ Box, Typography } from "@mui/material"
import { ResponsiveLine } from '@nivo/line';
import { blue, green, grey, red, yellow } from '@mui/material/colors';
import axios from 'axios';

const Line = ({isDashboard, casesData, deathsData, recoveredData}) => {
    // const [casesData, setcasesData] = React.useState();
    // const [deathsData, setdeathsData] = React.useState();
    // const [recoveredData, setRecoveredData] = React.useState();
    // React.useEffect(() => {
    //  axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=all").then((response) => {
    //  setcasesData(Object.keys(response?.data?.cases)?.map((val, i) => ({
    //     "x": val,
    //     "y": response?.data?.cases[val],
    //   })));
    //   setdeathsData(Object.keys(response.data?.deaths)?.map((val, i) => ({
    //     "x": val,
    //     "y": response?.data?.deaths[val],
    //   })));
    //   setRecoveredData(Object.keys(response.data?.recovered)?.map((val, i) => ({
    //     "x": val,
    //     "y": response?.data?.recovered[val],
    //   })));
    // });
    // }, [])

    const mockLineData=[
      {
        "id": "cases",
        "color": grey[100],
        "data": casesData,
      },
      {
        "id": "deaths",
        "color": yellow[100],
        "data": deathsData,
      },
      {
        "id": "recovered",
        "color": green[100],
        "data": recoveredData,
      },

    ]
    console.log(mockLineData);
  return (
    <Box m="20px">
    <Typography>Line Chart</Typography>
    <Box overflow="scroll" height="100vh">
<Box  height="75vh"
        sx={{
          '@media(max-width: 600px)': {
            width: '100vh'
          }
        }}>
  <ResponsiveLine
        data={mockLineData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
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
            legendPosition: 'middle'
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
</Box>
</Box>
</Box>
  )
}

export default Line