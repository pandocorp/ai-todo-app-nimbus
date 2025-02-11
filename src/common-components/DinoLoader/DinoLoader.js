import React, {useState, useEffect} from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box";
import "./dino-loader.css";

const DinoLoader = React.memo((props) => {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        setProgress(props.data?.percentage || 0)
    }, [props.data]);
    return(
        <Box>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: "15px", borderRadius: "5px" }}
            />
        </Box>
    )
});

export default DinoLoader;