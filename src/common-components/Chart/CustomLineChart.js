import React, { useEffect, useState } from 'react';
import { Card, CardContent, Chip } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const CustomLineChart = React.memo((props) => {
    const [series, setSeries] = useState([])
    const [axisLabels, setAxisLabels] = useState([]) 

    useEffect(() => {
        setSeries([...props.series] || [])
    }, [props.series])

    useEffect(() => {
        setAxisLabels([...props.xAxisLabel] || [])
    }, [props.xAxisLabel])
    return (
        <Card>
            <div style={{ padding: '10px 0px 10px 10px' }}>
                <Chip style={{ fontSize: '14px' }} label={props.title} />
            </div>
            <CardContent>
                <LineChart
                    width={props.width}
                    height={props.height}
                    series={series?.length ? series : []}
                    xAxis={[{ scaleType: 'point', data: axisLabels?.length ? axisLabels : [] }]}
                />
            </CardContent>
        </Card>
    )
});

export default CustomLineChart;